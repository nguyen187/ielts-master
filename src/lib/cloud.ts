/**
 * Optional cloud sync with Supabase. Enabled only when VITE_SUPABASE_URL and
 * VITE_SUPABASE_ANON_KEY are set at build time; otherwise the app stays fully local.
 */
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import { useSyncExternalStore } from 'react';
import { getState, resetState, subscribe, type AppState } from './store';
import { cloudCopy, mergeStates } from './merge';

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const cloudEnabled = !!(URL && KEY);
let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient | null {
  if (!cloudEnabled) return null;
  client ??= createClient(URL!, KEY!, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  return client;
}

/* ---------------- sync status (observable) ---------------- */

export type SyncStatus = 'disabled' | 'signed-out' | 'syncing' | 'synced' | 'offline' | 'error';
interface CloudState {
  status: SyncStatus;
  email: string | null;
  lastSynced: string | null;
  error: string | null;
}
let cloud: CloudState = { status: cloudEnabled ? 'signed-out' : 'disabled', email: null, lastSynced: null, error: null };
const listeners = new Set<() => void>();
function setCloud(p: Partial<CloudState>) {
  cloud = { ...cloud, ...p };
  listeners.forEach((l) => l());
}
export function useCloud(): CloudState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    () => cloud,
    () => cloud,
  );
}

/* ---------------- push / pull ---------------- */

let userId: string | null = null;
let pushedAttemptIds = new Set<string>();
let pushedSubmissionKeys = new Map<string, string>();
let applyingRemote = false;
let timer: ReturnType<typeof setTimeout> | null = null;

async function pull(sb: SupabaseClient, uid: string): Promise<Partial<AppState> | null> {
  const { data, error } = await sb.from('progress').select('state').eq('user_id', uid).maybeSingle();
  if (error) throw error;
  return (data?.state as Partial<AppState>) ?? null;
}

async function push(sb: SupabaseClient, uid: string) {
  const s = getState();
  const { error } = await sb.from('progress').upsert({ user_id: uid, state: cloudCopy(s), updated_at: new Date().toISOString() });
  if (error) throw error;

  const newAttempts = s.attempts.filter((a) => !pushedAttemptIds.has(a.id));
  if (newAttempts.length) {
    const { error: e2 } = await sb.from('attempts').upsert(
      newAttempts.map((a) => ({
        id: a.id,
        user_id: uid,
        kind: a.kind,
        item_id: a.itemId,
        title: a.title,
        score: a.score ?? null,
        total: a.total ?? null,
        band: a.band ?? null,
        bands: a.bands ?? null,
        by_type: a.byType ?? null,
        minutes: a.minutes ?? null,
        created_at: a.date,
      })),
    );
    if (e2) throw e2;
    newAttempts.forEach((a) => pushedAttemptIds.add(a.id));
  }

  const subs = [
    ...s.writing.map((w) => ({ id: w.id, skill: 'writing', item_id: w.taskId, text: w.text, band: w.band ?? null, criteria: w.criteria ?? null, source: w.source ?? null, created_at: w.date })),
    ...s.speaking.map((w) => ({ id: w.id, skill: 'speaking', item_id: w.itemId, text: w.transcript, band: w.band ?? null, criteria: w.criteria ?? null, source: w.source ?? null, created_at: w.date })),
  ].filter((x) => pushedSubmissionKeys.get(x.id) !== `${x.band}|${x.source}`);
  if (subs.length) {
    const { error: e3 } = await sb.from('submissions').upsert(subs.map((x) => ({ ...x, user_id: uid })));
    if (e3) throw e3;
    subs.forEach((x) => pushedSubmissionKeys.set(x.id, `${x.band}|${x.source}`));
  }
}

async function fullSync() {
  const sb = supabase();
  const uid = userId;
  if (!sb || !uid) return;
  setCloud({ status: 'syncing', error: null });
  try {
    const remote = await pull(sb, uid);
    if (uid !== userId) return; // signed out / switched account meanwhile
    applyingRemote = true;
    resetState(mergeStates(getState(), remote));
    applyingRemote = false;
    await push(sb, uid);
    setCloud({ status: 'synced', lastSynced: new Date().toISOString() });
  } catch (e) {
    applyingRemote = false;
    setCloud({ status: navigator.onLine ? 'error' : 'offline', error: e instanceof Error ? e.message : String(e) });
  }
}

function schedulePush() {
  if (applyingRemote || !userId) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(async () => {
    const sb = supabase();
    const uid = userId;
    if (!sb || !uid) return;
    setCloud({ status: 'syncing' });
    try {
      await push(sb, uid);
      setCloud({ status: 'synced', lastSynced: new Date().toISOString(), error: null });
    } catch (e) {
      setCloud({ status: navigator.onLine ? 'error' : 'offline', error: e instanceof Error ? e.message : String(e) });
    }
  }, 1500);
}

function onSession(session: Session | null) {
  const uid = session?.user.id ?? null;
  if (uid === userId) return;
  userId = uid;
  pushedAttemptIds = new Set();
  pushedSubmissionKeys = new Map();
  if (!uid) {
    setCloud({ status: 'signed-out', email: null });
    return;
  }
  setCloud({ email: session?.user.email ?? null });
  void fullSync();
}

let started = false;
/** Call once at app start. No-op when cloud sync is not configured. */
export function initCloud() {
  const sb = supabase();
  if (!sb || started) return;
  started = true;
  // supabase-js v2 emits INITIAL_SESSION on subscribe, so no separate getSession() call (avoids a race)
  // defer: calling Supabase APIs inside the auth callback can deadlock the auth lock
  sb.auth.onAuthStateChange((_e, session) => {
    setTimeout(() => onSession(session), 0);
  });
  subscribe(schedulePush);
  window.addEventListener('online', () => void fullSync());
  // pick up work done on another device when the learner comes back to this tab
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && void fullSync());
}

const redirectTo = () => window.location.origin + import.meta.env.BASE_URL;

export async function signInWithEmail(email: string) {
  const sb = supabase();
  if (!sb) throw new Error('Cloud sync is not configured.');
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });
  if (error) throw error;
}

export async function signInWithGoogle() {
  const sb = supabase();
  if (!sb) throw new Error('Cloud sync is not configured.');
  const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectTo() } });
  if (error) throw error;
}

export async function signOut() {
  await supabase()?.auth.signOut();
}

export const syncNow = () => fullSync();

/** Permanently delete this learner's cloud data (local data is kept). */
export async function deleteCloudData() {
  const sb = supabase();
  if (!sb || !userId) return;
  for (const t of ['attempts', 'submissions', 'progress']) {
    const { error } = await sb.from(t).delete().eq('user_id', userId);
    if (error) throw error;
  }
  await signOut();
}
