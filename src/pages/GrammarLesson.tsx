import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findGrammar, grammarLessons } from '../content';
import { Empty, Markdown, PageHeader } from '../components/ui';
import { addAttempt, addError } from '../lib/store';
import { normalizeAnswer } from '../lib/scoring';

/** True if `given` matches any accepted variant (case, spacing, punctuation, leading article and hyphen/space differences ignored). */
export function matchesAnswer(given: string, accepted: string[]): boolean {
  if (!given.trim()) return false;
  const g = normalizeAnswer(given);
  const loose = (s: string) => s.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  return accepted.some((a) => {
    const k = normalizeAnswer(a);
    return k === g || (k !== '-' && g !== '-' && loose(k) === loose(g));
  });
}

const isZeroArticle = (answers: string[]) => answers.some((a) => a.trim() === '-');

export default function GrammarLesson() {
  const { id = '' } = useParams();
  return <LessonView key={id} id={id} />;
}

function LessonView({ id }: { id: string }) {
  const lesson = findGrammar(id);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [logged, setLogged] = useState<Set<number>>(new Set());

  if (!lesson) {
    return (
      <div>
        <PageHeader title="Lesson not found" back={{ to: '/grammar', label: 'All grammar lessons' }} />
        <Empty title="We couldn't find that lesson">
          <Link to="/grammar" className="text-brand-600 underline">
            Back to grammar lessons
          </Link>
        </Empty>
      </div>
    );
  }

  const results = lesson.exercises.map((ex, i) => matchesAnswer(answers[i] ?? '', ex.answer));
  const score = results.filter(Boolean).length;
  const total = lesson.exercises.length;
  const hasZero = lesson.exercises.some((ex) => isZeroArticle(ex.answer));
  const idx = grammarLessons.findIndex((l) => l.id === lesson.id);
  const next = grammarLessons[idx + 1];

  const checkAll = () => {
    setChecked(true);
    addAttempt({ kind: 'grammar', itemId: lesson.id, title: lesson.title, score, total });
  };

  const retry = () => {
    setAnswers({});
    setChecked(false);
    setLogged(new Set());
  };

  const logError = (i: number) => {
    const ex = lesson.exercises[i];
    const given = (answers[i] ?? '').trim() || '(blank)';
    addError({ skill: 'grammar', source: `Grammar: ${lesson.title}`, note: `${ex.prompt} — I wrote “${given}”; correct: “${ex.answer[0]}”. ${ex.explanation}` });
    setLogged((s) => new Set(s).add(i));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={lesson.title}
        back={{ to: '/grammar', label: 'All grammar lessons' }}
        actions={<span className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">Target band {lesson.targetBand}</span>}
      />

      <section className="card mb-5 p-5">
        <Markdown text={lesson.explanation} />
      </section>

      {lesson.examples.length > 0 && (
        <section className="card mb-5 p-5">
          <h2 className="h2 mb-3">Examples</h2>
          <ul className="space-y-2">
            {lesson.examples.map((e, i) => (
              <li key={i} className="border-l-4 border-brand-300 pl-3 italic dark:border-brand-700">
                {e}
              </li>
            ))}
          </ul>
        </section>
      )}

      {lesson.commonMistakes.length > 0 && (
        <section className="card mb-5 overflow-x-auto p-5">
          <h2 className="h2 mb-3">Common mistakes</h2>
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500 dark:text-slate-400">
              <tr>
                <th className="p-2">✗ Wrong</th>
                <th className="p-2">✓ Right</th>
                <th className="p-2">Why</th>
              </tr>
            </thead>
            <tbody>
              {lesson.commonMistakes.map((m, i) => (
                <tr key={i} className="border-t border-slate-100 align-top dark:border-slate-800">
                  <td className="p-2 text-rose-700 line-through decoration-rose-400/60 dark:text-rose-300">{m.wrong}</td>
                  <td className="p-2 text-emerald-700 dark:text-emerald-300">{m.right}</td>
                  <td className="muted p-2">{m.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="card mb-5 p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="h2">Exercises</h2>
          {checked && (
            <span className="text-lg font-bold text-slate-900 dark:text-white" data-testid="grammar-score">
              Score: {score} / {total}
            </span>
          )}
        </div>
        <p className="muted mb-3 text-sm">Type your answer in each box, then press “Check answers”. Capitals and full stops don't matter.</p>
        {hasZero && (
          <p className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            💡 If no article is needed (zero article), type <strong>-</strong> (a hyphen). Mẹo: nếu không cần mạo từ, hãy gõ dấu “-”.
          </p>
        )}
        <ol className="space-y-4">
          {lesson.exercises.map((ex, i) => {
            const ok = results[i];
            return (
              <li key={i} className={`rounded-xl border p-3 ${!checked ? 'border-slate-200 dark:border-slate-800' : ok ? 'border-emerald-400 bg-emerald-50/50 dark:border-emerald-700 dark:bg-emerald-900/20' : 'border-rose-400 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-900/20'}`}>
                <label htmlFor={`ex-${i}`} className="mb-2 block">
                  <span className="mr-1 font-semibold">{i + 1}.</span>
                  {ex.prompt}
                </label>
                <input
                  id={`ex-${i}`}
                  className="input"
                  aria-label={`Answer for exercise ${i + 1}`}
                  value={answers[i] ?? ''}
                  disabled={checked}
                  autoComplete="off"
                  spellCheck={false}
                  onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                />
                {checked && (
                  <div className="mt-2 text-sm">
                    <p className={ok ? 'font-medium text-emerald-700 dark:text-emerald-400' : 'font-medium text-rose-700 dark:text-rose-400'}>
                      {ok ? '✓ Correct' : `✗ Answer: ${ex.answer[0]}`}
                      {!ok && ex.answer.length > 1 && <span className="muted font-normal"> (also accepted: {ex.answer.slice(1, 4).join(', ')})</span>}
                    </p>
                    <p className="muted mt-1">{ex.explanation}</p>
                    {!ok && (
                      <button className="btn-ghost mt-1 px-2 py-1 text-xs" onClick={() => logError(i)} disabled={logged.has(i)}>
                        {logged.has(i) ? '✓ Added to error log' : '+ Add to error log'}
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-5 flex flex-wrap gap-2">
          {!checked ? (
            <button className="btn-primary" onClick={checkAll}>
              Check answers
            </button>
          ) : (
            <button className="btn-secondary" onClick={retry}>
              Try again
            </button>
          )}
          {checked && next && (
            <Link to={`/grammar/${next.id}`} className="btn-primary">
              Next lesson: {next.title} →
            </Link>
          )}
          {checked && score < total && (
            <Link to="/progress#errors" className="btn-ghost">
              View error log
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
