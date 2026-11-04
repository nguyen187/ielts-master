import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { findCueCard, findGuide, findWriting, speakingPart1 } from '../content';
import type { QuestionType, Skill } from '../content/types';
import { BandBadge, Empty, PageHeader, SKILL_META, Stat } from '../components/ui';
import { addError, removeError, streak, today, useStore, type AppState, type ErrorLogEntry } from '../lib/store';
import { bandHistory, estimateAll, questionTypeStats, SKILLS } from '../lib/progress';
import { QUESTION_TYPE_LABELS } from '../lib/scoring';

/* Colours chosen to stay readable on both white and slate-900 backgrounds. */
const SKILL_COLOR: Record<Skill, string> = { listening: '#0ea5e9', reading: '#10b981', writing: '#f59e0b', speaking: '#f43f5e' };

const GUIDE_FOR_TYPE: Record<'reading' | 'listening', Partial<Record<QuestionType, string>>> = {
  reading: { tfng: 'guide-reading-tfng', ynng: 'guide-reading-ynng', matching: 'guide-reading-headings', gap: 'guide-reading-completion', mcq: 'guide-reading-mcq' },
  listening: { gap: 'guide-listening-form-completion', mcq: 'guide-listening-mcq', matching: 'guide-listening-maps-matching', tfng: 'guide-listening-overview', ynng: 'guide-listening-overview' },
};

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
const dayMs = 86400000;
const dayNum = (d: string) => Math.round(new Date(d + 'T00:00:00').getTime() / dayMs);

/* ---------------- Band history chart (hand-written SVG) ---------------- */

export function BandChart({ history, target }: { history: ReturnType<typeof bandHistory>; target?: number }) {
  const all = history.flatMap((h) => h.points);
  if (!all.length) return <Empty title="No band history yet">Complete a reading, listening, writing or speaking task to start your chart.</Empty>;
  const W = 640;
  const H = 260;
  const pad = { l: 34, r: 14, t: 14, b: 30 };
  const days = all.map((p) => dayNum(p.date));
  let x0 = Math.min(...days);
  let x1 = Math.max(...days);
  if (x0 === x1) {
    x0 -= 1;
    x1 += 1;
  }
  const lowest = Math.min(...all.map((p) => p.band), target ?? 9);
  const y0 = Math.max(0, Math.floor(lowest) - 1);
  const y1 = 9;
  const sx = (d: number) => pad.l + ((d - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const sy = (b: number) => pad.t + ((y1 - b) / (y1 - y0)) * (H - pad.t - pad.b);
  const ticks = Array.from({ length: y1 - y0 + 1 }, (_, i) => y0 + i);
  const xTicks = [...new Set([x0, Math.round((x0 + x1) / 2), x1])];
  const label = (d: number) => new Date(d * dayMs).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Band score history by skill">
        <title>Band score history by skill</title>
        {ticks.map((b) => (
          <g key={b}>
            <line x1={pad.l} x2={W - pad.r} y1={sy(b)} y2={sy(b)} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth={1} />
            <text x={pad.l - 6} y={sy(b) + 4} textAnchor="end" className="fill-slate-500 text-[11px] dark:fill-slate-400">
              {b}
            </text>
          </g>
        ))}
        {xTicks.map((d, i) => (
          <text key={d} x={sx(d)} y={H - 8} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} className="fill-slate-500 text-[11px] dark:fill-slate-400">
            {label(d)}
          </text>
        ))}
        {target != null && target >= y0 && (
          <g>
            <line x1={pad.l} x2={W - pad.r} y1={sy(target)} y2={sy(target)} className="stroke-brand-500 dark:stroke-brand-400" strokeDasharray="6 4" strokeWidth={1.5} />
            <text x={W - pad.r} y={sy(target) - 5} textAnchor="end" className="fill-brand-600 text-[11px] font-semibold dark:fill-brand-300">
              Target {target}
            </text>
          </g>
        )}
        {history.map(({ skill, points }) => {
          if (!points.length) return null;
          const pts = points.map((p) => [sx(dayNum(p.date)), sy(p.band)] as const);
          return (
            <g key={skill}>
              {pts.length > 1 && <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={SKILL_COLOR[skill]} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />}
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={4} fill={SKILL_COLOR[skill]} className="stroke-white dark:stroke-slate-900" strokeWidth={1.5}>
                  <title>{`${SKILL_META[skill].label} ${points[i].date}: band ${points[i].band}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
      <ul className="mt-2 flex flex-wrap gap-4 text-sm" aria-label="Legend">
        {history.map(({ skill, points }) => (
          <li key={skill} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: SKILL_COLOR[skill] }} aria-hidden />
            {SKILL_META[skill].label} <span className="muted text-xs">({points.length})</span>
          </li>
        ))}
        {target != null && (
          <li className="flex items-center gap-2">
            <span className="inline-block w-5 border-t-2 border-dashed border-brand-500" aria-hidden /> Target
          </li>
        )}
      </ul>
    </div>
  );
}

/* ---------------- Question-type accuracy ---------------- */

function TypeAccuracy({ state, kind }: { state: AppState; kind: 'reading' | 'listening' }) {
  const stats = questionTypeStats(state, kind);
  const rows = Object.entries(stats)
    .filter(([, v]) => v.total > 0)
    .map(([t, v]) => ({ type: t as QuestionType, ...v, pct: Math.round((v.correct / v.total) * 100) }))
    .sort((a, b) => a.pct - b.pct);
  const weakest = rows.length > 1 ? rows[0].type : null;
  return (
    <div className="card p-5">
      <h3 className="h2 mb-3">
        {SKILL_META[kind].icon} {SKILL_META[kind].label}
      </h3>
      {!rows.length ? (
        <p className="muted text-sm">
          No {kind} attempts yet.{' '}
          <Link to={`/${kind}`} className="text-brand-600 underline dark:text-brand-400">
            Start practising
          </Link>
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => {
            const isWeak = r.type === weakest;
            const gid = GUIDE_FOR_TYPE[kind][r.type];
            const guide = gid ? findGuide(gid) : undefined;
            return (
              <li key={r.type}>
                <div className="mb-1 flex justify-between gap-2 text-sm">
                  <span className={isWeak ? 'font-semibold text-rose-700 dark:text-rose-300' : ''}>
                    {QUESTION_TYPE_LABELS[r.type] ?? r.type}
                    {isWeak && ' — weakest'}
                  </span>
                  <span className="muted whitespace-nowrap">
                    {r.correct}/{r.total} · {r.pct}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" role="meter" aria-valuenow={r.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${QUESTION_TYPE_LABELS[r.type] ?? r.type} accuracy`}>
                  <div className={`h-full rounded-full ${isWeak ? 'bg-rose-500' : 'bg-brand-500'}`} style={{ width: `${r.pct}%` }} />
                </div>
                {isWeak && (
                  <Link to={guide ? `/guides/${guide.id}` : '/guides'} className="mt-1 inline-block text-xs text-brand-600 underline dark:text-brand-400">
                    📘 {guide ? `Read: ${guide.title}` : 'Browse strategy guides'}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------------- Activity heat-strip ---------------- */

function HeatStrip({ activeDays }: { activeDays: string[] }) {
  const set = new Set(activeDays);
  const now = new Date();
  const todayStr = today(now);
  const mondayOffset = (now.getDay() + 6) % 7;
  const start = new Date(now);
  start.setDate(now.getDate() - mondayOffset - 7 * 7);
  const weeks = Array.from({ length: 8 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const x = new Date(start);
      x.setDate(start.getDate() + w * 7 + d);
      return today(x);
    }),
  );
  const count = weeks.flat().filter((d) => set.has(d)).length;
  return (
    <div>
      <div className="flex gap-1" role="img" aria-label={`${count} active days in the last 8 weeks`}>
        <div className="muted mr-1 flex flex-col justify-between py-0.5 text-[10px]" aria-hidden>
          <span>Mon</span>
          <span>Sun</span>
        </div>
        {weeks.map((wk, i) => (
          <div key={i} className="flex flex-col gap-1">
            {wk.map((d) => (
              <span
                key={d}
                title={d}
                data-active={set.has(d) || undefined}
                className={`block h-4 w-4 rounded-sm ${d > todayStr ? 'bg-transparent' : set.has(d) ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'} ${d === todayStr ? 'ring-2 ring-brand-400' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="muted mt-2 text-xs">{count} active days in the last 8 weeks</p>
    </div>
  );
}

/* ---------------- Error log ---------------- */

const ERROR_SKILLS: ErrorLogEntry['skill'][] = ['listening', 'reading', 'writing', 'speaking', 'grammar', 'vocabulary'];

function ErrorLog({ entries }: { entries: ErrorLogEntry[] }) {
  const [skill, setSkill] = useState<ErrorLogEntry['skill']>('writing');
  const [note, setNote] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    addError({ skill, source: 'Manual note', note: note.trim() });
    setNote('');
  };
  return (
    <section id="errors" className="mb-8 scroll-mt-20">
      <h2 className="h2 mb-1">Error log</h2>
      <p className="muted mb-3 text-sm">Write down mistakes you keep making and review them before each practice. Mẹo: xem lại sổ lỗi trước mỗi buổi luyện đề.</p>
      <form onSubmit={submit} className="card mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <div>
          <label className="label" htmlFor="err-skill">
            Skill
          </label>
          <select id="err-skill" className="input" value={skill} onChange={(e) => setSkill(e.target.value as ErrorLogEntry['skill'])}>
            {ERROR_SKILLS.map((s) => (
              <option key={s} value={s}>
                {s[0].toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="label" htmlFor="err-note">
            Note
          </label>
          <input id="err-note" className="input" placeholder="e.g. I keep writing 'informations' — it is uncountable" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button type="submit" className="btn-primary" disabled={!note.trim()}>
          Add note
        </button>
      </form>
      {!entries.length ? (
        <Empty title="Your error log is empty">Wrong answers you save from grammar lessons and practice tests will appear here.</Empty>
      ) : (
        <ul className="space-y-2">
          {entries.map((e) => (
            <li key={e.id} className="card flex items-start gap-3 p-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="chip bg-slate-100 capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">{e.skill}</span>
                  <span className="muted">{e.source}</span>
                  <span className="muted">· {fmtDate(e.date)}</span>
                </div>
                <p className="mt-1 text-sm">{e.note}</p>
              </div>
              <button className="btn-ghost px-2 py-1 text-xs" onClick={() => removeError(e.id)} aria-label={`Delete error note: ${e.note.slice(0, 40)}`}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------------- Page ---------------- */

export default function Progress() {
  const state = useStore((s) => s);
  const location = useLocation();
  const [showAll, setShowAll] = useState(false);
  const est = useMemo(() => estimateAll(state), [state]);
  const history = useMemo(() => bandHistory(state), [state]);
  const target = state.profile?.targetBand;
  const attempts = useMemo(() => [...state.attempts].sort((a, b) => b.date.localeCompare(a.date)), [state.attempts]);
  const writing = useMemo(() => [...state.writing].sort((a, b) => b.date.localeCompare(a.date)), [state.writing]);
  const speaking = useMemo(() => [...state.speaking].sort((a, b) => b.date.localeCompare(a.date)), [state.speaking]);
  const shown = showAll ? attempts : attempts.slice(0, 20);

  useEffect(() => {
    if (location.hash === '#errors') document.getElementById('errors')?.scrollIntoView?.({ behavior: 'smooth' });
  }, [location.hash]);

  return (
    <div>
      <PageHeader title="Your progress" subtitle="Band estimates use your five most recent results per skill (mock tests count double)." />

      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="card p-4">
            <div className="muted text-xs font-medium uppercase tracking-wide">Overall</div>
            <div className="mt-2">
              <BandBadge band={est.overall} size="lg" />
            </div>
          </div>
          {SKILLS.map((k) => (
            <div key={k} className="card p-4">
              <div className="muted text-xs font-medium uppercase tracking-wide">
                {SKILL_META[k].icon} {SKILL_META[k].label}
              </div>
              <div className="mt-2">
                <BandBadge band={est[k].band} />
              </div>
              <div className="muted mt-1 text-xs">{est[k].confidence === 'self-reported' ? 'from diagnostic' : `${est[k].samples} result${est[k].samples === 1 ? '' : 's'} · ${est[k].confidence} confidence`}</div>
            </div>
          ))}
          <div className="card p-4">
            <div className="muted text-xs font-medium uppercase tracking-wide">Target</div>
            {target != null ? (
              <>
                <div className="mt-2">
                  <BandBadge band={target} />
                </div>
                <div className="muted mt-1 text-xs">{est.overall >= target ? '🎯 On target' : `${(target - est.overall).toFixed(1)} to go`}</div>
              </>
            ) : (
              <Link to="/start" className="mt-2 inline-block text-sm text-brand-600 underline dark:text-brand-400">
                Set a target
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="card mb-8 p-5">
        <h2 className="h2 mb-3">Band history</h2>
        <BandChart history={history} target={target} />
      </section>

      <section className="mb-8">
        <h2 className="h2 mb-3">Accuracy by question type</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TypeAccuracy state={state} kind="reading" />
          <TypeAccuracy state={state} kind="listening" />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="h2 mb-3">Activity</h2>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Current streak" value={`${streak(state.activeDays)} 🔥`} hint="days in a row" />
          <Stat label="Study days" value={state.activeDays.length} />
          <Stat label="Attempts" value={state.attempts.length} />
          <Stat label="Guides read" value={state.readGuides.length} />
        </div>
        <div className="card mb-4 p-4">
          <HeatStrip activeDays={state.activeDays} />
        </div>
        {!attempts.length ? (
          <Empty title="No attempts yet">Your practice results will be listed here.</Empty>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">All attempts, latest first</caption>
              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Kind</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Band</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                    <td className="whitespace-nowrap p-3">{fmtDate(a.date)}</td>
                    <td className="p-3 capitalize">{a.kind}</td>
                    <td className="p-3">{a.title}</td>
                    <td className="whitespace-nowrap p-3">{a.score != null && a.total != null ? `${a.score}/${a.total}` : '–'}</td>
                    <td className="p-3">{a.band != null ? <BandBadge band={a.band} size="sm" /> : <span className="muted">–</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {attempts.length > shown.length && (
              <div className="p-3 text-center">
                <button className="btn-ghost" onClick={() => setShowAll(true)}>
                  Show all {attempts.length} attempts
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h2 className="h2 mb-3">✍️ Writing history</h2>
          {!writing.length ? (
            <p className="muted text-sm">
              No essays yet.{' '}
              <Link to="/writing" className="text-brand-600 underline dark:text-brand-400">
                Write one
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {writing.map((w) => {
                const task = findWriting(w.taskId);
                return (
                  <li key={w.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                    <div className="min-w-0">
                      <Link to={`/writing/${w.taskId}`} className="font-medium text-slate-900 hover:underline dark:text-white">
                        {task ? `Task ${task.task}: ${task.topic}` : w.taskId}
                      </Link>
                      <div className="muted text-xs">
                        {fmtDate(w.date)} · {w.wordCount} words · {w.minutes} min{w.source ? ` · ${w.source}` : ''}
                      </div>
                    </div>
                    <BandBadge band={w.band ?? null} size="sm" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="card p-5">
          <h2 className="h2 mb-3">🗣️ Speaking history</h2>
          {!speaking.length ? (
            <p className="muted text-sm">
              No recordings yet.{' '}
              <Link to="/speaking" className="text-brand-600 underline dark:text-brand-400">
                Practise speaking
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {speaking.map((sp) => {
                const title = findCueCard(sp.itemId)?.topic ?? speakingPart1.find((p) => p.id === sp.itemId)?.topic ?? sp.itemId;
                return (
                  <li key={sp.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 dark:text-white">
                        Part {sp.part}: {title}
                      </div>
                      <div className="muted text-xs">
                        {fmtDate(sp.date)} · {Math.round(sp.seconds)}s{sp.source ? ` · ${sp.source}` : ''}
                      </div>
                    </div>
                    <BandBadge band={sp.band ?? null} size="sm" />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <ErrorLog entries={state.errorLog} />
    </div>
  );
}
