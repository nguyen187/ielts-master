import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listeningTests, readingPassages, writingTasks } from '../content';
import type { ListeningTest, QuestionGroup, ReadingPassage, WritingTask } from '../content/types';
import { BandBadge, PageHeader, TimerBadge, useTimer, Tabs, SKILL_META } from '../components/ui';
import { QuestionGroups } from '../components/Questions';
import { ListeningPlayer, Transcript } from '../components/ListeningPlayer';
import { VisualView } from '../components/Visual';
import { PassageText } from './ReadingTest';
import { gradeGroups, overallBand, rawToBand, countWords, writingBand, type GradeResult } from '../lib/scoring';
import { analyseEssay } from '../lib/writingAnalysis';
import { addAttempt, addWriting, getState, useStore } from '../lib/store';
import { estimateSkill } from '../lib/progress';

type Stage = 'intro' | 'listening' | 'listening-check' | 'reading' | 'writing' | 'results';

/** Renumber questions so a full test runs 1–40 across sections. */
function offsets(groupsList: QuestionGroup[][]) {
  const out: number[] = [];
  let n = 0;
  for (const gs of groupsList) {
    out.push(n);
    n += gs.reduce((a, g) => a + g.questions.length, 0);
  }
  return out;
}

function leastUsed<T extends { id: string }>(items: T[], used: Set<string>): T | undefined {
  return items.find((i) => !used.has(i.id)) ?? items[Math.floor(Math.random() * items.length)];
}

export function pickMock(module: 'academic' | 'general', history: { itemId: string }[]) {
  const used = new Set(history.map((h) => h.itemId));
  const lt: ListeningTest | undefined = leastUsed(listeningTests, used);
  const pool = readingPassages.filter((p) => p.module === module);
  const passages: ReadingPassage[] = [];
  if (module === 'academic') {
    for (const d of [1, 2, 3] as const) {
      const p = leastUsed(pool.filter((x) => x.difficulty === d && !passages.includes(x)), used) ?? leastUsed(pool.filter((x) => !passages.includes(x)), used);
      if (p) passages.push(p);
    }
  } else {
    passages.push(...pool.slice(0, 2));
    const extra = leastUsed(readingPassages.filter((p) => p.module === 'academic' && p.difficulty === 1), used);
    if (extra) passages.push(extra);
  }
  const t1 = leastUsed(writingTasks.filter((w) => w.task === 1 && w.module === module), used);
  const t2 = leastUsed(writingTasks.filter((w) => w.task === 2), used);
  return { listening: lt, passages, t1, t2 };
}

function WritingPane({ task, value, onChange }: { task: WritingTask; value: string; onChange: (v: string) => void }) {
  const min = task.task === 1 ? 150 : 250;
  const wc = countWords(value);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card space-y-3 p-5">
        <div className="text-xs font-bold uppercase text-slate-500">Writing Task {task.task} · spend about {task.task === 1 ? 20 : 40} minutes</div>
        <p className="whitespace-pre-line text-sm">{task.prompt}</p>
        {task.visual && <VisualView visual={task.visual} />}
      </div>
      <div className="card flex flex-col p-4">
        <textarea aria-label={`Task ${task.task} answer`} className="input min-h-[420px] flex-1 font-serif text-[15px] leading-7" value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} placeholder="Write your answer here…" />
        <div className={`mt-2 text-right text-sm ${wc >= min ? 'text-emerald-600' : 'muted'}`}>
          {wc} words {wc < min && `(minimum ${min})`}
        </div>
      </div>
    </div>
  );
}

export default function MockTest() {
  const profile = useStore((s) => s.profile);
  const module = profile?.module ?? 'academic';
  const history = useStore((s) => s.attempts);
  const set = useMemo(() => pickMock(module, history.filter((a) => a.kind === 'mock' || a.kind === 'listening' || a.kind === 'reading')), [module]); // eslint-disable-line react-hooks/exhaustive-deps
  const [stage, setStage] = useState<Stage>('intro');
  const [includeWriting, setIncludeWriting] = useState(true);
  const [secIdx, setSecIdx] = useState(0);
  const [lAnswers, setLAnswers] = useState<Record<string, string>>({});
  const [rAnswers, setRAnswers] = useState<Record<string, string>>({});
  const [pTab, setPTab] = useState(0);
  const [wTab, setWTab] = useState<'t1' | 't2'>('t1');
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [res, setRes] = useState<null | { l: GradeResult; r: GradeResult; lb: number; rb: number; wb: number | null; sb: number; overall: number; w1b: number | null; w2b: number | null }>(null);
  const [reviewTab, setReviewTab] = useState<'listening' | 'reading'>('listening');

  const checkTimer = useTimer(120, stage === 'listening-check', () => setStage('reading'));
  const readTimer = useTimer(60 * 60, stage === 'reading', () => endReading());
  const writeTimer = useTimer(60 * 60, stage === 'writing', () => finish());

  useEffect(() => {
    if (stage === 'intro' || stage === 'results') return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [stage]);

  const lt = set.listening;
  if (!lt || set.passages.length < 3 || !set.t1 || !set.t2)
    return <PageHeader title="Full mock test" subtitle="Content is still loading — not enough material for a full test yet." />;

  const lGroups = lt.sections.map((s) => s.groups);
  const lOff = offsets(lGroups);
  const rGroups = set.passages.map((p) => p.groups);
  const rOff = offsets(rGroups);

  function endReading() {
    if (includeWriting) setStage('writing');
    else finish();
  }

  function finish() {
    if (!lt || !set.t1 || !set.t2) return;
    const l = gradeGroups(lGroups.flat(), lAnswers);
    const r = gradeGroups(rGroups.flat(), rAnswers);
    const lb = rawToBand('listening', l.correct, l.total);
    const rb = rawToBand('reading', r.correct, r.total, module);
    let w1b: number | null = null;
    let w2b: number | null = null;
    if (includeWriting) {
      if (countWords(w1) > 20) {
        w1b = analyseEssay(w1, 1, set.t1.prompt, set.t1.module).estimate.overall;
        addWriting({ taskId: set.t1.id, text: w1, wordCount: countWords(w1), minutes: 20, band: w1b, source: 'auto' });
      } else w1b = countWords(w1) ? 3 : 0;
      if (countWords(w2) > 20) {
        w2b = analyseEssay(w2, 2, set.t2.prompt).estimate.overall;
        addWriting({ taskId: set.t2.id, text: w2, wordCount: countWords(w2), minutes: 40, band: w2b, source: 'auto' });
      } else w2b = countWords(w2) ? 3 : 0;
    }
    const wb = includeWriting ? writingBand(w1b, w2b) : null;
    const sb = estimateSkill(getState(), 'speaking').band;
    const wForOverall = wb ?? estimateSkill(getState(), 'writing').band;
    const overall = overallBand([lb, rb, wForOverall, sb]);
    addAttempt({
      kind: 'mock',
      itemId: `mock-${lt.id}-${set.passages.map((p) => p.id).join('-')}`,
      title: `Mock: ${lt.title} + ${set.passages.map((p) => p.id.toUpperCase()).join(', ')}`,
      score: l.correct + r.correct,
      total: l.total + r.total,
      band: overall,
      bands: { listening: lb, reading: rb, ...(wb != null ? { writing: wb } : {}) },
    });
    setRes({ l, r, lb, rb, wb, sb, overall, w1b, w2b });
    setStage('results');
    window.scrollTo(0, 0);
  }

  const section = lt.sections[secIdx];

  if (stage === 'intro')
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Full mock test" subtitle="The closest thing to the real exam: Listening (≈30 min, 40 questions), Reading (60 min, 3 passages), Writing (60 min, 2 tasks). Take it in one sitting." />
        <div className="card space-y-4 p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-sky-50 p-4 text-sm dark:bg-sky-950/40">
              <div className="font-semibold">🎧 Listening</div>
              <div className="muted">{lt.title} · 4 parts · plays once</div>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4 text-sm dark:bg-emerald-950/40">
              <div className="font-semibold">📖 Reading</div>
              <div className="muted">{set.passages.map((p) => p.title).join(' · ')}</div>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 text-sm dark:bg-amber-950/40">
              <div className="font-semibold">✍️ Writing</div>
              <div className="muted">
                Task 1 ({set.t1.type.replace(/-/g, ' ')}) · Task 2 ({set.t2.type.replace(/-/g, ' ')})
              </div>
            </div>
          </div>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>Use headphones in a quiet room. Don&apos;t pause and don&apos;t use a dictionary.</li>
            <li>Listening: 30 seconds to read questions before each part, then 2 minutes to check at the end.</li>
            <li>Reading and Writing are timed and submit automatically.</li>
            <li>Speaking is taken separately in the <Link className="text-brand-600 underline" to="/speaking/mock">Speaking mock</Link>; your latest speaking estimate is used for the overall band.</li>
            {module === 'general' && <li className="text-amber-700 dark:text-amber-400">General Training reading here uses two GT long texts plus one easier academic passage — an approximation of the GT format.</li>}
          </ul>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={includeWriting} onChange={(e) => setIncludeWriting(e.target.checked)} /> Include Writing (adds 60 minutes)
          </label>
          <button className="btn-primary w-full" onClick={() => setStage('listening')}>
            Begin the test
          </button>
        </div>
      </div>
    );

  if (stage === 'results' && res)
    return (
      <div className="space-y-6">
        <PageHeader title="Mock test results" subtitle="Review every wrong answer: understanding why you missed it is where most of the improvement comes from." />
        <div className="card p-6">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div className="muted text-xs uppercase">Overall (estimated)</div>
              <BandBadge band={res.overall} size="lg" />
            </div>
            {(
              [
                ['listening', res.lb, `${res.l.correct}/40`],
                ['reading', res.rb, `${res.r.correct}/${res.r.total}`],
                ['writing', res.wb, res.wb != null ? `T1 ${res.w1b} · T2 ${res.w2b} (auto)` : 'not taken'],
                ['speaking', res.sb, 'latest estimate'],
              ] as const
            ).map(([k, b, d]) => (
              <div key={k}>
                <div className="muted text-xs uppercase">
                  {SKILL_META[k].icon} {SKILL_META[k].label}
                </div>
                <BandBadge band={b} />
                <div className="muted text-xs">{d}</div>
              </div>
            ))}
          </div>
          {res.wb != null && (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              The writing band is an automatic rough estimate. For a reliable score open your essays in{' '}
              <Link className="underline" to={`/writing/${set.t1.id}`}>
                Task 1
              </Link>{' '}
              and{' '}
              <Link className="underline" to={`/writing/${set.t2.id}`}>
                Task 2
              </Link>{' '}
              and use self-assessment or the AI examiner.
            </p>
          )}
        </div>
        <Tabs
          tabs={[
            { id: 'listening', label: '🎧 Listening review' },
            { id: 'reading', label: '📖 Reading review' },
          ]}
          value={reviewTab}
          onChange={setReviewTab}
        />
        {reviewTab === 'listening' &&
          lt.sections.map((s, i) => (
            <details key={s.id} className="card p-5" open={i === 0}>
              <summary className="cursor-pointer font-semibold">
                Part {s.part}: {s.title}
              </summary>
              <div className="mt-4">
                <QuestionGroups groups={s.groups} answers={lAnswers} onChange={() => undefined} result={res.l} numberOffset={lOff[i]} />
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-brand-600">Transcript</summary>
                  <div className="mt-3">
                    <Transcript section={s} highlight={s.groups.flatMap((g) => (g.type === 'gap' ? g.questions.map((q) => q.answer[0]) : []))} />
                  </div>
                </details>
              </div>
            </details>
          ))}
        {reviewTab === 'reading' &&
          set.passages.map((p, i) => (
            <details key={p.id} className="card p-5" open={i === 0}>
              <summary className="cursor-pointer font-semibold">
                Passage {i + 1}: {p.title}
              </summary>
              <div className="mt-4 grid gap-6 lg:grid-cols-2">
                <div className="max-h-[70vh] overflow-y-auto">
                  <PassageText passage={p} />
                </div>
                <QuestionGroups groups={p.groups} answers={rAnswers} onChange={() => undefined} result={res.r} numberOffset={rOff[i]} />
              </div>
            </details>
          ))}
        <Link to="/" className="btn-primary">
          Back to today&apos;s plan
        </Link>
      </div>
    );

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 mb-4 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur lg:top-0 dark:border-slate-800 dark:bg-slate-950/95">
        <span className="font-semibold">
          {stage.startsWith('listening') ? '🎧 Listening' : stage === 'reading' ? '📖 Reading' : '✍️ Writing'}
        </span>
        {stage === 'listening' && <span className="muted text-sm">Part {secIdx + 1} of 4</span>}
        <span className="flex-1" />
        {stage === 'listening-check' && (
          <>
            <TimerBadge remaining={checkTimer.remaining} elapsed={checkTimer.elapsed} warnAt={30} />
            <button className="btn-primary" onClick={() => setStage('reading')}>
              Go to Reading →
            </button>
          </>
        )}
        {stage === 'reading' && (
          <>
            <TimerBadge remaining={readTimer.remaining} elapsed={readTimer.elapsed} />
            <button className="btn-primary" onClick={() => window.confirm('Finish Reading now?') && endReading()}>
              Finish Reading
            </button>
          </>
        )}
        {stage === 'writing' && (
          <>
            <TimerBadge remaining={writeTimer.remaining} elapsed={writeTimer.elapsed} />
            <button className="btn-primary" onClick={() => window.confirm('Submit the whole test?') && finish()}>
              Submit test
            </button>
          </>
        )}
      </div>

      {stage === 'listening' && (
        <div className="space-y-4">
          <ListeningPlayer
            key={section.id}
            section={section}
            examMode
            autoStart
            prepSeconds={30}
            onEnded={() => {
              if (secIdx < 3) setTimeout(() => setSecIdx((i) => i + 1), 1500);
              else setStage('listening-check');
            }}
          />
          <p className="muted text-sm">{section.context}</p>
          <QuestionGroups groups={section.groups} answers={lAnswers} onChange={(id, v) => setLAnswers((a) => ({ ...a, [id]: v }))} numberOffset={lOff[secIdx]} />
          <button className="btn-ghost text-xs" onClick={() => (secIdx < 3 ? setSecIdx((i) => i + 1) : setStage('listening-check'))}>
            Skip to next part (audio problems)
          </button>
        </div>
      )}

      {stage === 'listening-check' && (
        <div className="space-y-4">
          <p className="card p-4 text-sm">You have 2 minutes to check your answers. Spelling and plurals matter.</p>
          {lt.sections.map((s, i) => (
            <QuestionGroups key={s.id} groups={s.groups} answers={lAnswers} onChange={(id, v) => setLAnswers((a) => ({ ...a, [id]: v }))} numberOffset={lOff[i]} />
          ))}
        </div>
      )}

      {stage === 'reading' && (
        <div>
          <Tabs tabs={set.passages.map((p, i) => ({ id: String(i), label: `Passage ${i + 1} (Q${rOff[i] + 1}–${rOff[i] + p.groups.reduce((a, g) => a + g.questions.length, 0)})` }))} value={String(pTab)} onChange={(v) => setPTab(Number(v))} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6 lg:sticky lg:top-16 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <PassageText passage={set.passages[pTab]} />
            </div>
            <div>
              <QuestionGroups groups={set.passages[pTab].groups} answers={rAnswers} onChange={(id, v) => setRAnswers((a) => ({ ...a, [id]: v }))} numberOffset={rOff[pTab]} />
              {pTab < 2 && (
                <button className="btn-secondary mt-4" onClick={() => setPTab((t) => t + 1)}>
                  Next passage →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {stage === 'writing' && (
        <div>
          <Tabs
            tabs={[
              { id: 't1', label: `Task 1 (${countWords(w1)} words)` },
              { id: 't2', label: `Task 2 (${countWords(w2)} words)` },
            ]}
            value={wTab}
            onChange={setWTab}
          />
          {wTab === 't1' ? <WritingPane task={set.t1} value={w1} onChange={setW1} /> : <WritingPane task={set.t2} value={w2} onChange={setW2} />}
        </div>
      )}
    </div>
  );
}
