import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { readingPassages } from '../content';
import type { QuestionType } from '../content/types';
import { DifficultyChip, PageHeader, BandBadge, Empty } from '../components/ui';
import { useStore } from '../lib/store';
import { QUESTION_TYPE_LABELS } from '../lib/scoring';

export function bestAttempts(attempts: { kind: string; itemId: string; band?: number; score?: number; total?: number }[], kind: string) {
  const m = new Map<string, { band?: number; score?: number; total?: number; count: number }>();
  for (const a of attempts) {
    if (a.kind !== kind) continue;
    const cur = m.get(a.itemId);
    if (!cur || (a.band ?? 0) > (cur.band ?? 0)) m.set(a.itemId, { band: a.band, score: a.score, total: a.total, count: (cur?.count ?? 0) + 1 });
    else cur.count++;
  }
  return m;
}

export default function ReadingList() {
  const attempts = useStore((s) => s.attempts);
  const profileModule = useStore((s) => s.profile?.module);
  const [module, setModule] = useState<'all' | 'academic' | 'general'>(profileModule ?? 'all');
  const [type, setType] = useState<QuestionType | 'all'>('all');
  const [diff, setDiff] = useState<0 | 1 | 2 | 3>(0);
  const best = useMemo(() => bestAttempts(attempts, 'reading'), [attempts]);

  const list = readingPassages.filter(
    (p) => (module === 'all' || p.module === module) && (diff === 0 || p.difficulty === diff) && (type === 'all' || p.groups.some((g) => g.type === type)),
  );

  return (
    <div>
      <PageHeader
        title="Reading practice"
        subtitle="Each passage has 13 questions and a 20-minute timer — the same pace as the real test (3 passages in 60 minutes). Every answer comes with the evidence from the text."
        actions={
          <Link to="/guides/guide-reading-overview" className="btn-secondary">
            🧭 Reading strategy
          </Link>
        }
      />
      <div className="card mb-5 flex flex-wrap items-end gap-3 p-4">
        <div>
          <label className="label" htmlFor="f-mod">
            Module
          </label>
          <select id="f-mod" className="input" value={module} onChange={(e) => setModule(e.target.value as typeof module)}>
            <option value="all">All</option>
            <option value="academic">Academic</option>
            <option value="general">General Training</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="f-type">
            Question type
          </label>
          <select id="f-type" className="input" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option value="all">All types</option>
            {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((t) => (
              <option key={t} value={t}>
                {QUESTION_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="f-diff">
            Level
          </label>
          <select id="f-diff" className="input" value={diff} onChange={(e) => setDiff(Number(e.target.value) as typeof diff)}>
            <option value={0}>All levels</option>
            <option value={1}>Band 5–6</option>
            <option value={2}>Band 6–7</option>
            <option value={3}>Band 7–9</option>
          </select>
        </div>
        <Link to="/mock" className="btn-primary ml-auto">
          Full 60-minute test →
        </Link>
      </div>
      {list.length === 0 ? (
        <Empty title="No passages match these filters" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((p) => {
            const b = best.get(p.id);
            const types = [...new Set(p.groups.map((g) => g.type))];
            return (
              <Link key={p.id} to={`/reading/${p.id}`} className="card group p-5 transition hover:border-brand-300 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <DifficultyChip d={p.difficulty} />
                      <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{p.module === 'general' ? 'General Training' : 'Academic'}</span>
                      <span className="muted capitalize">{p.topic}</span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">{p.title}</h2>
                  </div>
                  {b && <BandBadge band={b.band} />}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {types.map((t) => (
                    <span key={t} className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                      {QUESTION_TYPE_LABELS[t]}
                    </span>
                  ))}
                </div>
                <div className="muted mt-3 text-xs">{b ? `Best ${b.score}/${b.total} · ${b.count} attempt${b.count > 1 ? 's' : ''}` : 'Not attempted yet'}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
