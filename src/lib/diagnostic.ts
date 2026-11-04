import type { DiagnosticItem, Skill } from '../content/types';

export const LEVELS = [4.5, 5.5, 6.5, 7.5, 8.5];

/**
 * Estimate a band from the placement test. Accuracy per level is corrected for
 * guessing (4 options → 25% chance), then summed: each fully-mastered level adds ~0.9 band above 4.
 */
export function scoreDiagnostic(items: DiagnosticItem[], answers: Record<string, number>) {
  const perLevel = LEVELS.map((lvl) => {
    const its = items.filter((i) => i.band === lvl);
    const correct = its.filter((i) => answers[i.id] === i.answer).length;
    return { level: lvl, correct, total: its.length };
  });
  const corrected = perLevel.map((l) => (l.total ? Math.max(0, (l.correct / l.total - 0.25) / 0.75) : 0));
  const raw = 4 + corrected.reduce((a, b) => a + b, 0) * 0.9;
  const band = Math.min(8.5, Math.max(4, Math.round(raw * 2) / 2));
  const bySkill = (['grammar', 'vocabulary', 'reading'] as const).map((sk) => {
    const its = items.filter((i) => i.skill === sk);
    return { skill: sk, correct: its.filter((i) => answers[i.id] === i.answer).length, total: its.length };
  });
  return { band, perLevel, bySkill, correct: items.filter((i) => answers[i.id] === i.answer).length, total: items.length };
}

/** Convert the language-level estimate to starting skill bands. Productive skills usually lag receptive ones by ~0.5. */
export function startBandsFrom(band: number): Record<Skill, number> {
  const clamp = (b: number) => Math.max(4, Math.min(9, b));
  return { listening: clamp(band), reading: clamp(band), writing: clamp(band - 0.5), speaking: clamp(band - 0.5) };
}
