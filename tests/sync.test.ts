import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mergeStates, cloudCopy } from '../src/lib/merge';
import { emptyState, type AppState } from '../src/lib/store';

const base = (p: Partial<AppState> = {}): AppState => ({ ...emptyState(), ...p });
const att = (id: string, date: string, band = 6) => ({ id, kind: 'reading' as const, itemId: 'r01', title: 't', date, band });

describe('mergeStates', () => {
  it('unions records from both devices and keeps date order', () => {
    const a = base({ attempts: [att('a1', '2026-01-01'), att('a3', '2026-01-03')] });
    const b = base({ attempts: [att('a2', '2026-01-02'), att('a1', '2026-01-01')] });
    expect(mergeStates(a, b).attempts.map((x) => x.id)).toEqual(['a1', 'a2', 'a3']);
  });
  it('prefers the assessed copy of a submission', () => {
    const w = { id: 'w1', taskId: 'w2-01', text: 'x', date: '2026-01-01', wordCount: 1, minutes: 1 };
    const a = base({ writing: [w] });
    const b = base({ writing: [{ ...w, band: 6.5, criteria: { tr: 6, cc: 7, lr: 7, gra: 6 }, source: 'ai' as const, feedback: '{}' }] });
    expect(mergeStates(a, b).writing[0].band).toBe(6.5);
    expect(mergeStates(b, a).writing[0].band).toBe(6.5);
  });
  it('keeps deletions (tombstones) and never resurrects deleted error notes', () => {
    const e = { id: 'e1', date: '2026-01-01', skill: 'reading' as const, source: 's', note: 'n' };
    const local = base({ errorLog: [], deletedIds: ['e1'] });
    const remote = base({ errorLog: [e] });
    expect(mergeStates(local, remote).errorLog).toHaveLength(0);
  });
  it('picks the more recently reviewed flashcard', () => {
    const local = base({ srs: { k: { ease: 2.5, interval: 6, reps: 2, due: '2026-01-10', lapses: 0 } } });
    const remote = base({ srs: { k: { ease: 2.5, interval: 15, reps: 3, due: '2026-01-25', lapses: 0 }, k2: { ease: 2.5, interval: 1, reps: 1, due: '2026-01-02', lapses: 0 } } });
    const m = mergeStates(local, remote);
    expect(m.srs.k.interval).toBe(15);
    expect(m.srs.k2).toBeDefined();
  });
  it('takes the most recently edited profile', () => {
    const p = (target: number) => ({ name: '', module: 'academic' as const, targetBand: target, examDate: '2026-06-01', hoursPerDay: 2, startBands: { listening: 6, reading: 6, writing: 6, speaking: 6 }, createdAt: '2026-01-01' });
    const local = base({ profile: p(6.5), profileUpdatedAt: '2026-01-05T00:00:00Z' });
    const remote = base({ profile: p(7), profileUpdatedAt: '2026-01-07T00:00:00Z' });
    expect(mergeStates(local, remote).profile?.targetBand).toBe(7);
    expect(mergeStates(base({ profile: p(6.5) }), base()).profile?.targetBand).toBe(6.5);
  });
  it('merges plan check-offs, active days and read guides', () => {
    const local = base({ planDone: { d1: ['vocab'] }, activeDays: ['d1'], readGuides: ['g1'] });
    const remote = base({ planDone: { d1: ['reading'], d2: ['x'] }, activeDays: ['d2'], readGuides: ['g1', 'g2'] });
    const m = mergeStates(local, remote);
    expect(m.planDone.d1.sort()).toEqual(['reading', 'vocab']);
    expect(m.planDone.d2).toEqual(['x']);
    expect(m.activeDays).toEqual(['d1', 'd2']);
    expect(m.readGuides.sort()).toEqual(['g1', 'g2']);
  });
  it('never takes device settings from the cloud and never uploads the API key', () => {
    const local = base({ settings: { apiKey: 'sk-local', speechRate: 1, theme: 'dark' } });
    const remote = { ...base(), settings: { apiKey: 'sk-remote', speechRate: 0.5, theme: 'light' as const } };
    expect(mergeStates(local, remote).settings.apiKey).toBe('sk-local');
    expect(JSON.stringify(cloudCopy(local))).not.toContain('sk-local');
  });
  it('is a no-op without remote data', () => {
    const local = base({ attempts: [att('a1', '2026-01-01')] });
    expect(mergeStates(local, null)).toBe(local);
  });
});

/* ------- cloud sync with a fake Supabase client ------- */
const calls: { table: string; op: string; payload?: unknown }[] = [];
let remoteState: Partial<AppState> | null = null;
let authCb: ((e: string, s: unknown) => void) | null = null;

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (cb: (e: string, s: unknown) => void) => {
        authCb = cb;
        return { data: { subscription: { unsubscribe() {} } } };
      },
      signOut: async () => authCb?.('SIGNED_OUT', null),
      signInWithOtp: async () => ({ error: null }),
    },
    from: (table: string) => ({
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: remoteState ? { state: remoteState } : null, error: null }) }) }),
      upsert: async (payload: unknown) => {
        calls.push({ table, op: 'upsert', payload });
        return { error: null };
      },
      delete: () => ({ eq: async () => (calls.push({ table, op: 'delete' }), { error: null }) }),
    }),
  }),
}));

describe('cloud sync', () => {
  beforeEach(() => {
    calls.length = 0;
    vi.resetModules();
    vi.stubEnv('VITE_SUPABASE_URL', 'https://x.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon');
  });

  it('on sign-in merges cloud progress into this browser and uploads the result', async () => {
    const store = await import('../src/lib/store');
    store.resetState({ ...store.emptyState(), attempts: [att('local1', '2026-01-02')], settings: { apiKey: 'sk-secret', speechRate: 1, theme: 'system' } });
    remoteState = { attempts: [att('cloud1', '2026-01-01')] };
    const cloud = await import('../src/lib/cloud');
    expect(cloud.cloudEnabled).toBe(true);
    cloud.initCloud();
    authCb!('SIGNED_IN', { user: { id: 'u1', email: 'a@b.c' } });
    await vi.waitFor(() => expect(calls.some((c) => c.table === 'progress')).toBe(true));
    expect(store.getState().attempts.map((a) => a.id)).toEqual(['cloud1', 'local1']);
    const progress = calls.find((c) => c.table === 'progress')!.payload as { user_id: string; state: AppState };
    expect(progress.user_id).toBe('u1');
    expect(JSON.stringify(progress)).not.toContain('sk-secret');
    const rows = calls.find((c) => c.table === 'attempts')!.payload as { user_id: string; item_id: string }[];
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.user_id === 'u1' && r.item_id === 'r01')).toBe(true);
  });

  it('pushes new work after a short debounce and only sends new attempts', async () => {
    const store = await import('../src/lib/store');
    store.resetState(store.emptyState());
    remoteState = null;
    const cloud = await import('../src/lib/cloud');
    cloud.initCloud();
    authCb!('SIGNED_IN', { user: { id: 'u2', email: 'x@y.z' } });
    await vi.waitFor(() => expect(calls.some((c) => c.table === 'progress')).toBe(true));
    calls.length = 0;
    store.addAttempt({ kind: 'listening', itemId: 'l1-p1', title: 't', band: 6 });
    await vi.waitFor(() => expect(calls.some((c) => c.table === 'attempts')).toBe(true), { timeout: 4000 });
    expect((calls.find((c) => c.table === 'attempts')!.payload as unknown[]).length).toBe(1);
  });
});
