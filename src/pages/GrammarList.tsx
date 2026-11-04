import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { grammarLessons } from '../content';
import { Empty, PageHeader, ProgressBar } from '../components/ui';
import { useStore } from '../lib/store';

export default function GrammarList() {
  const attempts = useStore((s) => s.attempts);
  const best = useMemo(() => {
    const m = new Map<string, { score: number; total: number; count: number }>();
    for (const a of attempts) {
      if (a.kind !== 'grammar' || a.total == null) continue;
      const cur = m.get(a.itemId);
      const pct = (a.score ?? 0) / Math.max(1, a.total);
      if (!cur || pct > cur.score / Math.max(1, cur.total)) m.set(a.itemId, { score: a.score ?? 0, total: a.total, count: (cur?.count ?? 0) + 1 });
      else cur.count++;
    }
    return m;
  }, [attempts]);

  const done = grammarLessons.filter((l) => best.has(l.id)).length;

  return (
    <div>
      <PageHeader
        title="Grammar for IELTS"
        subtitle="Short lessons on the structures that move Grammatical Range and Accuracy from band 5.5 to 7+. Each lesson ends with exercises that are checked instantly."
      />
      {!grammarLessons.length ? (
        <Empty title="No lessons yet">
          Lessons are on their way.{' '}
          <Link to="/" className="text-brand-600 underline">
            Back to today
          </Link>
        </Empty>
      ) : (
        <>
          <div className="card mb-5 p-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">
                {done} / {grammarLessons.length} lessons completed
              </span>
              <span className="muted">Mẹo: làm theo thứ tự — bài đầu là lỗi người Việt hay mắc nhất.</span>
            </div>
            <ProgressBar value={done} max={grammarLessons.length} />
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {grammarLessons.map((l, i) => {
              const b = best.get(l.id);
              const pct = b ? Math.round((b.score / Math.max(1, b.total)) * 100) : null;
              return (
                <li key={l.id}>
                  <Link to={`/grammar/${l.id}`} className="card flex h-full items-start gap-3 p-4 transition hover:border-brand-400">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${b ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
                      aria-hidden
                    >
                      {b ? '✓' : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white">{l.title}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">Target band {l.targetBand}</span>
                        <span className="muted">{l.exercises.length} exercises</span>
                        {b ? (
                          <span className="chip bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                            Done · best {b.score}/{b.total} ({pct}%)
                          </span>
                        ) : (
                          <span className="muted">Not started</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
