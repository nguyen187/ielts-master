import type { QuestionGroup } from '../content/types';
import { isCorrect, wordLimit, countWords, type GradeResult } from '../lib/scoring';

const letters = (n: number) => Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i));

interface Props {
  groups: QuestionGroup[];
  answers: Record<string, string>;
  onChange: (id: string, value: string) => void;
  /** When set, the view is in review mode */
  result?: GradeResult | null;
  /** Offset applied to displayed numbers (full tests) */
  numberOffset?: number;
}

function Feedback({ ok, answer, explanation }: { ok: boolean; answer: string; explanation: string }) {
  return (
    <div className={`mt-2 rounded-lg border p-3 text-sm ${ok ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40' : 'border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40'}`}>
      <div className="font-semibold">{ok ? '✓ Correct' : `✗ Answer: ${answer}`}</div>
      <div className="mt-1 text-slate-700 dark:text-slate-300">{explanation}</div>
    </div>
  );
}

export function QuestionGroups({ groups, answers, onChange, result, numberOffset = 0 }: Props) {
  const review = !!result;
  return (
    <div className="space-y-6">
      {groups.map((g) => {
        const first = g.questions[0]?.number ?? 1;
        const last = g.questions.at(-1)?.number ?? first;
        const limit = g.type === 'gap' ? wordLimit(g.instructions) : null;
        return (
          <section key={g.id} className="card p-5" aria-labelledby={`${g.id}-h`}>
            <h3 id={`${g.id}-h`} className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Questions {first + numberOffset}
              {last !== first ? `–${last + numberOffset}` : ''}
            </h3>
            <p className="mt-1 text-sm italic text-slate-700 dark:text-slate-300">{g.instructions}</p>
            {g.title && <div className="mt-3 font-semibold text-slate-900 dark:text-white">{g.title}</div>}
            {g.type === 'matching' && g.options && (
              <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
                {g.options.map((o) => (
                  <div key={o.key} className="flex gap-2 py-0.5">
                    <span className="w-8 shrink-0 font-bold">{o.key}</span>
                    <span>{o.text}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 space-y-4">
              {g.questions.map((q) => {
                const given = answers[q.id] ?? '';
                const ok = review && isCorrect(g.type, q, given);
                const num = q.number + numberOffset;
                const label = `Question ${num}`;
                const border = review ? (ok ? 'border-l-emerald-500' : 'border-l-rose-500') : 'border-l-transparent';
                return (
                  <div key={q.id} className={`border-l-4 pl-3 ${border}`} data-testid={`q-${q.id}`}>
                    {g.type === 'gap' ? (
                      <div className="leading-8">
                        <span className="mr-2 font-bold">{num}</span>
                        {q.prompt.split('____').map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <input
                                aria-label={label}
                                className="input mx-1 inline-block w-44 py-1 align-baseline"
                                value={given}
                                disabled={review}
                                autoComplete="off"
                                spellCheck={false}
                                onChange={(e) => onChange(q.id, e.target.value)}
                              />
                            )}
                          </span>
                        ))}
                        {!q.prompt.includes('____') && (
                          <input aria-label={label} className="input mt-1 w-full sm:w-72" value={given} disabled={review} autoComplete="off" spellCheck={false} onChange={(e) => onChange(q.id, e.target.value)} />
                        )}
                        {limit && !review && countWords(given) > limit && <div className="text-xs font-medium text-rose-600">Too many words — limit is {limit}.</div>}
                      </div>
                    ) : (
                      <div>
                        <div className="mb-2">
                          <span className="mr-2 font-bold">{num}</span>
                          {q.prompt}
                        </div>
                        {g.type === 'mcq' && (
                          <div className="space-y-1.5" role="radiogroup" aria-label={label}>
                            {(q.options ?? []).map((opt, i) => {
                              const L = letters(26)[i];
                              const isKey = review && q.answer.map((a) => a.toUpperCase()).includes(L);
                              return (
                                <label key={L} className={`flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 ${isKey ? 'bg-emerald-50 font-medium dark:bg-emerald-950/40' : ''}`}>
                                  <input type="radio" name={q.id} className="mt-1" checked={given === L} disabled={review} onChange={() => onChange(q.id, L)} />
                                  <span className="font-bold">{L}</span>
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                        {(g.type === 'tfng' || g.type === 'ynng') && (
                          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
                            {(g.type === 'tfng' ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['YES', 'NO', 'NOT GIVEN']).map((o) => (
                              <button
                                type="button"
                                key={o}
                                role="radio"
                                aria-checked={given === o}
                                disabled={review}
                                onClick={() => onChange(q.id, o)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${given === o ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white hover:border-brand-400 dark:border-slate-700 dark:bg-slate-800'}`}
                              >
                                {o}
                              </button>
                            ))}
                          </div>
                        )}
                        {g.type === 'matching' && (
                          <select aria-label={label} className="input w-full sm:w-64" value={given} disabled={review} onChange={(e) => onChange(q.id, e.target.value)}>
                            <option value="">— choose —</option>
                            {(g.options ?? []).map((o) => (
                              <option key={o.key} value={o.key}>
                                {o.key} {o.text.length > 60 ? o.text.slice(0, 57) + '…' : o.text}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                    {review && <Feedback ok={ok} answer={q.answer.join(' / ')} explanation={q.explanation} />}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ResultSummary({ result, band, onRetry, extra }: { result: GradeResult; band: number; onRetry?: () => void; extra?: React.ReactNode }) {
  const types = Object.entries(result.byType);
  const labels: Record<string, string> = { mcq: 'Multiple choice', tfng: 'True/False/Not Given', ynng: 'Yes/No/Not Given', gap: 'Completion', matching: 'Matching' };
  return (
    <div className="card p-5" role="status">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <div className="muted text-xs uppercase">Score</div>
          <div className="text-3xl font-bold">
            {result.correct}/{result.total}
          </div>
        </div>
        <div>
          <div className="muted text-xs uppercase">Estimated band</div>
          <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{band.toFixed(1)}</div>
        </div>
        <div className="flex-1" />
        {onRetry && (
          <button className="btn-secondary" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
      {types.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {types.map(([t, v]) => (
            <div key={t} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/60">
              <span>{labels[t] ?? t}</span>
              <span className={`font-semibold ${v!.correct / v!.total >= 0.75 ? 'text-emerald-600' : v!.correct / v!.total >= 0.5 ? 'text-amber-600' : 'text-rose-600'}`}>
                {v!.correct}/{v!.total}
              </span>
            </div>
          ))}
        </div>
      )}
      {result.total < 40 && <p className="muted mt-3 text-xs">Band estimated by scaling your score to the 40-question test. A full test gives a more reliable band.</p>}
      {extra}
    </div>
  );
}
