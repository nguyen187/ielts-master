import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BandBadge, PageHeader, Tabs } from '../components/ui';
import { criteriaBand } from '../lib/scoring';
import { BAND_OPTIONS, bandText, criterionName, descriptorFor, descriptorsFor, type DescriptorSkill } from '../content/descriptors';

/* ------------------------------------------------------------------ */
/* Shared self-assessment UI (used by Writing and Speaking pages)      */
/* ------------------------------------------------------------------ */

export function CriteriaAssess<K extends string>({
  skill,
  task,
  value,
  onChange,
}: {
  skill: DescriptorSkill;
  task?: 1 | 2;
  value: Record<K, number>;
  onChange: (next: Record<K, number>) => void;
}) {
  const criteria = descriptorsFor(skill);
  const keys = criteria.map((c) => c.key as K);
  const overall = criteriaBand(keys.map((k) => value[k]));
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {criteria.map((c) => {
          const k = c.key as K;
          const d = descriptorFor(skill, c.key, value[k], task);
          const id = `assess-${skill}-${c.key}`;
          return (
            <div key={c.key} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <label htmlFor={id} className="label">
                {c.code} · {criterionName(skill, c.key, task)}
              </label>
              <select id={id} className="input" aria-label={`${criterionName(skill, c.key, task)} band`} value={value[k]} onChange={(e) => onChange({ ...value, [k]: Number(e.target.value) })}>
                {BAND_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    Band {b.toFixed(1)}
                  </option>
                ))}
              </select>
              {d && (
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Band {d.lower.band}: </span>
                    {d.text}
                  </p>
                  {d.isHalf && d.upper && (
                    <p className="muted text-xs">
                      {value[k].toFixed(1)} = everything at band {d.lower.band} plus some features of band {d.upper.band}: {bandText(d.upper, task)}
                    </p>
                  )}
                  <p className="text-xs text-brand-700 dark:text-brand-300">
                    <span className="font-semibold">Move up: </span>
                    {d.moveUp}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="muted">Your overall from these criteria:</span>
        <BandBadge band={overall} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function DescriptorTable({ skill, task }: { skill: DescriptorSkill; task: 1 | 2 }) {
  return (
    <div className="space-y-6">
      {descriptorsFor(skill).map((c) => (
        <section key={c.key} className="card p-4 sm:p-5" aria-labelledby={`crit-${skill}-${c.key}`}>
          <h2 id={`crit-${skill}-${c.key}`} className="h2">
            <span className="chip mr-2 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">{c.code}</span>
            {criterionName(skill, c.key, task)}
          </h2>
          <p className="muted mt-1 text-sm">{c.focus}</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="text-left">
                  <th className="w-16 border-b border-slate-200 py-2 pr-2 dark:border-slate-700">Band</th>
                  <th className="border-b border-slate-200 py-2 pr-3 dark:border-slate-700">What it looks like</th>
                  <th className="w-1/3 border-b border-slate-200 py-2 pr-2 dark:border-slate-700">How to move up</th>
                </tr>
              </thead>
              <tbody>
                {c.bands.map((b) => (
                  <tr key={b.band} className="align-top">
                    <td className="border-b border-slate-100 py-3 pr-2 dark:border-slate-800">
                      <BandBadge band={b.band} size="sm" />
                    </td>
                    <td className="border-b border-slate-100 py-3 pr-3 dark:border-slate-800">
                      <p>{bandText(b, task)}</p>
                      {b.vi && (
                        <p className="mt-1 text-xs italic text-slate-500 dark:text-slate-400" lang="vi">
                          🇻🇳 {b.vi}
                        </p>
                      )}
                    </td>
                    <td className="border-b border-slate-100 py-3 pr-2 text-brand-700 dark:border-slate-800 dark:text-brand-300">{b.moveUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Descriptors() {
  const [tab, setTab] = useState<DescriptorSkill>('writing');
  const [task, setTask] = useState<1 | 2>(2);
  return (
    <div>
      <PageHeader
        title="Band descriptors"
        subtitle="What examiners look for at each band, explained in plain language. Use these when you rate your own essays and recordings."
      />
      <div className="card mb-4 p-4 text-sm">
        <p>
          Each skill is marked on four criteria that count equally. Your band for the skill is the average of the four, rounded down to the nearest half band. A half band (e.g. 6.5) means you meet everything at the lower band and some features of the band above.
        </p>
        <p className="muted mt-2 text-xs">
          These are our own simplified paraphrases for study purposes, not the official IELTS wording.{' '}
          <span lang="vi">Mẹo: đọc cột "How to move up" của band hiện tại — đó là việc cần làm tiếp theo.</span>
        </p>
      </div>
      <Tabs
        tabs={[
          { id: 'writing', label: '✍️ Writing' },
          { id: 'speaking', label: '🗣️ Speaking' },
        ]}
        value={tab}
        onChange={setTab}
      />
      {tab === 'writing' && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="muted">Show criterion 1 as:</span>
          <button className={task === 1 ? 'btn-primary' : 'btn-secondary'} aria-pressed={task === 1} onClick={() => setTask(1)}>
            Task 1 (Task Achievement)
          </button>
          <button className={task === 2 ? 'btn-primary' : 'btn-secondary'} aria-pressed={task === 2} onClick={() => setTask(2)}>
            Task 2 (Task Response)
          </button>
        </div>
      )}
      <DescriptorTable skill={tab} task={task} />
      <p className="muted mt-6 text-sm">
        Ready to apply them? <Link className="text-brand-600 hover:underline dark:text-brand-400" to="/writing">Practise writing</Link> or{' '}
        <Link className="text-brand-600 hover:underline dark:text-brand-400" to="/speaking">practise speaking</Link>.
      </p>
    </div>
  );
}
