import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findWriting } from '../content';
import type { ModelAnswer, WritingTask as WritingTaskT } from '../content/types';
import { criterionName } from '../content/descriptors';
import { BandBadge, Empty, PageHeader, ProgressBar, Stat, Tabs, TimerBadge, fmtTime, useTimer } from '../components/ui';
import { VisualView, describeVisual } from '../components/Visual';
import { analyseEssay, type Issue } from '../lib/writingAnalysis';
import { countWords, criteriaBand } from '../lib/scoring';
import { describeError, gradeWriting, type WritingFeedback } from '../lib/ai';
import { addError, addWriting, updateWriting, useStore, type WritingSubmission } from '../lib/store';
import { CriteriaAssess } from './Descriptors';
import { writingTypeLabel } from './WritingList';

type Stage = 'brief' | 'write' | 'feedback';
type View = 'practice' | 'models' | 'history';
type WCrit = { tr: number; cc: number; lr: number; gra: number };

/* ---------------- draft persistence (per task) ---------------- */

const draftKey = (id: string) => `ielts-master:draft:writing:${id}`;
function loadDraft(id: string): string {
  try {
    return localStorage.getItem(draftKey(id)) ?? '';
  } catch {
    return '';
  }
}
function saveDraft(id: string, text: string) {
  try {
    if (text.trim()) localStorage.setItem(draftKey(id), text);
    else localStorage.removeItem(draftKey(id));
  } catch {
    /* storage blocked — draft stays in memory only */
  }
}
function clearDraft(id: string) {
  try {
    localStorage.removeItem(draftKey(id));
  } catch {
    /* ignore */
  }
}

export function parseWritingFeedback(raw: string | undefined): WritingFeedback | null {
  if (!raw) return null;
  try {
    const fb = JSON.parse(raw) as WritingFeedback;
    return fb && typeof fb === 'object' && fb.tr && typeof fb.tr.band === 'number' ? fb : null;
  } catch {
    return null;
  }
}

const CRITS: Issue['criterion'][] = ['TR', 'CC', 'LR', 'GRA'];
const SEVERITY_STYLE: Record<Issue['severity'], string> = {
  high: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};
const SOURCE_LABEL: Record<NonNullable<WritingSubmission['source']>, string> = { auto: 'rough estimate', self: 'self-assessed', ai: 'AI examiner' };

/* ------------------------------------------------------------------ */

export default function WritingTask() {
  const { id = '' } = useParams();
  const task = findWriting(id);
  if (!task)
    return (
      <div>
        <PageHeader title="Writing task" back={{ to: '/writing', label: 'All writing tasks' }} />
        <Empty title="Task not found">
          We couldn't find a writing task with id “{id}”.{' '}
          <Link to="/writing" className="text-brand-600 hover:underline dark:text-brand-400">
            Back to Writing
          </Link>
        </Empty>
      </div>
    );
  return <TaskPage key={task.id} task={task} />;
}

function TaskPage({ task }: { task: WritingTaskT }) {
  const min = task.task === 1 ? 150 : 250;
  const limit = task.task === 1 ? 20 * 60 : 40 * 60;
  const subs = useStore((s) => s.writing);
  const history = useMemo(() => subs.filter((w) => w.taskId === task.id).sort((a, b) => b.date.localeCompare(a.date)), [subs, task.id]);

  const [stage, setStage] = useState<Stage>('brief');
  const [view, setView] = useState<View>('practice');
  const [text, setText] = useState(() => loadDraft(task.id));
  const [subId, setSubId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [overtime, setOvertime] = useState(false);
  const timer = useTimer(limit, running, () => setOvertime(true));
  const words = countWords(text);
  const current = history.find((h) => h.id === subId) ?? null;

  useEffect(() => {
    if (stage === 'write') saveDraft(task.id, text);
  }, [text, stage, task.id]);

  const start = (fresh: boolean) => {
    if (fresh) {
      setText('');
      clearDraft(task.id);
    }
    timer.reset();
    setOvertime(false);
    setRunning(true);
    setStage('write');
    setView('practice');
  };

  const submit = () => {
    const a = analyseEssay(text, task.task, task.prompt, task.module);
    const sub = addWriting({
      taskId: task.id,
      text,
      wordCount: words,
      minutes: Math.max(1, Math.round(timer.elapsed / 60)),
      criteria: { tr: a.estimate.tr, cc: a.estimate.cc, lr: a.estimate.lr, gra: a.estimate.gra },
      band: a.estimate.overall,
      source: 'auto',
    });
    clearDraft(task.id);
    setRunning(false);
    setSubId(sub.id);
    setStage('feedback');
  };

  const review = (id: string) => {
    setSubId(id);
    setStage('feedback');
    setView('practice');
  };

  const learnerText = current?.text ?? (text.trim() ? text : history[0]?.text ?? '');

  return (
    <div>
      <PageHeader
        title={`Task ${task.task}: ${writingTypeLabel(task.type)}`}
        subtitle={`${task.task === 1 ? (task.module === 'academic' ? 'Academic' : 'General Training') : 'Academic & General'} · ${task.topic} · ${task.task === 1 ? '20' : '40'} minutes · at least ${min} words`}
        back={{ to: '/writing', label: 'All writing tasks' }}
      />

      {stage !== 'write' && (
        <Tabs
          tabs={[
            { id: 'practice', label: stage === 'feedback' ? 'Feedback' : 'Practice' },
            { id: 'models', label: `Model answers (${task.models.length})` },
            { id: 'history', label: `History (${history.length})` },
          ]}
          value={view}
          onChange={setView}
        />
      )}

      {view === 'models' && stage !== 'write' && <ModelAnswers models={task.models} learnerText={learnerText} task={task.task} />}
      {view === 'history' && stage !== 'write' && <History items={history} onReview={review} />}

      {(view === 'practice' || stage === 'write') && (
        <>
          {stage === 'brief' && <Brief task={task} draftWords={words} onStart={start} />}
          {stage === 'write' && (
            <WriteStage
              task={task}
              text={text}
              setText={setText}
              words={words}
              min={min}
              timer={timer}
              limit={limit}
              overtime={overtime}
              onSubmit={submit}
              onBack={() => {
                setRunning(false);
                setStage('brief');
              }}
            />
          )}
          {stage === 'feedback' && current && <Feedback key={current.id} task={task} sub={current} onAgain={() => start(true)} />}
          {stage === 'feedback' && !current && (
            <Empty title="Submission not found">
              <button className="btn-secondary mt-2" onClick={() => setStage('brief')}>
                Back to the task
              </button>
            </Empty>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------- (a) Brief ---------------- */

function PromptCard({ task, compact = false }: { task: WritingTaskT; compact?: boolean }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className={`whitespace-pre-line font-serif leading-7 ${compact ? 'text-sm' : ''}`}>{task.prompt}</div>
      {task.visual && task.module === 'academic' && (
        <div className="mt-4">
          {compact ? (
            <details>
              <summary className="cursor-pointer text-sm font-medium text-brand-600 dark:text-brand-400">Show the {task.visual.kind === 'map' ? 'maps' : task.visual.kind === 'process' ? 'diagram' : 'chart'}</summary>
              <div className="mt-2">
                <VisualView visual={task.visual} />
              </div>
            </details>
          ) : (
            <VisualView visual={task.visual} />
          )}
        </div>
      )}
    </div>
  );
}

function UsefulLanguage({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Useful language</h3>
      <ul className="flex flex-wrap gap-1.5" aria-label="Useful language">
        {items.map((u) => (
          <li key={u} className="chip bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200">
            {u}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Brief({ task, draftWords, onStart }: { task: WritingTaskT; draftWords: number; onStart: (fresh: boolean) => void }) {
  return (
    <div className="space-y-4">
      <PromptCard task={task} />
      <div className="card space-y-4 p-4 sm:p-5">
        <details>
          <summary className="cursor-pointer font-semibold">📝 Plan for this question</summary>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
            {task.plan.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
          <p className="muted mt-2 text-xs" lang="vi">
            Mẹo: dành {task.task === 1 ? '2–3' : '5'} phút lập dàn ý trước khi viết — bài có dàn ý thường được điểm CC cao hơn.
          </p>
        </details>
        <UsefulLanguage items={task.usefulLanguage} />
      </div>
      <div className="flex flex-wrap gap-2">
        {draftWords > 0 ? (
          <>
            <button className="btn-primary" onClick={() => onStart(false)}>
              Resume draft ({draftWords} words)
            </button>
            <button className="btn-secondary" onClick={() => onStart(true)}>
              Start fresh
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={() => onStart(true)}>
            Start writing ({task.task === 1 ? 20 : 40} min)
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- (b) Write ---------------- */

function WriteStage(props: {
  task: WritingTaskT;
  text: string;
  setText: (s: string) => void;
  words: number;
  min: number;
  timer: { elapsed: number; remaining: number | null };
  limit: number;
  overtime: boolean;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const { task, text, setText, words, min, timer, limit, overtime, onSubmit, onBack } = props;
  const enough = words >= min;
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="space-y-3 lg:col-span-3">
        <div className="card sticky top-2 z-10 flex flex-wrap items-center gap-3 p-3">
          <TimerBadge remaining={timer.remaining} elapsed={timer.elapsed} warnAt={task.task === 1 ? 180 : 300} />
          <div className="min-w-[160px] flex-1">
            <div className="flex justify-between text-xs">
              <span className={enough ? 'font-semibold text-emerald-700 dark:text-emerald-400' : 'font-semibold text-amber-700 dark:text-amber-400'} aria-live="polite">
                {words} words
              </span>
              <span className="muted">{enough ? '✓ minimum reached' : `minimum ${min}`}</span>
            </div>
            <ProgressBar value={words} max={min} color={enough ? 'bg-emerald-500' : 'bg-amber-500'} className="mt-1" />
          </div>
          <button className="btn-primary" onClick={onSubmit} disabled={words === 0}>
            Submit for feedback
          </button>
        </div>
        {overtime && (
          <div role="alert" className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
            ⏰ Time is up. In the real test you would have to stop now. You can keep writing for practice — you are {fmtTime(timer.elapsed - limit)} over.
          </div>
        )}
        <textarea
          className="input min-h-[60vh] font-serif text-base leading-7"
          aria-label="Your answer"
          placeholder={task.task === 1 && task.module === 'general' ? 'Dear …,' : 'Write your answer here. Separate paragraphs with a blank line.'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="sentences"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="muted">Spell-check is off, as in the real test. Your draft is saved on this device automatically.</span>
          <button className="btn-ghost" onClick={onBack}>
            ← Back to brief
          </button>
        </div>
      </div>
      <aside className="space-y-3 lg:col-span-2">
        <PromptCard task={task} compact />
        <div className="card p-4">
          <UsefulLanguage items={task.usefulLanguage} />
        </div>
      </aside>
    </div>
  );
}

/* ---------------- (c) Feedback ---------------- */

function Feedback({ task, sub, onAgain }: { task: WritingTaskT; sub: WritingSubmission; onAgain: () => void }) {
  const a = useMemo(() => analyseEssay(sub.text, task.task, task.prompt, task.module), [sub.text, task]);
  const apiKey = useStore((s) => s.settings.apiKey);
  const [crit, setCrit] = useState<WCrit>(() => (sub.criteria && sub.source !== 'auto' ? sub.criteria : { tr: 6, cc: 6, lr: 6, gra: 6 }));
  const [savedSelf, setSavedSelf] = useState(false);
  const [logged, setLogged] = useState<Set<string>>(new Set());
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [fb, setFb] = useState<WritingFeedback | null>(() => parseWritingFeedback(sub.feedback));
  const min = task.task === 1 ? 150 : 250;

  const log = (key: string, note: string) => {
    addError({ skill: 'writing', source: `Writing ${task.id} · ${task.topic}`, note });
    setLogged((s) => new Set(s).add(key));
  };

  const saveSelf = () => {
    updateWriting(sub.id, { criteria: crit, band: criteriaBand([crit.tr, crit.cc, crit.lr, crit.gra]), source: 'self' });
    setSavedSelf(true);
  };

  const runAi = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await gradeWriting(apiKey, {
        task: task.task,
        module: task.module,
        prompt: task.prompt,
        visualDescription: task.visual ? describeVisual(task.visual) : undefined,
        essay: sub.text,
      });
      setFb(res);
      const c = { tr: res.tr.band, cc: res.cc.band, lr: res.lr.band, gra: res.gra.band };
      updateWriting(sub.id, { criteria: c, band: criteriaBand([c.tr, c.cc, c.lr, c.gra]), source: 'ai', feedback: JSON.stringify(res) });
    } catch (e) {
      setAiError(describeError(e));
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <div className="text-sm font-semibold">Submitted {new Date(sub.date).toLocaleString()}</div>
          <div className="muted text-xs">
            {sub.wordCount} words · {sub.minutes} min · saved band: {sub.band != null ? sub.band.toFixed(1) : '–'} ({SOURCE_LABEL[sub.source ?? 'auto']})
          </div>
        </div>
        <button className="btn-secondary" onClick={onAgain}>
          Write this task again
        </button>
      </div>

      <section aria-labelledby="stats-h">
        <h2 id="stats-h" className="h2 mb-3">
          Instant analysis
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Stat label="Words" value={a.words} hint={a.words >= min ? `✓ ≥ ${min}` : `below ${min}`} />
          <Stat label="Paragraphs" value={a.paragraphs} hint={task.task === 1 ? 'aim 3–4' : 'aim 4–5'} />
          <Stat label="Linkers" value={a.linkers.distinct} hint={a.linkers.found.slice(0, 4).join(', ') || 'none found'} />
          <Stat label="Lexical diversity" value={a.lexicalDiversity.toFixed(2)} hint="≥ 0.70 is strong" />
          <Stat label="Complex sentences" value={`${Math.round(a.complexSentenceRatio * 100)}%`} hint="band 7 ≈ 50%+" />
          <Stat label="Avg sentence" value={`${a.avgSentenceLength} w`} hint={`${a.sentences} sentences`} />
        </div>
      </section>

      <section className="card p-4 sm:p-5" aria-labelledby="est-h">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="est-h" className="h2">
            Rough estimate
          </h2>
          <BandBadge band={a.estimate.overall} size="lg" />
          <div className="flex flex-wrap gap-2 text-xs">
            {(['tr', 'cc', 'lr', 'gra'] as const).map((k) => (
              <span key={k} className="flex items-center gap-1">
                {k.toUpperCase()} <BandBadge band={a.estimate[k]} size="sm" />
              </span>
            ))}
          </div>
        </div>
        <p className="muted mt-2 text-xs">
          ⚠️ This is a rough estimate from automatic text features (length, linking, vocabulary variety, common errors). It cannot judge ideas or accuracy like an examiner — use the self-assessment or the AI examiner below for a real judgement.
        </p>
      </section>

      <section aria-labelledby="issues-h">
        <h2 id="issues-h" className="h2 mb-3">
          Issues found
        </h2>
        {a.issues.length === 0 ? (
          <p className="muted text-sm">No automatic issues detected. Check your essay against the descriptors below.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {CRITS.map((c) => {
              const list = a.issues.filter((i) => i.criterion === c);
              return (
                <div key={c} className="card p-4">
                  <h3 className="mb-2 font-semibold">
                    {c} · {criterionName('writing', c.toLowerCase(), task.task)} <span className="muted text-xs font-normal">({list.length})</span>
                  </h3>
                  {list.length === 0 ? (
                    <p className="muted text-sm">Nothing flagged.</p>
                  ) : (
                    <ul className="space-y-2">
                      {list.map((i, idx) => {
                        const key = `${c}-${idx}`;
                        return (
                          <li key={key} className="rounded-lg bg-slate-50 p-2 text-sm dark:bg-slate-800/60">
                            <span className={`chip mr-1 ${SEVERITY_STYLE[i.severity]}`}>{i.severity}</span>
                            {i.message}
                            {i.excerpt && <div className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">“{i.excerpt}”</div>}
                            <div className="mt-1 text-right">
                              <button className="btn-ghost px-2 py-1 text-xs" disabled={logged.has(key)} onClick={() => log(key, `[${c}] ${i.message}${i.excerpt ? ` — “${i.excerpt}”` : ''}`)}>
                                {logged.has(key) ? '✓ Added to error log' : '+ Add to error log'}
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="card p-4 sm:p-5" aria-labelledby="self-h">
        <h2 id="self-h" className="h2">
          Self-assessment
        </h2>
        <p className="muted mb-3 text-sm">
          Re-read your answer and pick the band whose description fits best for each criterion. <span lang="vi">Mẹo: hãy khắt khe — giám khảo chấm theo điểm yếu nhất.</span>
        </p>
        <CriteriaAssess<keyof WCrit>
          skill="writing"
          task={task.task}
          value={crit}
          onChange={(v) => {
            setCrit(v);
            setSavedSelf(false);
          }}
        />
        <div className="mt-3 flex items-center gap-3">
          <button className="btn-primary" onClick={saveSelf}>
            Save my self-assessment
          </button>
          {savedSelf && (
            <span className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
              ✓ Saved
            </span>
          )}
        </div>
      </section>

      <section className="card p-4 sm:p-5" aria-labelledby="ai-h">
        <h2 id="ai-h" className="h2">
          🤖 AI examiner
        </h2>
        {apiKey ? (
          <>
            <p className="muted mb-3 text-sm">Get a criterion-by-criterion assessment, corrections and an improved paragraph. Uses your own Anthropic API key; the essay is sent directly from your browser to Anthropic.</p>
            <button className="btn-primary" onClick={runAi} disabled={aiLoading}>
              {aiLoading ? 'Assessing… (this can take a minute)' : fb ? 'Ask the AI examiner again' : 'Ask the AI examiner'}
            </button>
            {aiError && (
              <p role="alert" className="mt-2 text-sm text-rose-700 dark:text-rose-300">
                {aiError}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm">
            The AI examiner uses <strong>your own Anthropic API key</strong>, which is stored only on this device and sent directly to Anthropic — never to us.{' '}
            <Link to="/settings" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
              Add your key in Settings
            </Link>{' '}
            to enable it.
          </p>
        )}
        {fb && <AiWritingReport fb={fb} task={task} onLog={(note) => addError({ skill: 'writing', source: `Writing ${task.id} · AI correction`, note })} />}
      </section>
    </div>
  );
}

function AiWritingReport({ fb, task, onLog }: { fb: WritingFeedback; task: WritingTaskT; onLog: (note: string) => void }) {
  const [logged, setLogged] = useState<Set<number>>(new Set());
  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <BandBadge band={criteriaBand([fb.tr.band, fb.cc.band, fb.lr.band, fb.gra.band])} size="lg" label="AI" />
        <p className="flex-1 text-sm">{fb.summary}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {(['tr', 'cc', 'lr', 'gra'] as const).map((k) => (
          <div key={k} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
            <div className="mb-1 flex items-center justify-between font-semibold">
              {k.toUpperCase()} · {criterionName('writing', k, task.task)} <BandBadge band={fb[k].band} size="sm" />
            </div>
            {fb[k].strengths.length > 0 && (
              <ul className="mb-1 space-y-0.5">
                {fb[k].strengths.map((s, i) => (
                  <li key={i}>✅ {s}</li>
                ))}
              </ul>
            )}
            {fb[k].weaknesses.length > 0 && (
              <ul className="space-y-0.5">
                {fb[k].weaknesses.map((s, i) => (
                  <li key={i}>⚠️ {s}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {fb.corrections.length > 0 && (
        <div>
          <h3 className="mb-2 font-semibold">Corrections</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left">
                  <th className="border-b border-slate-200 py-1 pr-2 dark:border-slate-700">You wrote</th>
                  <th className="border-b border-slate-200 py-1 pr-2 dark:border-slate-700">Better</th>
                  <th className="border-b border-slate-200 py-1 pr-2 dark:border-slate-700">Why</th>
                  <th className="border-b border-slate-200 py-1 dark:border-slate-700">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fb.corrections.map((c, i) => (
                  <tr key={i} className="align-top">
                    <td className="border-b border-slate-100 py-2 pr-2 text-rose-700 line-through decoration-rose-300 dark:border-slate-800 dark:text-rose-300">{c.original}</td>
                    <td className="border-b border-slate-100 py-2 pr-2 text-emerald-700 dark:border-slate-800 dark:text-emerald-300">{c.corrected}</td>
                    <td className="border-b border-slate-100 py-2 pr-2 dark:border-slate-800">{c.explanation}</td>
                    <td className="border-b border-slate-100 py-2 dark:border-slate-800">
                      <button
                        className="btn-ghost px-2 py-1 text-xs"
                        disabled={logged.has(i)}
                        onClick={() => {
                          onLog(`“${c.original}” → “${c.corrected}” — ${c.explanation}`);
                          setLogged((s) => new Set(s).add(i));
                        }}
                      >
                        {logged.has(i) ? '✓ Logged' : '+ Error log'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {fb.nextSteps.length > 0 && (
        <div>
          <h3 className="mb-1 font-semibold">Next steps</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {fb.nextSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}
      {fb.improvedParagraph && (
        <div>
          <h3 className="mb-1 font-semibold">Your weakest paragraph, improved</h3>
          <blockquote className="whitespace-pre-line rounded-xl border-l-4 border-emerald-400 bg-emerald-50 p-3 font-serif text-sm leading-7 dark:bg-emerald-950/30">{fb.improvedParagraph}</blockquote>
        </div>
      )}
    </div>
  );
}

/* ---------------- Model answers + history ---------------- */

function ModelAnswers({ models, learnerText, task }: { models: ModelAnswer[]; learnerText: string; task: 1 | 2 }) {
  const sorted = useMemo(() => [...models].sort((a, b) => b.band - a.band), [models]);
  const [idx, setIdx] = useState(0);
  if (!sorted.length) return <Empty title="No model answers yet" />;
  const m = sorted[Math.min(idx, sorted.length - 1)];
  const words = countWords(m.text);
  return (
    <div className="space-y-4">
      {sorted.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a model answer">
          {sorted.map((x, i) => (
            <button key={i} className={i === idx ? 'btn-primary' : 'btn-secondary'} aria-pressed={i === idx} onClick={() => setIdx(i)}>
              Band {x.band.toFixed(1)} model
            </button>
          ))}
        </div>
      )}
      <div className={`grid gap-4 ${learnerText ? 'lg:grid-cols-2' : ''}`}>
        {learnerText && (
          <div className="card p-4 sm:p-5">
            <h3 className="mb-2 font-semibold">Your answer</h3>
            <div className="whitespace-pre-line font-serif text-sm leading-7">{learnerText}</div>
            <div className="muted mt-2 text-xs">{countWords(learnerText)} words</div>
          </div>
        )}
        <div className="card p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">Model answer</h3>
            <BandBadge band={m.band} label="band" />
          </div>
          <div className="whitespace-pre-line font-serif text-sm leading-7">{m.text}</div>
          <div className="muted mt-2 text-xs">{words} words</div>
        </div>
      </div>
      <div className="card p-4 sm:p-5">
        <h3 className="mb-2 font-semibold">Examiner commentary</h3>
        <dl className="grid gap-3 text-sm md:grid-cols-2">
          {(['tr', 'cc', 'lr', 'gra'] as const).map((k) => (
            <div key={k}>
              <dt className="font-semibold">
                {k.toUpperCase()} · {criterionName('writing', k, task)}
              </dt>
              <dd className="mt-0.5">{m.commentary[k]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function History({ items, onReview }: { items: WritingSubmission[]; onReview: (id: string) => void }) {
  if (!items.length) return <Empty title="No submissions yet">Your past attempts at this task will appear here.</Empty>;
  return (
    <ul className="space-y-3">
      {items.map((s) => (
        <li key={s.id} className="card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm">
              <div className="font-semibold">{new Date(s.date).toLocaleString()}</div>
              <div className="muted text-xs">
                {s.wordCount} words · {s.minutes} min · {SOURCE_LABEL[s.source ?? 'auto']}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BandBadge band={s.band} />
              <button className="btn-secondary" onClick={() => onReview(s.id)}>
                Review feedback
              </button>
            </div>
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm text-brand-600 dark:text-brand-400">Show text</summary>
            <div className="mt-2 whitespace-pre-line font-serif text-sm leading-7">{s.text}</div>
          </details>
        </li>
      ))}
    </ul>
  );
}
