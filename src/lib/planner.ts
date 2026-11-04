import type { Skill } from '../content/types';
import { today, type AppState } from './store';
import { estimateAll, lastPractised, questionTypeStats, SKILLS } from './progress';
import { cueCards, grammarLessons, guides, listeningSections, readingPassages, speakingPart1, writingTasks } from '../content';
import { isDue } from './srs';
import { allWords } from '../content';

export type Phase = 'foundation' | 'skills' | 'exam' | 'final';

export interface PlanTask {
  id: string;
  kind: Skill | 'vocabulary' | 'grammar' | 'mock' | 'review' | 'guide';
  title: string;
  detail: string;
  minutes: number;
  to: string;
}

export interface Feasibility {
  level: 'achieved' | 'on-track' | 'ambitious' | 'unrealistic';
  hoursNeeded: number;
  hoursAvailable: number;
  suggestedDate?: string;
  message: string;
}

export interface Plan {
  daysLeft: number;
  phase: Phase;
  phaseInfo: { title: string; goal: string };
  weights: Record<Skill, number>;
  focus: Skill[];
  feasibility: Feasibility;
  today: PlanTask[];
  totalMinutes: number;
  isMockDay: boolean;
  milestones: { date: string; label: string }[];
}

export const PHASES: Record<Phase, { title: string; goal: string }> = {
  foundation: {
    title: 'Phase 1 · Foundation',
    goal: 'Learn the format and strategy for every question type, fix core grammar, build topic vocabulary. Accuracy first, timing second.',
  },
  skills: {
    title: 'Phase 2 · Skill building',
    goal: 'Timed practice by skill, targeting your weakest question types. Write and speak every week and compare against model answers.',
  },
  exam: {
    title: 'Phase 3 · Exam simulation',
    goal: 'Full timed mock tests under exam conditions, review every mistake, and polish weak areas. Build stamina and timing.',
  },
  final: {
    title: 'Final days · Taper',
    goal: 'Light review only: vocabulary, your error log, one short practice per skill. Sleep well and stay confident.',
  },
};

const DAY = 86_400_000;
const parse = (d: string) => new Date(d.slice(0, 10) + 'T00:00:00').getTime();
const fmt = (t: number) => today(new Date(t));

/** Rough guided-study hours needed to move one skill up half a band at a given level. */
function hoursPerHalfBand(level: number) {
  if (level < 5.5) return 20;
  if (level < 6.5) return 28;
  if (level < 7.5) return 40;
  return 60;
}

export function hoursNeeded(current: Record<Skill, number>, target: number) {
  let h = 0;
  for (const k of SKILLS) for (let b = current[k]; b < target; b += 0.5) h += hoursPerHalfBand(b);
  return h;
}

export function feasibility(current: Record<Skill, number>, target: number, daysLeft: number, hoursPerDay: number, todayStr: string): Feasibility {
  const need = hoursNeeded(current, target);
  const effectivePerDay = hoursPerDay * 0.85; // allow for missed days
  const avail = Math.max(0, daysLeft) * effectivePerDay;
  if (need === 0)
    return { level: 'achieved', hoursNeeded: 0, hoursAvailable: Math.round(avail), message: 'Your estimated bands already meet the target in every skill. Keep practising to make the score stable under exam pressure.' };
  const ratio = avail / need;
  const suggested = fmt(parse(todayStr) + Math.ceil(need / effectivePerDay) * DAY);
  if (ratio >= 1)
    return { level: 'on-track', hoursNeeded: need, hoursAvailable: Math.round(avail), message: `About ${need} focused hours are needed and you have about ${Math.round(avail)}. Follow the daily plan and you are on track.` };
  if (ratio >= 0.7)
    return {
      level: 'ambitious',
      hoursNeeded: need,
      hoursAvailable: Math.round(avail),
      suggestedDate: suggested,
      message: `Ambitious: about ${need} hours needed, ${Math.round(avail)} available. Add study time or skip no days. A safer exam date is ${suggested}.`,
    };
  return {
    level: 'unrealistic',
    hoursNeeded: need,
    hoursAvailable: Math.round(avail),
    suggestedDate: suggested,
    message: `Very unlikely in the time left: about ${need} hours needed but only ${Math.round(avail)} available. Consider moving the exam to around ${suggested}, studying more each day, or setting an interim target.`,
  };
}

export function phaseFor(daysLeft: number, totalDays: number): Phase {
  if (daysLeft <= 3) return 'final';
  if (daysLeft <= Math.max(14, Math.round(totalDays * 0.25))) return 'exam';
  const elapsed = 1 - daysLeft / Math.max(totalDays, 1);
  if (elapsed < 0.35 && totalDays > 21) return 'foundation';
  return 'skills';
}

function bandToDifficulty(b: number): 1 | 2 | 3 {
  return b < 5.5 ? 1 : b < 6.5 ? 2 : 3;
}

/** Pick the next item: unattempted at the right difficulty first, then any unattempted, then least recently done. */
function pickNext<T extends { id: string; difficulty?: number }>(items: T[], done: Map<string, string>, difficulty: number): T | undefined {
  if (!items.length) return undefined;
  const fresh = items.filter((i) => !done.has(i.id));
  const atLevel = fresh.filter((i) => i.difficulty == null || i.difficulty === difficulty);
  if (atLevel.length) return atLevel[0];
  if (fresh.length) return [...fresh].sort((a, b) => Math.abs((a.difficulty ?? difficulty) - difficulty) - Math.abs((b.difficulty ?? difficulty) - difficulty))[0];
  return [...items].sort((a, b) => (done.get(a.id) ?? '').localeCompare(done.get(b.id) ?? ''))[0];
}

const TYPE_GUIDES: Record<string, Record<string, string>> = {
  reading: { tfng: 'guide-reading-tfng', ynng: 'guide-reading-ynng', matching: 'guide-reading-headings', gap: 'guide-reading-completion', mcq: 'guide-reading-mcq' },
  listening: { gap: 'guide-listening-form-completion', mcq: 'guide-listening-mcq', matching: 'guide-listening-maps-matching' },
};

function weakestType(s: AppState, kind: 'reading' | 'listening'): string | null {
  const stats = Object.entries(questionTypeStats(s, kind)).filter(([, v]) => v.total >= 3);
  if (!stats.length) return null;
  stats.sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);
  return stats[0][0];
}

export function buildPlan(s: AppState, now = new Date()): Plan | null {
  const p = s.profile;
  if (!p) return null;
  const todayStr = today(now);
  const daysLeft = Math.max(0, Math.round((parse(p.examDate) - parse(todayStr)) / DAY));
  const totalDays = Math.max(1, Math.round((parse(p.examDate) - parse(p.createdAt)) / DAY));
  const phase = phaseFor(daysLeft, totalDays);
  const est = estimateAll(s);
  const current = Object.fromEntries(SKILLS.map((k) => [k, est[k].band])) as Record<Skill, number>;
  const weights = Object.fromEntries(SKILLS.map((k) => [k, Math.max(0.35, p.targetBand - current[k] + 0.5)])) as Record<Skill, number>;
  const focus = [...SKILLS].sort((a, b) => weights[b] - weights[a]).filter((k) => current[k] < p.targetBand);
  const feas = feasibility(current, p.targetBand, daysLeft, p.hoursPerDay, todayStr);

  const budget = Math.round(p.hoursPerDay * 60);
  const tasks: PlanTask[] = [];
  let used = 0;
  const push = (t: PlanTask) => {
    tasks.push(t);
    used += t.minutes;
  };

  // Vocabulary review every day
  const due = allWords.filter((w) => s.srs[w.key] && isDue(s.srs[w.key], todayStr)).length;
  const learned = allWords.filter((w) => s.srs[w.key]).length;
  push({
    id: 'vocab',
    kind: 'vocabulary',
    title: due > 0 ? `Review ${due} vocabulary cards` : 'Learn 15 new vocabulary words',
    detail: `Spaced repetition keeps words for exam day. ${learned} of ${allWords.length} words started.`,
    minutes: phase === 'final' ? 10 : 15,
    to: '/vocabulary',
  });

  // Mock days: exam phase every 5th day, skills phase every 14th day (by days left), never in the final 2 days.
  const lastMock = s.attempts.filter((a) => a.kind === 'mock').map((a) => a.date).sort().at(-1);
  const daysSinceMock = lastMock ? Math.round((parse(todayStr) - parse(lastMock)) / DAY) : 999;
  const mockEvery = phase === 'exam' ? 5 : phase === 'skills' ? 14 : 999;
  const isMockDay = daysSinceMock >= mockEvery && budget >= 150 && phase !== 'final';

  if (isMockDay) {
    push({ id: 'mock', kind: 'mock', title: 'Full mock test (Listening, Reading, Writing)', detail: 'Exam conditions: no pauses, no dictionary. Review every wrong answer afterwards.', minutes: 170, to: '/mock' });
    if (used + 15 <= budget + 20) push({ id: 'speak-mock', kind: 'speaking', title: 'Speaking mock (Parts 1–3)', detail: 'Record yourself, then rate with the band descriptors.', minutes: 15, to: '/speaking/mock' });
  }

  const doneMap = (kind: string) => {
    const m = new Map<string, string>();
    s.attempts.filter((a) => a.kind === kind).forEach((a) => m.set(a.itemId, a.date));
    if (kind === 'writing') s.writing.forEach((w) => m.set(w.taskId, w.date));
    if (kind === 'speaking') s.speaking.forEach((w) => m.set(w.itemId, w.date));
    return m;
  };

  // Foundation: unread guides for top focus skill + grammar
  if (!isMockDay && phase === 'foundation') {
    const guideOrder = ['guide-exam-overview', 'guide-band-scores', 'guide-study-method', `guide-${focus[0] ?? 'writing'}-overview`, 'guide-writing-criteria', 'guide-speaking-overview', 'guide-reading-overview', 'guide-listening-overview'];
    const g = guideOrder.map((id) => guides.find((x) => x.id === id)).find((x) => x && !s.readGuides.includes(x.id)) ?? guides.find((x) => !s.readGuides.includes(x.id));
    if (g) push({ id: 'guide', kind: 'guide', title: `Read: ${g.title}`, detail: g.summary, minutes: 15, to: `/guides/${g.id}` });
    const gdone = doneMap('grammar');
    const lesson = grammarLessons.find((l) => !gdone.has(l.id));
    if (lesson && (weights.writing >= 1 || weights.speaking >= 1)) push({ id: 'grammar', kind: 'grammar', title: `Grammar: ${lesson.title}`, detail: `Unlocks band ${lesson.targetBand}+ in Writing & Speaking (GRA).`, minutes: 20, to: `/grammar/${lesson.id}` });
  }

  // Skill blocks ordered by need × staleness
  const staleness = (k: Skill) => {
    const lp = lastPractised(s, k);
    return lp ? Math.min(7, Math.round((parse(todayStr) - parse(lp)) / DAY)) + 1 : 8;
  };
  const order = [...SKILLS].sort((a, b) => weights[b] * staleness(b) - weights[a] * staleness(a));
  const finalMode = phase === 'final';

  for (const skill of isMockDay ? [] : order) {
    if (used >= budget) break;
    const diff = bandToDifficulty(current[skill]);
    if (skill === 'reading') {
      const weak = weakestType(s, 'reading');
      const passage = pickNext(readingPassages.filter((r) => r.module === p.module || p.module === 'academic' || r.module === 'general'), doneMap('reading'), diff);
      if (passage)
        push({
          id: 'reading',
          kind: 'reading',
          title: `Reading: ${passage.title}`,
          detail: `${passage.groups.flatMap((g) => g.questions).length} questions, 20 minutes timed.${weak ? ` Your weakest type so far: ${weak.toUpperCase()} — read the guide first if you have not.` : ''}`,
          minutes: finalMode ? 20 : 30,
          to: `/reading/${passage.id}`,
        });
      if (weak && TYPE_GUIDES.reading[weak] && !s.readGuides.includes(TYPE_GUIDES.reading[weak]) && used < budget)
        push({ id: 'guide-r', kind: 'guide', title: 'Strategy for your weakest reading question type', detail: 'Learn the method, then apply it in the next passage.', minutes: 10, to: `/guides/${TYPE_GUIDES.reading[weak]}` });
    }
    if (skill === 'listening') {
      const pool = phase === 'foundation' ? listeningSections.filter((x) => x.part <= 2 || current.listening >= 6) : listeningSections;
      const sec = pickNext(pool, doneMap('listening'), diff);
      if (sec) push({ id: 'listening', kind: 'listening', title: `Listening Part ${sec.part}: ${sec.title}`, detail: 'Read questions first, listen once, then study the transcript for every mistake.', minutes: finalMode ? 15 : 25, to: `/listening/${sec.id}` });
    }
    if (skill === 'writing' && !finalMode) {
      const done = doneMap('writing');
      const t2count = s.writing.filter((w) => w.taskId.startsWith('w2')).length;
      const t1count = s.writing.filter((w) => w.taskId.startsWith('w1')).length;
      const wantTask = t2count <= t1count * 2 ? 2 : 1; // Task 2 worth double — practise it twice as often
      const pool = writingTasks.filter((w) => w.task === wantTask && (w.task === 2 || w.module === p.module));
      const task = pickNext(pool.map((w) => ({ ...w, difficulty: undefined })), done, 0);
      if (task)
        push({
          id: 'writing',
          kind: 'writing',
          title: `Writing Task ${task.task}: ${task.type.replace(/-/g, ' ')} (${task.topic})`,
          detail: `${task.task === 2 ? '40' : '20'} minutes writing + review against the band ${Math.max(...task.models.map((m) => m.band))} model answer.`,
          minutes: task.task === 2 ? 55 : 30,
          to: `/writing/${task.id}`,
        });
    }
    if (skill === 'speaking') {
      const card = pickNext(cueCards, doneMap('speaking'), 0);
      const p1 = speakingPart1[Math.floor(parse(todayStr) / DAY) % Math.max(1, speakingPart1.length)];
      if (card) push({ id: 'speaking', kind: 'speaking', title: `Speaking: ${card.topic}`, detail: `Part 2 cue card with 1-minute preparation, then Part 3 questions${p1 ? `. Warm up with Part 1: ${p1.topic}` : ''}.`, minutes: finalMode ? 10 : 20, to: `/speaking/card/${card.id}` });
    }
  }

  if ((phase === 'skills' || phase === 'exam' || phase === 'final') && s.errorLog.length && used < budget + 10)
    push({ id: 'errors', kind: 'review', title: `Review your error log (${s.errorLog.length} notes)`, detail: 'Re-read past mistakes so you stop repeating them.', minutes: 10, to: '/progress#errors' });

  // milestones
  const milestones: { date: string; label: string }[] = [];
  const examT = parse(p.examDate);
  const tExam = examT - Math.max(14, Math.round(totalDays * 0.25)) * DAY;
  const tSkills = parse(p.createdAt) + Math.round(totalDays * 0.35) * DAY;
  if (totalDays > 21 && tSkills < tExam) milestones.push({ date: fmt(tSkills), label: 'Phase 2 starts — timed skill practice' });
  milestones.push({ date: fmt(tExam), label: 'Phase 3 starts — weekly full mock tests' });
  milestones.push({ date: fmt(examT - 3 * DAY), label: 'Taper — light review only' });
  milestones.push({ date: p.examDate, label: `Exam day — target band ${p.targetBand}` });

  return {
    daysLeft,
    phase,
    phaseInfo: PHASES[phase],
    weights,
    focus,
    feasibility: feas,
    today: tasks,
    totalMinutes: used,
    isMockDay,
    milestones: milestones.filter((m) => m.date >= fmt(parse(p.createdAt))),
  };
}
