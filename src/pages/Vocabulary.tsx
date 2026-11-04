import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { allWords, vocabTopics } from '../content';
import { Empty, PageHeader, ProgressBar, Stat, Tabs } from '../components/ui';
import { getState, setSrsCard, today, useStore, type SrsCard } from '../lib/store';
import { isMature, newCard, review, type SrsGrade } from '../lib/srs';
import { speak } from '../lib/speech';

type Mode = 'study' | 'browse' | 'quiz';

const wordByKey = new Map(allWords.map((w) => [w.key, w]));

/* ---------------- page-local preferences (UI only, not learner data) ---------------- */

const PREFS_KEY = 'ielts-master:vocab-prefs';
interface Prefs {
  newPerDay: number;
  introducedDate: string;
  introducedCount: number;
}
function loadPrefs(): Prefs {
  const base: Prefs = { newPerDay: 15, introducedDate: '', introducedCount: 0 };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? { ...base, ...(JSON.parse(raw) as Partial<Prefs>) } : base;
  } catch {
    return base;
  }
}
function savePrefs(p: Prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}
function introducedToday(p: Prefs, t: string) {
  return p.introducedDate === t ? p.introducedCount : 0;
}

/* ---------------- helpers ---------------- */

export function fmtInterval(days: number) {
  if (days < 1) return '<1d';
  if (days < 30) return `${days}d`;
  if (days < 365) return `${(days / 30).toFixed(1).replace(/\.0$/, '')}mo`;
  return `${(days / 365).toFixed(1).replace(/\.0$/, '')}y`;
}

/** Due cards first (oldest due first), then up to `newLimit` words that have never been studied. */
export function buildQueue(srs: Record<string, SrsCard>, todayStr: string, newLimit: number, topicId = ''): string[] {
  const pool = topicId ? allWords.filter((w) => w.topicId === topicId) : allWords;
  const due = pool
    .filter((w) => srs[w.key] && srs[w.key].due <= todayStr)
    .sort((a, b) => srs[a.key].due.localeCompare(srs[b.key].due))
    .map((w) => w.key);
  const fresh = pool
    .filter((w) => !srs[w.key])
    .slice(0, Math.max(0, newLimit))
    .map((w) => w.key);
  return [...due, ...fresh];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GRADES: { g: SrsGrade; label: string; cls: string }[] = [
  { g: 0, label: 'Again', cls: 'bg-rose-600 hover:bg-rose-700 text-white' },
  { g: 1, label: 'Hard', cls: 'bg-amber-500 hover:bg-amber-600 text-white' },
  { g: 2, label: 'Good', cls: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
  { g: 3, label: 'Easy', cls: 'bg-sky-600 hover:bg-sky-700 text-white' },
];

function LevelChip({ level }: { level: number }) {
  const c =
    level >= 8
      ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
      : level >= 7
        ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
  return <span className={`chip ${c}`}>Band {level}+</span>;
}

function SpeakButton({ text, className = 'btn-ghost' }: { text: string; className?: string }) {
  const rate = useStore((s) => s.settings.speechRate);
  return (
    <button type="button" className={className} onClick={() => speak(text, rate)} aria-label={`Pronounce ${text}`} title="Listen">
      🔊
    </button>
  );
}

function TopicSelect({ id, value, onChange, allLabel = 'All topics' }: { id: string; value: string; onChange: (v: string) => void; allLabel?: string }) {
  return (
    <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{allLabel}</option>
      {vocabTopics.map((t) => (
        <option key={t.id} value={t.id}>
          {t.topic}
        </option>
      ))}
    </select>
  );
}

/* ---------------- Study (flashcards) ---------------- */

function Study() {
  const srs = useStore((s) => s.srs);
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);
  const [topic, setTopic] = useState('');
  const [queue, setQueue] = useState<string[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [tally, setTally] = useState({ reviewed: 0, again: 0 });
  const t = today();
  const remainingNew = Math.max(0, prefs.newPerDay - introducedToday(prefs, t));
  const preview = useMemo(() => buildQueue(srs, t, remainingNew, topic), [srs, t, remainingNew, topic]);
  const previewDue = preview.filter((k) => srs[k]).length;

  const updatePrefs = (p: Partial<Prefs>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...p };
      savePrefs(next);
      return next;
    });
  };

  const start = () => {
    setQueue(preview);
    setIdx(0);
    setRevealed(false);
    setTally({ reviewed: 0, again: 0 });
  };

  const key = queue?.[idx];
  const word = key ? wordByKey.get(key) : undefined;
  const card = key ? srs[key] : undefined;
  const base = card ?? newCard(t);

  const grade = (g: SrsGrade) => {
    if (!key || !queue) return;
    const existing = getState().srs[key];
    setSrsCard(key, review(existing ?? newCard(t), g, t));
    if (!existing) {
      const cur = loadPrefs();
      updatePrefs({ introducedDate: t, introducedCount: introducedToday(cur, t) + 1 });
    }
    setTally((x) => ({ reviewed: x.reviewed + 1, again: x.again + (g === 0 ? 1 : 0) }));
    if (g === 0) setQueue([...queue, key]); // see it again before the session ends
    setIdx((i) => i + 1);
    setRevealed(false);
  };

  // keyboard shortcuts: space = reveal, 1–4 = grade
  const handler = useRef<(e: KeyboardEvent) => void>(() => undefined);
  handler.current = (e: KeyboardEvent) => {
    if (!word) return;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      if (!revealed) setRevealed(true);
    } else if (revealed && ['1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      grade((Number(e.key) - 1) as SrsGrade);
    }
  };
  useEffect(() => {
    const h = (e: KeyboardEvent) => handler.current(e);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  if (!queue) {
    return (
      <div className="card p-5">
        <h2 className="h2">Study session</h2>
        <p className="muted mt-1 text-sm">Reviews that are due come first, then new words. Spaced repetition shows each word again just before you would forget it.</p>
        <p className="muted mt-1 text-sm">Mẹo: học khoảng 15 từ mới mỗi ngày và ôn hết các thẻ đến hạn — đều đặn quan trọng hơn số lượng.</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="label" htmlFor="study-topic">
              Topic (optional)
            </label>
            <TopicSelect id="study-topic" value={topic} onChange={setTopic} />
          </div>
          <div>
            <label className="label" htmlFor="new-per-day">
              New words per day
            </label>
            <input
              id="new-per-day"
              type="number"
              min={0}
              max={100}
              className="input w-28"
              value={prefs.newPerDay}
              onChange={(e) => updatePrefs({ newPerDay: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })}
            />
          </div>
          <button className="btn-primary" onClick={start} disabled={!preview.length}>
            Start session ({preview.length} cards)
          </button>
        </div>
        <p className="muted mt-3 text-xs">
          {previewDue} due review{previewDue === 1 ? '' : 's'} + {preview.length - previewDue} new word{preview.length - previewDue === 1 ? '' : 's'} ({remainingNew} new left today).
        </p>
        {!preview.length && <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">🎉 Nothing due right now. Come back tomorrow, raise the new-word limit, or try a quiz.</p>}
      </div>
    );
  }

  if (!word) {
    return (
      <div className="card p-6 text-center">
        <h2 className="h2">Session complete</h2>
        <p className="muted mt-2">
          You reviewed {tally.reviewed} card{tally.reviewed === 1 ? '' : 's'}
          {tally.again ? `, ${tally.again} marked “Again”` : ''}.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <button className="btn-secondary" onClick={() => setQueue(null)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <ProgressBar value={idx} max={queue.length} />
        <span className="muted whitespace-nowrap text-xs">
          {idx + 1} / {queue.length}
        </span>
        <button className="btn-ghost text-xs" onClick={() => setQueue(null)}>
          End
        </button>
      </div>
      <div className="card p-6" data-testid="flashcard">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{word.topic}</span>
          {!card && <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">New</span>}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-white" data-testid="card-word">
            {word.word}
          </span>
          <span className="muted italic">{word.pos}</span>
          <LevelChip level={word.level} />
          <SpeakButton text={word.word} />
        </div>
        {!revealed ? (
          <div className="mt-6 text-center">
            <button className="btn-primary" onClick={() => setRevealed(true)}>
              Show answer
            </button>
            <p className="muted mt-2 text-xs">Shortcut: Space</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="text-lg">{word.meaning}</p>
            <p className="text-brand-700 dark:text-brand-300">🇻🇳 {word.vi}</p>
            <p className="italic">
              “{word.example}” <SpeakButton text={word.example} className="btn-ghost px-2 py-1" />
            </p>
            {word.collocations.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {word.collocations.map((c) => (
                  <span key={c} className="chip bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
              {GRADES.map(({ g, label, cls }) => {
                const next = fmtInterval(review(base, g, t).interval);
                return (
                  <button key={g} className={`btn flex-col gap-0 ${cls}`} onClick={() => grade(g)} aria-label={`${label}, next review in ${next}`}>
                    <span>
                      {label} <span className="text-xs opacity-80">({g + 1})</span>
                    </span>
                    <span className="text-xs opacity-90">{next}</span>
                  </button>
                );
              })}
            </div>
            <p className="muted text-center text-xs">Shortcuts: 1 Again · 2 Hard · 3 Good · 4 Easy</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Browse ---------------- */

function Browse() {
  const srs = useStore((s) => s.srs);
  const [topic, setTopic] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [level, setLevel] = useState<0 | 6 | 7 | 8>(0);
  const [showVi, setShowVi] = useState(true);
  const t = today();

  if (topic === null) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {vocabTopics.map((tp) => {
          const keys = allWords.filter((w) => w.topicId === tp.id).map((w) => w.key);
          const started = keys.filter((k) => srs[k]).length;
          return (
            <button key={tp.id} className="card p-4 text-left transition hover:border-brand-400" onClick={() => setTopic(tp.id)}>
              <div className="font-semibold text-slate-900 dark:text-white">{tp.topic}</div>
              <div className="muted mt-1 text-xs">
                {keys.length} words · {started} in study
              </div>
              <ProgressBar value={started} max={keys.length} className="mt-2" />
            </button>
          );
        })}
      </div>
    );
  }

  const tp = vocabTopics.find((x) => x.id === topic);
  const needle = q.trim().toLowerCase();
  const words = allWords.filter(
    (w) =>
      w.topicId === topic &&
      (level === 0 || w.level === level) &&
      (!needle || w.word.toLowerCase().includes(needle) || w.meaning.toLowerCase().includes(needle) || w.vi.toLowerCase().includes(needle)),
  );

  return (
    <div>
      <button className="btn-ghost mb-3" onClick={() => setTopic(null)}>
        ← All topics
      </button>
      <h2 className="h2 mb-3">{tp?.topic ?? 'Topic'}</h2>
      <div className="card mb-4 flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-48 flex-1">
          <label className="label" htmlFor="vocab-search">
            Search
          </label>
          <input id="vocab-search" className="input" placeholder="word, meaning or nghĩa…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="vocab-level">
            Level
          </label>
          <select id="vocab-level" className="input" value={level} onChange={(e) => setLevel(Number(e.target.value) as typeof level)}>
            <option value={0}>All levels</option>
            <option value={6}>Band 6</option>
            <option value={7}>Band 7</option>
            <option value={8}>Band 8</option>
          </select>
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input type="checkbox" checked={showVi} onChange={(e) => setShowVi(e.target.checked)} aria-label="Show Vietnamese" />
          Tiếng Việt
        </label>
      </div>
      {!words.length ? (
        <Empty title="No words match">Try another search or level.</Empty>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <tr>
                <th className="p-3">Word</th>
                <th className="p-3">Meaning</th>
                {showVi && <th className="p-3">Tiếng Việt</th>}
                <th className="p-3">Level</th>
                <th className="p-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {words.map((w) => {
                const c = srs[w.key];
                return (
                  <tr key={w.key} className="border-b border-slate-100 align-top last:border-0 dark:border-slate-800/60">
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-900 dark:text-white">{w.word}</span>
                        <span className="muted text-xs italic">{w.pos}</span>
                        <SpeakButton text={w.word} className="btn-ghost px-2 py-1" />
                      </div>
                    </td>
                    <td className="p-3">
                      <div>{w.meaning}</div>
                      <div className="muted mt-1 text-xs italic">{w.example}</div>
                    </td>
                    {showVi && <td className="p-3">{w.vi}</td>}
                    <td className="p-3">
                      <LevelChip level={w.level} />
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {c ? (
                        <span className="muted text-xs">{isMature(c) ? '✓ Learned' : c.due <= t ? 'Due today' : `Next: ${c.due}`}</span>
                      ) : (
                        <button className="btn-secondary px-3 py-1 text-xs" onClick={() => setSrsCard(w.key, newCard(t))} aria-label={`Add ${w.word} to study`}>
                          + Add to study
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------- Quiz ---------------- */

interface QuizQ {
  key: string;
  options: string[];
  correct: number;
}

export function makeQuiz(topicId: string, n = 10): QuizQ[] {
  const pool = topicId ? allWords.filter((w) => w.topicId === topicId) : allWords;
  return shuffle(pool)
    .slice(0, n)
    .map((w) => {
      const others = (sameTopic: boolean) => allWords.filter((x) => (x.topicId === w.topicId) === sameTopic && x.key !== w.key && x.meaning !== w.meaning);
      let distract = shuffle(others(true));
      if (distract.length < 3) distract = [...distract, ...shuffle(others(false))];
      const meanings = [...new Set(distract.map((x) => x.meaning))].slice(0, 3);
      const opts = shuffle([w.meaning, ...meanings]);
      return { key: w.key, options: opts, correct: opts.indexOf(w.meaning) };
    });
}

function Quiz() {
  const [topic, setTopic] = useState('');
  const [qs, setQs] = useState<QuizQ[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const t = today();

  const start = () => {
    setQs(makeQuiz(topic));
    setIdx(0);
    setPicked(null);
    setScore(0);
  };

  if (!qs) {
    return (
      <div className="card p-5">
        <h2 className="h2">Quick quiz</h2>
        <p className="muted mt-1 text-sm">10 multiple-choice questions: choose the correct meaning. Results count toward your spaced-repetition schedule (correct = Good, wrong = Again).</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="label" htmlFor="quiz-topic">
              Topic
            </label>
            <TopicSelect id="quiz-topic" value={topic} onChange={setTopic} allLabel="Mixed topics" />
          </div>
          <button className="btn-primary" onClick={start}>
            Start quiz
          </button>
        </div>
      </div>
    );
  }

  const cur = qs[idx];
  const w = cur ? wordByKey.get(cur.key) : undefined;
  if (!cur || !w) {
    return (
      <div className="card p-6 text-center">
        <h2 className="h2">Quiz finished</h2>
        <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {score} / {qs.length}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <button className="btn-primary" onClick={start}>
            New quiz
          </button>
          <button className="btn-secondary" onClick={() => setQs(null)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === cur.correct;
    if (ok) setScore((s) => s + 1);
    setSrsCard(cur.key, review(getState().srs[cur.key] ?? newCard(t), ok ? 2 : 0, t));
  };

  return (
    <div className="card p-6" data-testid="quiz">
      <div className="muted mb-2 text-xs">
        Question {idx + 1} / {qs.length} · Score {score}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-2xl font-bold text-slate-900 dark:text-white" data-testid="quiz-word">
          {w.word}
        </span>
        <span className="muted italic">{w.pos}</span>
        <SpeakButton text={w.word} />
      </div>
      <p className="muted mt-1 text-sm">What does it mean?</p>
      <div className="mt-4 grid gap-2">
        {cur.options.map((o, i) => {
          const state =
            picked === null ? '' : i === cur.correct ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : i === picked ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30' : 'opacity-60';
          return (
            <button
              key={i}
              className={`rounded-xl border border-slate-300 p-3 text-left text-sm transition hover:border-brand-400 dark:border-slate-700 ${state}`}
              onClick={() => choose(i)}
              disabled={picked !== null}
            >
              <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-4" aria-live="polite">
          <p className={picked === cur.correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
            {picked === cur.correct ? '✓ Correct!' : '✗ Not quite.'} <span className="text-slate-700 dark:text-slate-300">({w.vi})</span>
          </p>
          <p className="muted mt-1 text-sm italic">“{w.example}”</p>
          <button
            className="btn-primary mt-3"
            onClick={() => {
              setIdx(idx + 1);
              setPicked(null);
            }}
          >
            {idx + 1 < qs.length ? 'Next →' : 'See result'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function Vocabulary() {
  const srs = useStore((s) => s.srs);
  const [mode, setMode] = useState<Mode>('study');
  const t = today();
  const stats = useMemo(() => {
    let due = 0;
    let started = 0;
    let mature = 0;
    for (const w of allWords) {
      const c = srs[w.key];
      if (!c) continue;
      started++;
      if (c.due <= t) due++;
      if (isMature(c)) mature++;
    }
    return { due, started, mature };
  }, [srs, t]);

  if (!allWords.length) {
    return (
      <div>
        <PageHeader title="Vocabulary" />
        <Empty title="No vocabulary yet">
          Word lists are on their way.{' '}
          <Link to="/" className="text-brand-600 underline">
            Back to today
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Vocabulary"
        subtitle={`${allWords.length} topic words for IELTS Writing and Speaking, with spaced repetition so they stick. Từ vựng theo chủ đề, ôn tập ngắt quãng.`}
      />
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Due today" value={stats.due} />
        <Stat label="Started" value={stats.started} />
        <Stat label="Learned" value={stats.mature} hint="interval ≥ 21 days" />
        <Stat label="Total words" value={allWords.length} />
      </div>
      <Tabs
        tabs={[
          { id: 'study', label: '🃏 Study' },
          { id: 'browse', label: '📚 Browse' },
          { id: 'quiz', label: '❓ Quiz' },
        ]}
        value={mode}
        onChange={setMode}
      />
      {mode === 'study' && <Study />}
      {mode === 'browse' && <Browse />}
      {mode === 'quiz' && <Quiz />}
    </div>
  );
}
