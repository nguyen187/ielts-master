import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diagnosticItems } from '../content';
import type { Module, Skill } from '../content/types';
import { PageHeader, ProgressBar, SKILL_META, TimerBadge, useTimer } from '../components/ui';
import { addAttempt, getState, saveProfile, today, useStore } from '../lib/store';
import { scoreDiagnostic, startBandsFrom } from '../lib/diagnostic';
import { feasibility } from '../lib/planner';
import { SKILLS } from '../lib/progress';

const BANDS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
const SELF_LEVELS = [
  { band: 4, label: 'Beginner–elementary', desc: 'I understand simple everyday phrases; I struggle with longer texts.' },
  { band: 5, label: 'Pre-intermediate (A2–B1)', desc: 'I handle familiar topics but make frequent errors and lack vocabulary.' },
  { band: 5.5, label: 'Intermediate (B1)', desc: 'I can follow the main ideas of articles and conversations on familiar topics.' },
  { band: 6.5, label: 'Upper-intermediate (B2)', desc: 'I read news articles and follow lectures with some effort; I speak fairly fluently.' },
  { band: 7.5, label: 'Advanced (C1)', desc: 'I use English flexibly at work or study; errors are rare.' },
];

const addDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return today(d);
};

type Step = 'goal' | 'level' | 'diagnostic' | 'result';

export default function Onboarding() {
  const nav = useNavigate();
  const existing = useStore((s) => s.profile);
  const [step, setStep] = useState<Step>('goal');
  const [name, setName] = useState(existing?.name ?? '');
  const [module, setModule] = useState<Module>(existing?.module ?? 'academic');
  const [target, setTarget] = useState(existing?.targetBand ?? 6.5);
  const [examDate, setExamDate] = useState(existing?.examDate ?? addDays(90));
  const [hours, setHours] = useState(existing?.hoursPerDay ?? 2);
  const [bands, setBands] = useState<Record<Skill, number>>(existing?.startBands ?? { listening: 5.5, reading: 5.5, writing: 5, speaking: 5 });
  const [source, setSource] = useState<'diagnostic' | 'previous' | 'self'>('diagnostic');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qi, setQi] = useState(0);
  const [diagResult, setDiagResult] = useState<ReturnType<typeof scoreDiagnostic> | null>(null);
  const timer = useTimer(20 * 60, step === 'diagnostic', () => finishDiagnostic());

  const daysLeft = Math.round((new Date(examDate + 'T00:00:00').getTime() - new Date(today() + 'T00:00:00').getTime()) / 86400000);
  const feas = useMemo(() => feasibility(bands, target, daysLeft, hours, today()), [bands, target, daysLeft, hours]);

  function finishDiagnostic() {
    const r = scoreDiagnostic(diagnosticItems, answers);
    setDiagResult(r);
    setBands(startBandsFrom(r.band));
    setStep('result');
  }

  function save() {
    saveProfile({
      name: name.trim(),
      module,
      targetBand: target,
      examDate,
      hoursPerDay: hours,
      startBands: bands,
      createdAt: existing?.createdAt && getState().attempts.length ? existing.createdAt : new Date().toISOString(),
    });
    if (diagResult) addAttempt({ kind: 'diagnostic', itemId: 'diagnostic', title: 'Placement test', score: diagResult.correct, total: diagResult.total, band: diagResult.band });
    nav('/');
  }

  const stepIdx = { goal: 0, level: 1, diagnostic: 1, result: 2 }[step];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={existing ? 'Update your goal' : 'Set up your study plan'} subtitle="Three quick steps: your goal, your current level, then a personalised plan to exam day." />
      <div className="mb-6 flex gap-2">
        {['Goal', 'Current level', 'Your plan'].map((l, i) => (
          <div key={l} className="flex-1">
            <ProgressBar value={i <= stepIdx ? 1 : 0} max={1} />
            <div className={`mt-1 text-xs ${i === stepIdx ? 'font-semibold text-brand-700 dark:text-brand-300' : 'muted'}`}>
              {i + 1}. {l}
            </div>
          </div>
        ))}
      </div>

      {step === 'goal' && (
        <div className="card space-y-5 p-6">
          <div>
            <label className="label" htmlFor="name">
              Your name (optional)
            </label>
            <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Linh" />
          </div>
          <div>
            <span className="label">Which test are you taking?</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {(['academic', 'general'] as Module[]).map((m) => (
                <button key={m} type="button" onClick={() => setModule(m)} className={`rounded-xl border p-3 text-left text-sm ${module === m ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-300 dark:border-slate-700'}`} aria-pressed={module === m}>
                  <div className="font-semibold">{m === 'academic' ? 'Academic' : 'General Training'}</div>
                  <div className="muted text-xs">{m === 'academic' ? 'University study, professional registration' : 'Migration, work, secondary education'}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label" htmlFor="target">
                Target overall band
              </label>
              <select id="target" className="input" value={target} onChange={(e) => setTarget(Number(e.target.value))}>
                {BANDS.filter((b) => b >= 5).map((b) => (
                  <option key={b} value={b}>
                    {b.toFixed(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="date">
                Exam date
              </label>
              <input id="date" type="date" className="input" value={examDate} min={addDays(1)} onChange={(e) => setExamDate(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="hours">
                Study time per day
              </label>
              <select id="hours" className="input" value={hours} onChange={(e) => setHours(Number(e.target.value))}>
                {[0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6].map((h) => (
                  <option key={h} value={h}>
                    {h < 1 ? '30 minutes' : `${h} hour${h > 1 ? 's' : ''}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="muted text-sm">Mẹo: Hầu hết trường đại học yêu cầu 6.0–7.0; định cư thường cần 6.0–8.0 tuỳ chương trình. Hãy kiểm tra yêu cầu chính xác của nơi bạn nộp.</p>
          <button className="btn-primary w-full" onClick={() => setStep('level')} disabled={!examDate || daysLeft < 1}>
            Continue
          </button>
        </div>
      )}

      {step === 'level' && (
        <div className="card space-y-5 p-6">
          <div className="grid gap-2 sm:grid-cols-3">
            {(
              [
                ['diagnostic', '🧪 Placement test', '20 minutes · 30 questions · most accurate'],
                ['previous', '📄 I have an IELTS score', 'Enter your previous band per skill'],
                ['self', '🙋 Quick self-assessment', 'Pick the description that fits you'],
              ] as const
            ).map(([k, t, d]) => (
              <button key={k} type="button" onClick={() => setSource(k)} aria-pressed={source === k} className={`rounded-xl border p-3 text-left text-sm ${source === k ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-300 dark:border-slate-700'}`}>
                <div className="font-semibold">{t}</div>
                <div className="muted text-xs">{d}</div>
              </button>
            ))}
          </div>
          {source === 'diagnostic' && (
            <div className="text-sm">
              <p>Grammar, vocabulary and short reading questions from band 4.5 to 8.5. Don&apos;t guess wildly — choose &quot;I don&apos;t know&quot; if unsure so the estimate stays accurate.</p>
              <button className="btn-primary mt-4 w-full" onClick={() => setStep('diagnostic')} disabled={!diagnosticItems.length}>
                Start placement test
              </button>
            </div>
          )}
          {source === 'previous' && (
            <div className="grid gap-3 sm:grid-cols-4">
              {SKILLS.map((k) => (
                <div key={k}>
                  <label className="label" htmlFor={`b-${k}`}>
                    {SKILL_META[k].icon} {SKILL_META[k].label}
                  </label>
                  <select id={`b-${k}`} className="input" value={bands[k]} onChange={(e) => setBands((b) => ({ ...b, [k]: Number(e.target.value) }))}>
                    {BANDS.map((b) => (
                      <option key={b} value={b}>
                        {b.toFixed(1)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          {source === 'self' && (
            <div className="space-y-2">
              {SELF_LEVELS.map((l) => (
                <button key={l.band} type="button" onClick={() => setBands(startBandsFrom(l.band))} className={`block w-full rounded-xl border p-3 text-left text-sm ${bands.reading === l.band ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-300 dark:border-slate-700'}`}>
                  <span className="font-semibold">{l.label}</span> <span className="muted">— about band {l.band}</span>
                  <div className="muted text-xs">{l.desc}</div>
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setStep('goal')}>
              Back
            </button>
            {source !== 'diagnostic' && (
              <button className="btn-primary flex-1" onClick={() => setStep('result')}>
                See my plan
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'diagnostic' && diagnosticItems[qi] && (
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="muted text-sm">
              Question {qi + 1} of {diagnosticItems.length}
            </span>
            <TimerBadge remaining={timer.remaining} elapsed={timer.elapsed} warnAt={120} />
          </div>
          <ProgressBar value={qi} max={diagnosticItems.length} className="mb-5" />
          {diagnosticItems[qi].passage && <blockquote className="mb-4 rounded-xl bg-slate-50 p-4 font-serif text-[15px] leading-7 dark:bg-slate-800/60">{diagnosticItems[qi].passage}</blockquote>}
          <div className="mb-4 font-medium">{diagnosticItems[qi].prompt}</div>
          <div className="space-y-2" role="radiogroup" aria-label="Answer options">
            {diagnosticItems[qi].options.map((o, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={answers[diagnosticItems[qi].id] === i}
                className={`block w-full rounded-xl border px-4 py-2.5 text-left text-sm transition ${answers[diagnosticItems[qi].id] === i ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-300 hover:border-brand-400 dark:border-slate-700'}`}
                onClick={() => setAnswers((a) => ({ ...a, [diagnosticItems[qi].id]: i }))}
              >
                <b className="mr-2">{String.fromCharCode(65 + i)}</b>
                {o}
              </button>
            ))}
            <button className={`block w-full rounded-xl border border-dashed px-4 py-2 text-left text-sm ${answers[diagnosticItems[qi].id] === -1 ? 'border-slate-500 bg-slate-100 dark:bg-slate-800' : 'border-slate-300 dark:border-slate-700'}`} onClick={() => setAnswers((a) => ({ ...a, [diagnosticItems[qi].id]: -1 }))}>
              I don&apos;t know
            </button>
          </div>
          <div className="mt-6 flex gap-2">
            <button className="btn-secondary" disabled={qi === 0} onClick={() => setQi((q) => q - 1)}>
              Back
            </button>
            {qi < diagnosticItems.length - 1 ? (
              <button className="btn-primary flex-1" disabled={answers[diagnosticItems[qi].id] === undefined} onClick={() => setQi((q) => q + 1)}>
                Next
              </button>
            ) : (
              <button className="btn-primary flex-1" disabled={answers[diagnosticItems[qi].id] === undefined} onClick={finishDiagnostic}>
                Finish
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'result' && (
        <div className="space-y-5">
          {diagResult && (
            <div className="card p-6">
              <h2 className="h2">Placement result</h2>
              <p className="mt-1 text-sm">
                {diagResult.correct}/{diagResult.total} correct → estimated language level around <b>band {diagResult.band.toFixed(1)}</b>.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {diagResult.bySkill.map((s) => (
                  <div key={s.skill} className="rounded-lg bg-slate-50 px-3 py-2 text-sm capitalize dark:bg-slate-800/60">
                    {s.skill}: <b>{s.correct}/{s.total}</b>
                  </div>
                ))}
              </div>
              <p className="muted mt-3 text-xs">This is a starting estimate. Your bands update automatically as you complete listening, reading, writing and speaking practice.</p>
            </div>
          )}
          <div className="card p-6">
            <h2 className="h2 mb-3">Starting bands (you can adjust)</h2>
            <div className="grid gap-3 sm:grid-cols-4">
              {SKILLS.map((k) => (
                <div key={k}>
                  <label className="label" htmlFor={`r-${k}`}>
                    {SKILL_META[k].icon} {SKILL_META[k].label}
                  </label>
                  <select id={`r-${k}`} className="input" value={bands[k]} onChange={(e) => setBands((b) => ({ ...b, [k]: Number(e.target.value) }))}>
                    {BANDS.map((b) => (
                      <option key={b} value={b}>
                        {b.toFixed(1)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`card border-l-4 p-6 ${feas.level === 'unrealistic' ? 'border-l-rose-500' : feas.level === 'ambitious' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}
            data-testid="feasibility"
          >
            <h2 className="h2">
              {feas.level === 'achieved' ? '🎉 Target already within reach' : feas.level === 'on-track' ? '✅ Realistic goal' : feas.level === 'ambitious' ? '⚠️ Ambitious goal' : '⛔ Very unlikely on this timeline'}
            </h2>
            <p className="mt-2 text-sm">{feas.message}</p>
            <p className="muted mt-2 text-xs">
              {daysLeft} days until the exam · {hours} h/day · estimate based on typical guided-study hours per half band.
            </p>
            {feas.suggestedDate && (
              <button className="btn-secondary mt-3" onClick={() => setExamDate(feas.suggestedDate!)}>
                Move exam date to {feas.suggestedDate}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setStep('level')}>
              Back
            </button>
            <button className="btn-primary flex-1" onClick={save}>
              Create my plan →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
