import type { AppState, SrsCard } from './store';
import { emptyState } from './store';

/**
 * Merge two learner states (e.g. this browser and the cloud copy) without losing work.
 * - Records with ids (attempts, writing, speaking, error log) are unioned; for the same id the
 *   copy with more information wins (assessed beats unassessed).
 * - Deleted error-log entries stay deleted (tombstones).
 * - Flashcards: the card reviewed more recently (later due date, then more reps) wins.
 * - Profile: the most recently edited copy wins.
 * - Device-only settings (API key, theme, voice speed) are never taken from the remote copy.
 */
export function mergeStates(local: AppState, remote: Partial<AppState> | null | undefined): AppState {
  if (!remote) return local;
  const r: AppState = { ...emptyState(), ...remote, settings: local.settings };
  const deleted = new Set([...(local.deletedIds ?? []), ...(r.deletedIds ?? [])]);

  const byId = <T extends { id: string }>(a: T[], b: T[], score: (x: T) => number = () => 0) => {
    const m = new Map<string, T>();
    for (const x of [...a, ...b]) {
      if (deleted.has(x.id)) continue;
      const cur = m.get(x.id);
      if (!cur || score(x) > score(cur)) m.set(x.id, x);
    }
    return [...m.values()];
  };
  const assessed = (x: { band?: number; criteria?: unknown; feedback?: string }) => (x.feedback ? 3 : x.criteria ? 2 : x.band != null ? 1 : 0);
  const byDate = <T extends { date: string }>(arr: T[]) => arr.sort((a, b) => a.date.localeCompare(b.date));

  const srs: Record<string, SrsCard> = { ...r.srs };
  for (const [k, card] of Object.entries(local.srs)) {
    const other = srs[k];
    if (!other || card.due > other.due || (card.due === other.due && card.reps >= other.reps)) srs[k] = card;
  }

  const planDone: Record<string, string[]> = { ...r.planDone };
  for (const [day, ids] of Object.entries(local.planDone)) planDone[day] = [...new Set([...(planDone[day] ?? []), ...ids])];

  const localNewer = (local.profileUpdatedAt ?? '') >= (r.profileUpdatedAt ?? '');
  const profile = local.profile && (localNewer || !r.profile) ? local.profile : r.profile ?? local.profile;

  return {
    ...local,
    profile,
    profileUpdatedAt: [local.profileUpdatedAt, r.profileUpdatedAt].filter(Boolean).sort().at(-1),
    attempts: byDate(byId(local.attempts, r.attempts)),
    writing: byDate(byId(local.writing, r.writing, assessed)),
    speaking: byDate(byId(local.speaking, r.speaking, assessed)),
    errorLog: byId(local.errorLog, r.errorLog).sort((a, b) => b.date.localeCompare(a.date)),
    srs,
    planDone,
    activeDays: [...new Set([...local.activeDays, ...r.activeDays])].sort(),
    readGuides: [...new Set([...local.readGuides, ...r.readGuides])],
    deletedIds: [...deleted],
    settings: local.settings,
  };
}

/** The copy of the state that is safe to store in the cloud (no API key or device settings). */
export function cloudCopy(s: AppState): Omit<AppState, 'settings'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { settings, ...rest } = s;
  return rest;
}
