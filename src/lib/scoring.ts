import type { Module, Question, QuestionGroup, QuestionType } from '../content/types';

/** Normalise a candidate or key answer for comparison. */
export function normalizeAnswer(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[‘’`]/g, "'")
    .replace(/(\d),(?=\d{3}\b)/g, '$1') // 1,000 -> 1000
    .replace(/[^a-z0-9'%£$€.\-/ ]/g, ' ')
    .replace(/\.(?!\d)/g, ' ') // drop sentence full stops, keep decimals
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(the|a|an) /, '');
}

export function isCorrect(type: QuestionType, q: Question, given: string | undefined): boolean {
  if (!given || !given.trim()) return false;
  if (type === 'gap') {
    const g = normalizeAnswer(given);
    return q.answer.some((a) => {
      const k = normalizeAnswer(a);
      return k === g || k.replace(/-/g, ' ') === g.replace(/-/g, ' ') || k.replace(/[£$€%]/g, '').trim() === g.replace(/[£$€%]/g, '').trim();
    });
  }
  const g = given.trim().toUpperCase();
  return q.answer.some((a) => a.trim().toUpperCase() === g);
}

/** Word limit parsed from instructions, e.g. "NO MORE THAN TWO WORDS" -> 2. Returns null if none. */
export function wordLimit(instructions: string): number | null {
  const words: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4 };
  const m = instructions.toUpperCase().match(/(ONE|TWO|THREE|FOUR) WORDS?/);
  return m ? words[m[1]] : null;
}

export function countWords(s: string): number {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}

export interface GradedQuestion {
  question: Question;
  group: QuestionGroup;
  given: string;
  correct: boolean;
}

export interface GradeResult {
  correct: number;
  total: number;
  items: GradedQuestion[];
  byType: Partial<Record<QuestionType, { correct: number; total: number }>>;
}

export function gradeGroups(groups: QuestionGroup[], answers: Record<string, string>): GradeResult {
  const items: GradedQuestion[] = [];
  const byType: GradeResult['byType'] = {};
  for (const group of groups) {
    for (const question of group.questions) {
      const given = answers[question.id] ?? '';
      const correct = isCorrect(group.type, question, given);
      items.push({ question, group, given, correct });
      const t = (byType[group.type] ??= { correct: 0, total: 0 });
      t.total++;
      if (correct) t.correct++;
    }
  }
  return { correct: items.filter((i) => i.correct).length, total: items.length, items, byType };
}

/* ---------------- Band conversion (raw /40) ---------------- */
type Table = [minRaw: number, band: number][];

const LISTENING: Table = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [11, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]];
const READING_AC: Table = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]];
const READING_GT: Table = [[40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6], [27, 5.5], [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5], [3, 2], [1, 1], [0, 0]];

function lookup(table: Table, raw40: number): number {
  const r = Math.round(raw40);
  for (const [min, band] of table) if (r >= min) return band;
  return 0;
}

/** Convert a raw score to an IELTS band. Partial tests (e.g. 13 questions) are scaled to /40 — an estimate. */
export function rawToBand(skill: 'listening' | 'reading', correct: number, total: number, module: Module = 'academic'): number {
  if (total <= 0) return 0;
  const raw40 = (correct / total) * 40;
  if (skill === 'listening') return lookup(LISTENING, raw40);
  return lookup(module === 'general' ? READING_GT : READING_AC, raw40);
}

/** Overall band: mean of four skills rounded to the nearest half band (.25 rounds up to .5, .75 rounds up to next whole). */
export function overallBand(bands: number[]): number {
  if (!bands.length) return 0;
  const avg = bands.reduce((a, b) => a + b, 0) / bands.length;
  return Math.floor(avg * 2 + 0.5 + 1e-9) / 2;
}

/** Writing overall: Task 2 counts double. Criteria average then rounded down to half band (as examiners do for each task). */
export function writingBand(task1: number | null, task2: number | null): number | null {
  if (task1 == null && task2 == null) return null;
  if (task1 == null) return task2;
  if (task2 == null) return task1;
  return Math.floor(((task1 + 2 * task2) / 3) * 2 + 0.5 + 1e-9) / 2;
}

export function criteriaBand(scores: number[]): number {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.floor(avg * 2 + 1e-9) / 2;
}

export const BAND_LABELS: Record<number, string> = {
  9: 'Expert user',
  8: 'Very good user',
  7: 'Good user',
  6: 'Competent user',
  5: 'Modest user',
  4: 'Limited user',
  3: 'Extremely limited user',
};

export function bandLabel(b: number): string {
  return BAND_LABELS[Math.floor(b)] ?? 'Non-user';
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  mcq: 'Multiple choice',
  tfng: 'True / False / Not Given',
  ynng: 'Yes / No / Not Given',
  gap: 'Completion (gap fill)',
  matching: 'Matching',
};
