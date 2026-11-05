/**
 * Artifact build only: keep each learner's progress in the artifact's database, private to them
 * (rules `progress` / `progress/{self}` declared at publish). Browser storage stays as a local
 * cache, but on claude.ai it can be empty or blocked, so this is the copy that persists.
 *
 * Layout per learner: `progress/<uid>` = {parts, updatedAt}; `progress/<uid>/parts/p<i>` =
 * {chunk} — the JSON state is split so no document passes the 256 KiB limit.
 */
import { useSyncExternalStore } from 'react';
import { IS_ARTIFACT, getDb, getUser, type DB } from './artifact';
import { cloudCopy, mergeStates } from './merge';
import { getState, resetState, subscribe, type AppState } from './store';

export type SaveStatus = 'off' | 'loading' | 'saved' | 'saving' | 'error';
let status: SaveStatus = 'off';
const listeners = new Set<() => void>();
const setStatus = (s: SaveStatus) => {
  status = s;
  listeners.forEach((l) => l());
};
export function useProgressSave(): SaveStatus {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    () => status,
    () => status,
  );
}

// characters per part; worst case 4 bytes each in UTF-8 stays under 256 KiB
const PART = 60_000;
let db: DB | null = null;
let uid = '';
let written: string[] = [];
let ready = false;
let applying = false;
let timer: ReturnType<typeof setTimeout> | null = null;
let writing: Promise<void> = Promise.resolve();

const metaPath = () => `progress/${uid}`;
const partPath = (i: number) => `progress/${uid}/parts/p${i}`;

async function load(): Promise<Partial<AppState> | null> {
  const meta = await db!.doc(metaPath()).get();
  if (!meta.exists) return null;
  const n = Number(meta.data()?.parts ?? 0);
  const chunks: string[] = [];
  for (let i = 0; i < n; i++) {
    const p = await db!.doc(partPath(i)).get();
    chunks.push(String(p.data()?.chunk ?? ''));
  }
  written = chunks;
  try {
    return JSON.parse(chunks.join('')) as Partial<AppState>;
  } catch {
    return null;
  }
}

async function save() {
  const json = JSON.stringify(cloudCopy(getState()));
  const parts: string[] = [];
  for (let i = 0; i < json.length; i += PART) parts.push(json.slice(i, i + PART));
  if (parts.length === written.length && parts.every((p, i) => p === written[i])) return;
  setStatus('saving');
  // one write at a time per document; parts first so the meta never points at missing data
  for (let i = 0; i < parts.length; i++) if (parts[i] !== written[i]) await db!.doc(partPath(i)).set({ chunk: parts[i] });
  await db!.doc(metaPath()).set({ parts: parts.length, updatedAt: new Date().toISOString() });
  for (let i = parts.length; i < written.length; i++) await db!.doc(partPath(i)).delete();
  written = parts;
  setStatus('saved');
}

function schedule() {
  if (!ready || applying) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    writing = writing.then(save).catch(() => setStatus('error'));
  }, 2000);
}

let started = false;
export function initArtifactSync() {
  if (!IS_ARTIFACT || started) return;
  started = true;
  void (async () => {
    const [d, user] = await Promise.all([getDb(), getUser()]);
    if (!d || !user) return; // signed out or capability not granted: browser storage only
    try {
      uid = await user.id();
    } catch {
      return;
    }
    if (!uid) return;
    db = d;
    setStatus('loading');
    try {
      const remote = await load();
      applying = true;
      resetState(mergeStates(getState(), remote));
      applying = false;
      ready = true;
      subscribe(schedule);
      schedule();
      setStatus('saved');
    } catch {
      applying = false;
      setStatus('error');
    }
  })();
}
