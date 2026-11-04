import { useState } from 'react';
import { Link } from 'react-router-dom';
import { writingTasks } from '../content';
import type { WritingTask } from '../content/types';
import { BandBadge, Empty, PageHeader, Tabs } from '../components/ui';
import { writingBand } from '../lib/scoring';
import { useStore, type WritingSubmission } from '../lib/store';

type ListTab = 't1a' | 't1g' | 't2';

export const WRITING_TYPE_LABELS: Record<string, string> = {
  line: 'Line graph',
  bar: 'Bar chart',
  pie: 'Pie chart',
  table: 'Table',
  process: 'Process diagram',
  map: 'Maps',
  mixed: 'Mixed charts',
  'letter-formal': 'Formal letter',
  'letter-semi-formal': 'Semi-formal letter',
  'letter-informal': 'Informal letter',
  opinion: 'Opinion',
  discussion: 'Discussion',
  'problem-solution': 'Problem & solution',
  'advantages-disadvantages': 'Advantages & disadvantages',
  'two-part': 'Two-part question',
};

export const writingTypeLabel = (t: string) => WRITING_TYPE_LABELS[t] ?? t.replace(/-/g, ' ');

/** First meaningful sentence of the prompt (skips "You should spend about…" lines). */
export function promptExcerpt(prompt: string, max = 160): string {
  const parts = prompt
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(you should spend|write about the following)/i.test(p) &&!/^write at least/i.test(p));
  const s = parts[0] ?? prompt;
  return s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s;
}

export function bestBand(subs: WritingSubmission[]): number | null {
  const bands = subs.map((s) => s.band).filter((b): b is number => b != null);
  return bands.length ? Math.max(...bands) : null;
}

const filterTab = (tab: ListTab) => (t: WritingTask) => (tab === 't2' ? t.task === 2 : t.task === 1 && t.module === (tab === 't1a' ? 'academic' : 'general'));

export default function WritingList() {
  const writing = useStore((s) => s.writing);
  const module = useStore((s) => s.profile?.module ?? 'academic');
  const [tab, setTab] = useState<ListTab>(module === 'general' ? 't1g' : 't1a');
  const list = writingTasks.filter(filterTab(tab));

  const bestFor = (pred: (t: WritingTask) => boolean) => {
    const ids = new Set(writingTasks.filter(pred).map((t) => t.id));
    return bestBand(writing.filter((w) => ids.has(w.taskId)));
  };
  const t1Best = bestFor((t) => t.task === 1);
  const t2Best = bestFor((t) => t.task === 2);
  const combined = writingBand(t1Best, t2Best);

  return (
    <div>
      <PageHeader title="Writing" subtitle="Timed Task 1 and Task 2 practice with instant feedback, band-descriptor self-assessment and model answers." />

      <div className="card mb-6 grid gap-4 p-4 sm:p-5 md:grid-cols-[1fr_auto]">
        <div className="text-sm">
          <h2 className="h2 mb-2">How Writing is scored</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Two tasks in 60 minutes: <strong>Task 1</strong> (≥150 words, ~20 min) and <strong>Task 2</strong> (≥250 words, ~40 min).
            </li>
            <li>
              Each task is marked on four equal criteria: Task Achievement/Response, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range &amp; Accuracy.
            </li>
            <li>
              <strong>Task 2 counts double</strong> — your Writing band is roughly (Task 1 + 2 × Task 2) ÷ 3, so spend your time accordingly.
            </li>
          </ul>
          <p className="muted mt-2 text-xs" lang="vi">
            Mẹo: Task 2 chiếm 2/3 điểm Writing — đừng dành quá 20 phút cho Task 1.{' '}
            <Link to="/descriptors" className="text-brand-600 hover:underline dark:text-brand-400">
              See the band descriptors →
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-end">
          <div className="text-right text-sm">
            <div className="muted text-xs uppercase">Best Task 1</div>
            <BandBadge band={t1Best} />
          </div>
          <div className="text-right text-sm">
            <div className="muted text-xs uppercase">Best Task 2</div>
            <BandBadge band={t2Best} />
          </div>
          {combined != null && (
            <div className="text-right text-sm">
              <div className="muted text-xs uppercase">Writing estimate</div>
              <BandBadge band={combined} />
            </div>
          )}
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 't1a', label: 'Task 1 Academic' },
          { id: 't1g', label: 'Task 1 General' },
          { id: 't2', label: 'Task 2' },
        ]}
        value={tab}
        onChange={setTab}
      />

      {list.length === 0 ? (
        <Empty title="No tasks here yet">New questions are being written — check back soon.</Empty>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => {
            const subs = writing.filter((w) => w.taskId === t.id);
            const best = bestBand(subs);
            return (
              <li key={t.id}>
                <Link to={`/writing/${t.id}`} className="card flex h-full flex-col p-4 transition hover:border-brand-400 hover:shadow-md">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="chip bg-amber-50 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">{writingTypeLabel(t.type)}</span>
                      <span className="chip bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{t.topic}</span>
                    </div>
                    <BandBadge band={best} size="sm" label={best != null ? 'best' : undefined} />
                  </div>
                  <p className="mt-3 flex-1 text-sm text-slate-700 dark:text-slate-300">{promptExcerpt(t.prompt)}</p>
                  <div className="mt-3 text-xs">
                    {subs.length ? (
                      <span className="font-medium text-emerald-700 dark:text-emerald-400">✓ Attempted {subs.length}×</span>
                    ) : (
                      <span className="muted">Not attempted</span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
