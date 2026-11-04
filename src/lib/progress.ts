import type { Skill } from '../content/types';
import type { AppState } from './store';
import { overallBand } from './scoring';

export const SKILLS: Skill[] = ['listening', 'reading', 'writing', 'speaking'];

export interface BandEstimate {
  band: number;
  samples: number;
  confidence: 'self-reported' | 'low' | 'medium' | 'high';
}

interface Sample {
  date: string;
  band: number;
  weight: number;
}

export function skillSamples(s: AppState, skill: Skill): Sample[] {
  const out: Sample[] = [];
  for (const a of s.attempts) {
    if (a.kind === skill && a.band != null) out.push({ date: a.date, band: a.band, weight: 1 });
    if (a.kind === 'mock' && a.bands?.[skill] != null) out.push({ date: a.date, band: a.bands[skill]!, weight: 2 });
  }
  if (skill === 'writing') for (const w of s.writing) if (w.band != null) out.push({ date: w.date, band: w.band, weight: w.source === 'auto' ? 0.5 : 1 });
  if (skill === 'speaking') for (const sp of s.speaking) if (sp.band != null) out.push({ date: sp.date, band: sp.band, weight: 1 });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

/** Weighted mean of the most recent 5 samples, rounded to half band. */
export function estimateSkill(s: AppState, skill: Skill): BandEstimate {
  const samples = skillSamples(s, skill).slice(-5);
  if (!samples.length) return { band: s.profile?.startBands[skill] ?? 5, samples: 0, confidence: 'self-reported' };
  const wsum = samples.reduce((a, x) => a + x.weight, 0);
  const mean = samples.reduce((a, x) => a + x.band * x.weight, 0) / wsum;
  const band = Math.round(mean * 2) / 2;
  const confidence = wsum >= 5 ? 'high' : wsum >= 2.5 ? 'medium' : 'low';
  return { band, samples: samples.length, confidence };
}

export function estimateAll(s: AppState): Record<Skill, BandEstimate> & { overall: number } {
  const r = Object.fromEntries(SKILLS.map((k) => [k, estimateSkill(s, k)])) as Record<Skill, BandEstimate>;
  return { ...r, overall: overallBand(SKILLS.map((k) => r[k].band)) };
}

export function lastPractised(s: AppState, skill: Skill): string | null {
  const dates: string[] = [];
  s.attempts.forEach((a) => (a.kind === skill || a.kind === 'mock') && dates.push(a.date));
  if (skill === 'writing') s.writing.forEach((w) => dates.push(w.date));
  if (skill === 'speaking') s.speaking.forEach((w) => dates.push(w.date));
  return dates.sort().at(-1) ?? null;
}

/** Aggregated accuracy per question type across all reading/listening attempts. */
export function questionTypeStats(s: AppState, kind: 'reading' | 'listening') {
  const agg: Record<string, { correct: number; total: number }> = {};
  for (const a of s.attempts) {
    if (a.kind !== kind || !a.byType) continue;
    for (const [t, v] of Object.entries(a.byType)) {
      const x = (agg[t] ??= { correct: 0, total: 0 });
      x.correct += v!.correct;
      x.total += v!.total;
    }
  }
  return agg;
}

export function bandHistory(s: AppState) {
  return SKILLS.map((skill) => ({ skill, points: skillSamples(s, skill).map((x) => ({ date: x.date.slice(0, 10), band: x.band })) }));
}
