import { describe, it, expect, beforeEach } from 'vitest';
import { normalizeAnswer, isCorrect, rawToBand, overallBand, writingBand, criteriaBand, wordLimit, gradeGroups } from '../src/lib/scoring';
import { newCard, review, isDue } from '../src/lib/srs';
import { analyseEssay, analyseSpeech } from '../src/lib/writingAnalysis';
import { scoreDiagnostic, startBandsFrom } from '../src/lib/diagnostic';
import { feasibility, hoursNeeded, phaseFor, buildPlan } from '../src/lib/planner';
import { estimateSkill } from '../src/lib/progress';
import { emptyState, streak, resetState, addAttempt, getState, importData, exportData, today } from '../src/lib/store';
import { diagnosticItems, readingPassages } from '../src/content';
import type { Question, QuestionGroup } from '../src/content/types';

const q = (answer: string[]): Question => ({ id: 'x', number: 1, prompt: '', answer, explanation: '' });

describe('answer checking', () => {
  it('normalises case, articles, punctuation and thousands separators', () => {
    expect(normalizeAnswer('  The Market Research. ')).toBe('market research');
    expect(normalizeAnswer('1,000')).toBe('1000');
    expect(normalizeAnswer('£25')).toBe('£25');
  });
  it('accepts listed variants for gap questions', () => {
    expect(isCorrect('gap', q(['market research', 'research']), 'Research')).toBe(true);
    expect(isCorrect('gap', q(['25', 'twenty-five']), 'twenty five')).toBe(true);
    expect(isCorrect('gap', q(['£25']), '25')).toBe(true);
    expect(isCorrect('gap', q(['library']), 'libary')).toBe(false);
    expect(isCorrect('gap', q(['library']), '')).toBe(false);
  });
  it('matches letters / TFNG exactly', () => {
    expect(isCorrect('mcq', q(['B']), 'b')).toBe(true);
    expect(isCorrect('tfng', q(['NOT GIVEN']), 'FALSE')).toBe(false);
    expect(isCorrect('matching', q(['iv']), 'IV')).toBe(true);
  });
  it('parses word limits from instructions', () => {
    expect(wordLimit('Write NO MORE THAN TWO WORDS for each answer.')).toBe(2);
    expect(wordLimit('Write ONE WORD ONLY.')).toBe(1);
    expect(wordLimit('Choose the correct letter.')).toBeNull();
  });
  it('grades groups and aggregates by type', () => {
    const groups: QuestionGroup[] = [
      { id: 'g1', type: 'tfng', instructions: 'x', questions: [{ ...q(['TRUE']), id: 'a' }, { ...q(['FALSE']), id: 'b', number: 2 }] },
      { id: 'g2', type: 'gap', instructions: 'x', questions: [{ ...q(['river']), id: 'c', number: 3 }] },
    ];
    const r = gradeGroups(groups, { a: 'TRUE', b: 'TRUE', c: 'River' });
    expect(r.correct).toBe(2);
    expect(r.byType.tfng).toEqual({ correct: 1, total: 2 });
    expect(r.byType.gap).toEqual({ correct: 1, total: 1 });
  });
});

describe('band conversion', () => {
  it('uses the listening and academic reading tables', () => {
    expect(rawToBand('listening', 30, 40)).toBe(7);
    expect(rawToBand('listening', 23, 40)).toBe(6);
    expect(rawToBand('reading', 30, 40)).toBe(7);
    expect(rawToBand('reading', 40, 40)).toBe(9);
    expect(rawToBand('reading', 0, 40)).toBe(0);
  });
  it('general training reading needs more correct answers', () => {
    expect(rawToBand('reading', 30, 40, 'general')).toBe(6);
    expect(rawToBand('reading', 34, 40, 'general')).toBe(7);
  });
  it('scales partial tests to /40', () => {
    expect(rawToBand('reading', 10, 13)).toBe(rawToBand('reading', 31, 40));
  });
  it('rounds overall band like IELTS (.25 up to .5, .75 up to next)', () => {
    expect(overallBand([6, 6, 6.5, 6.5])).toBe(6.5); // 6.25
    expect(overallBand([6.5, 6.5, 7, 7])).toBe(7); // 6.75
    expect(overallBand([6, 6, 6, 6.5])).toBe(6); // 6.125
  });
  it('weights Task 2 double and rounds criteria down', () => {
    expect(writingBand(6, 7)).toBe(6.5);
    expect(writingBand(null, 7)).toBe(7);
    expect(criteriaBand([7, 7, 6, 6])).toBe(6.5);
    expect(criteriaBand([7, 6, 6, 6])).toBe(6);
  });
});

describe('spaced repetition', () => {
  it('schedules growing intervals and resets on lapse', () => {
    let c = newCard('2026-01-01');
    expect(isDue(c, '2026-01-01')).toBe(true);
    c = review(c, 2, '2026-01-01');
    expect(c.interval).toBe(1);
    c = review(c, 2, '2026-01-02');
    expect(c.interval).toBe(6);
    c = review(c, 2, '2026-01-08');
    expect(c.interval).toBe(15);
    expect(c.due).toBe('2026-01-23');
    c = review(c, 0, '2026-01-23');
    expect(c.interval).toBe(1);
    expect(c.lapses).toBe(1);
    expect(c.ease).toBeLessThan(2.5);
  });
});

describe('writing analysis', () => {
  const weak = 'In nowadays people is using phone. It have many informations. It is more better.';
  it('flags under-length and common learner errors', () => {
    const a = analyseEssay(weak, 2, 'Some people think phones are harmful. To what extent do you agree or disagree?');
    const msgs = a.issues.map((i) => i.message).join(' ');
    expect(msgs).toMatch(/Under length/);
    expect(msgs).toMatch(/in nowadays/);
    expect(msgs).toMatch(/Uncountable/);
    expect(msgs).toMatch(/Double comparative/);
    expect(a.estimate.overall).toBeLessThanOrEqual(5);
  });
  it('requires an overview in academic Task 1', () => {
    const t = 'The chart shows sales from 2000 to 2020.\n\nSales rose from 10 to 50 units.\n\nExports fell to 5 units.';
    expect(analyseEssay(t, 1).issues.some((i) => /overview/i.test(i.message))).toBe(true);
    expect(analyseEssay('Overall, sales rose. ' + t, 1).issues.some((i) => /No clear overview/.test(i.message))).toBe(false);
  });
  it('gives a strong model answer a higher estimate than a weak one', () => {
    const model = readingPassages.length ? '' : '';
    void model;
    const good = `It is often argued that governments should prioritise public transport over road building. I strongly agree, because investment in buses and railways reduces congestion, cuts emissions and benefits poorer citizens.

Firstly, expanding public transport tackles congestion more effectively than new roads, which tend to attract additional traffic within a few years. For instance, cities such as Seoul removed an urban motorway and saw journey times improve once bus lanes were introduced. Such evidence suggests that capacity for cars is quickly consumed.

Moreover, a modern rail network significantly lowers carbon emissions per passenger. Although electric cars are becoming more common, they still require roads, parking and energy, whereas a single train can replace hundreds of vehicles. This means that public transport remains the more sustainable option.

Admittedly, rural residents may depend on cars, and road maintenance cannot be ignored. However, this is an argument for targeted spending rather than large motorway projects.

In conclusion, I believe that public transport deserves the larger share of transport budgets, since it relieves congestion, protects the environment and offers affordable mobility to everyone.`;
    const g = analyseEssay(good, 2, 'Governments should spend more on public transport than on roads. To what extent do you agree or disagree?');
    const w = analyseEssay(weak, 2, 'Governments should spend more on public transport than on roads. To what extent do you agree or disagree?');
    expect(g.estimate.overall).toBeGreaterThan(w.estimate.overall);
    expect(g.estimate.overall).toBeGreaterThanOrEqual(6.5);
  });
  it('computes speaking rate and fillers', () => {
    const s = analyseSpeech('um I think uh my hometown is quite um peaceful and green', 6);
    expect(s.fillers).toBe(3);
    expect(s.wpm).toBe(120);
  });
});

describe('diagnostic', () => {
  it('maps all-correct high and all-wrong low', () => {
    const all = Object.fromEntries(diagnosticItems.map((i) => [i.id, i.answer]));
    const none = Object.fromEntries(diagnosticItems.map((i) => [i.id, -1]));
    expect(scoreDiagnostic(diagnosticItems, all).band).toBeGreaterThanOrEqual(8);
    expect(scoreDiagnostic(diagnosticItems, none).band).toBe(4);
  });
  it('productive skills start half a band lower', () => {
    expect(startBandsFrom(6)).toEqual({ listening: 6, reading: 6, writing: 5.5, speaking: 5.5 });
  });
});

describe('planner', () => {
  beforeEach(() => resetState(emptyState()));
  it('estimates hours and feasibility honestly', () => {
    const cur = { listening: 6.5, reading: 6.5, writing: 6.5, speaking: 6.5 };
    expect(hoursNeeded(cur, 6.5)).toBe(0);
    expect(feasibility(cur, 6.5, 30, 1, '2026-01-01').level).toBe('achieved');
    const low = { listening: 5, reading: 5, writing: 5, speaking: 5 };
    expect(feasibility(low, 7, 14, 1, '2026-01-01').level).toBe('unrealistic');
    expect(feasibility(low, 5.5, 120, 2, '2026-01-01').level).toBe('on-track');
  });
  it('moves through phases toward exam day', () => {
    expect(phaseFor(80, 90)).toBe('foundation');
    expect(phaseFor(40, 90)).toBe('skills');
    expect(phaseFor(10, 90)).toBe('exam');
    expect(phaseFor(2, 90)).toBe('final');
  });
  it('builds a daily plan within budget that targets the weakest skill', () => {
    const created = new Date('2026-01-01T09:00:00');
    resetState({
      ...emptyState(),
      profile: { name: '', module: 'academic', targetBand: 7, examDate: '2026-04-01', hoursPerDay: 2, startBands: { listening: 7, reading: 7, writing: 5, speaking: 6.5 }, createdAt: created.toISOString() },
    });
    const plan = buildPlan(getState(), new Date('2026-02-10T09:00:00'))!;
    expect(plan.phase).toBe('skills');
    expect(plan.focus[0]).toBe('writing');
    expect(plan.today.some((t) => t.kind === 'writing')).toBe(true);
    expect(plan.totalMinutes).toBeLessThanOrEqual(120 + 60);
    expect(plan.today[0].kind).toBe('vocabulary');
  });
  it('schedules a mock test in the exam phase', () => {
    resetState({
      ...emptyState(),
      profile: { name: '', module: 'academic', targetBand: 7, examDate: '2026-03-01', hoursPerDay: 3, startBands: { listening: 6, reading: 6, writing: 6, speaking: 6 }, createdAt: '2026-01-01T09:00:00.000Z' },
    });
    const plan = buildPlan(getState(), new Date('2026-02-20T09:00:00'))!;
    expect(plan.phase).toBe('exam');
    expect(plan.isMockDay).toBe(true);
  });
});

describe('store & estimates', () => {
  beforeEach(() => resetState(emptyState()));
  it('estimates bands from recent results and ignores empty submissions', () => {
    resetState({ ...emptyState(), profile: { name: '', module: 'academic', targetBand: 7, examDate: '2026-04-01', hoursPerDay: 2, startBands: { listening: 5, reading: 5, writing: 5, speaking: 5 }, createdAt: '2026-01-01' } });
    expect(estimateSkill(getState(), 'reading')).toMatchObject({ band: 5, confidence: 'self-reported' });
    addAttempt({ kind: 'reading', itemId: 'r01', title: 'x', band: 0 });
    addAttempt({ kind: 'reading', itemId: 'r01', title: 'x', band: 6.5 });
    addAttempt({ kind: 'reading', itemId: 'r02', title: 'x', band: 7 });
    expect(estimateSkill(getState(), 'reading').band).toBe(7);
  });
  it('exports and imports data', () => {
    addAttempt({ kind: 'listening', itemId: 'l1-p1', title: 'x', band: 6 });
    const json = exportData();
    resetState(emptyState());
    expect(importData(json)).toBe(true);
    expect(getState().attempts).toHaveLength(1);
    expect(importData('{bad')).toBe(false);
  });
  it('counts streaks ending today or yesterday', () => {
    const d = (n: number) => {
      const x = new Date('2026-03-10T12:00:00');
      x.setDate(x.getDate() - n);
      return today(x);
    };
    const now = new Date('2026-03-10T12:00:00');
    expect(streak([d(0), d(1), d(2)], now)).toBe(3);
    expect(streak([d(1), d(2)], now)).toBe(2);
    expect(streak([d(3)], now)).toBe(0);
  });
});
