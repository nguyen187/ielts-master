import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BandBadge, ProgressBar, SKILL_META } from '../components/ui';
import { buildPlan } from '../lib/planner';
import { estimateAll, SKILLS } from '../lib/progress';
import { getState, streak, today, togglePlanTask, useStore } from '../lib/store';
import { cueCards, guides, listeningSections, readingPassages, vocabTopics, writingTasks, grammarLessons, allWords } from '../content';

const KIND_ICON: Record<string, string> = { listening: '🎧', reading: '📖', writing: '✍️', speaking: '🗣️', vocabulary: '🧠', grammar: '🧩', mock: '📝', review: '🗂️', guide: '🧭' };

function Landing() {
  const features = [
    ['🧪', 'Placement test + realistic plan', 'Find your level in 20 minutes. Get a day-by-day plan to exam day with an honest check of whether your target is achievable.'],
    ['🎧', `${listeningSections.length} listening parts`, 'Four full tests in British, Australian, American, Irish and NZ accents with transcripts and explanations.'],
    ['📖', `${readingPassages.length} reading passages`, 'Every question type, timed, with the exact evidence for each answer and the trap it tests.'],
    ['✍️', `${writingTasks.length} writing tasks`, 'Band 6 vs band 8–9 model answers with examiner comments, instant feedback, and an optional AI examiner.'],
    ['🗣️', `${cueCards.length} cue cards + Part 1 & 3`, 'Timed preparation, recording, live transcript, fluency stats and band 8 sample answers.'],
    ['🧠', `${allWords.length} words · ${grammarLessons.length} grammar lessons`, `Spaced-repetition vocabulary in ${vocabTopics.length} IELTS topics with Vietnamese meanings, plus grammar for band 7+.`],
  ];
  return (
    <div>
      <section className="card overflow-hidden">
        <div className="bg-gradient-to-br from-brand-600 to-indigo-800 px-6 py-12 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Free · no account · your data stays on your device</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">Reach your target IELTS band with a plan that adapts to you.</h1>
          <p className="mt-4 max-w-2xl text-brand-100">
            Diagnostic test → personalised daily plan → practice for all four skills → full mock tests → band tracking. Everything you need, in one place.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-brand-200">Lộ trình ôn IELTS cá nhân hoá: kiểm tra trình độ, kế hoạch mỗi ngày, luyện 4 kỹ năng và thi thử.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/start" className="btn bg-white text-brand-700 hover:bg-brand-50">
              Start — find my level
            </Link>
            <Link to="/guides/guide-exam-overview" className="btn border border-white/40 text-white hover:bg-white/10">
              How IELTS works
            </Link>
          </div>
        </div>
      </section>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([i, t, d]) => (
          <div key={t} className="card p-5">
            <div className="text-2xl">{i}</div>
            <div className="mt-2 font-semibold text-slate-900 dark:text-white">{t}</div>
            <p className="muted mt-1 text-sm">{d}</p>
          </div>
        ))}
      </div>
      <div className="card mt-8 p-6">
        <h2 className="h2">How the method works</h2>
        <ol className="mt-3 grid gap-4 text-sm sm:grid-cols-4">
          {[
            ['Diagnose', 'Placement test and your previous scores set starting bands for each skill.'],
            ['Plan', 'Time to exam × hours per day × skill gaps → phases and daily tasks, weighted to your weakest skill.'],
            ['Practise deliberately', 'Timed practice, explanations, error log and spaced repetition — every mistake becomes a lesson.'],
            ['Simulate', 'Regular full mock tests in the final weeks build timing and stamina; the plan re-balances after each one.'],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="text-xs font-bold text-brand-600">STEP {i + 1}</div>
              <div className="font-semibold">{t}</div>
              <div className="muted mt-1">{d}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Home() {
  const state = useStore((s) => s);
  const plan = useMemo(() => buildPlan(state), [state]);
  const est = useMemo(() => estimateAll(state), [state]);
  if (!state.profile || !plan) return <Landing />;
  const p = state.profile;
  const t = today();
  const done = state.planDone[t] ?? [];
  const completedMin = plan.today.filter((x) => done.includes(x.id)).reduce((a, x) => a + x.minutes, 0);
  const st = streak(state.activeDays);
  const unreadGuides = guides.filter((g) => !state.readGuides.includes(g.id)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="h1">{p.name ? `Hi ${p.name} 👋` : 'Your study plan'}</h1>
          <p className="muted mt-1">
            {plan.daysLeft > 0 ? `${plan.daysLeft} day${plan.daysLeft === 1 ? '' : 's'} until your ${p.module === 'general' ? 'General Training' : 'Academic'} exam on ${p.examDate}` : 'Exam day — good luck! 🍀'} · 🔥 {st}-day streak
          </p>
        </div>
        <Link to="/start" className="btn-secondary">
          Edit goal
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card p-5 lg:col-span-2" aria-labelledby="today-h">
          <div className="flex items-center justify-between">
            <h2 id="today-h" className="h2">
              Today&apos;s plan
            </h2>
            <span className="muted text-sm">
              {completedMin}/{plan.totalMinutes} min
            </span>
          </div>
          <ProgressBar value={completedMin} max={plan.totalMinutes} className="mt-3" color="bg-emerald-500" />
          {plan.isMockDay && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">📝 Mock test day — block out 3 hours without interruptions.</p>}
          <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            {plan.today.map((task) => {
              const isDone = done.includes(task.id);
              return (
                <li key={task.id} className="flex items-start gap-3 py-3">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 accent-emerald-600" checked={isDone} onChange={() => togglePlanTask(t, task.id)} aria-label={`Mark "${task.title}" as done`} />
                  <span className="mt-0.5 text-xl" aria-hidden>
                    {KIND_ICON[task.kind]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link to={task.to} className={`font-medium hover:text-brand-700 hover:underline ${isDone ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                      {task.title}
                    </Link>
                    <div className="muted text-sm">{task.detail}</div>
                  </div>
                  <span className="chip shrink-0 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{task.minutes} min</span>
                </li>
              );
            })}
          </ul>
          <p className="muted mt-2 text-xs">Tasks are chosen from your weakest skills, what you practised least recently and the current phase. Completing practice updates tomorrow&apos;s plan automatically.</p>
        </section>

        <section className="card p-5" aria-labelledby="phase-h">
          <h2 id="phase-h" className="h2">
            {plan.phaseInfo.title}
          </h2>
          <p className="muted mt-2 text-sm">{plan.phaseInfo.goal}</p>
          <ol className="mt-4 space-y-3 border-l-2 border-slate-200 pl-4 dark:border-slate-700">
            {plan.milestones.map((m) => (
              <li key={m.date + m.label} className="relative text-sm">
                <span className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full ${m.date <= t ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                <div className="font-medium">{m.label}</div>
                <div className="muted text-xs">{m.date}</div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="card p-5" aria-labelledby="bands-h">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="bands-h" className="h2">
            Estimated bands vs target
          </h2>
          <div className="flex items-center gap-2 text-sm">
            Overall <BandBadge band={est.overall} /> → target <BandBadge band={p.targetBand} />
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((k) => {
            const e = est[k];
            const gap = p.targetBand - e.band;
            return (
              <Link key={k} to={`/${k}`} className="rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {SKILL_META[k].icon} {SKILL_META[k].label}
                  </span>
                  <BandBadge band={e.band} size="sm" />
                </div>
                <ProgressBar value={e.band - 3} max={p.targetBand - 3} className="mt-3" color={gap <= 0 ? 'bg-emerald-500' : gap <= 0.5 ? 'bg-sky-500' : 'bg-amber-500'} />
                <div className="muted mt-2 text-xs">
                  {gap <= 0 ? 'Target reached ✓' : `${gap.toFixed(1)} band to go`} · {e.confidence === 'self-reported' ? 'starting estimate' : `${e.samples} result${e.samples > 1 ? 's' : ''}, ${e.confidence} confidence`}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={`card border-l-4 p-5 ${plan.feasibility.level === 'unrealistic' ? 'border-l-rose-500' : plan.feasibility.level === 'ambitious' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}>
        <h2 className="h2">Reality check</h2>
        <p className="mt-1 text-sm">{plan.feasibility.message}</p>
        {plan.focus.length > 0 && (
          <p className="muted mt-2 text-sm">
            Priority order: {plan.focus.map((f) => SKILL_META[f].label).join(' → ')}
          </p>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/mock" className="card p-5 transition hover:border-brand-300">
          <div className="text-2xl">📝</div>
          <div className="mt-1 font-semibold">Full mock test</div>
          <div className="muted text-sm">{getState().attempts.filter((a) => a.kind === 'mock').length} completed</div>
        </Link>
        <Link to="/progress#errors" className="card p-5 transition hover:border-brand-300">
          <div className="text-2xl">🗂️</div>
          <div className="mt-1 font-semibold">Error log</div>
          <div className="muted text-sm">{state.errorLog.length} notes to review</div>
        </Link>
        <Link to="/guides" className="card p-5 transition hover:border-brand-300">
          <div className="text-2xl">🧭</div>
          <div className="mt-1 font-semibold">Strategy guides</div>
          <div className="muted text-sm">{unreadGuides} unread</div>
        </Link>
      </div>
    </div>
  );
}
