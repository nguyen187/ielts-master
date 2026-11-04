import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { listeningTests } from '../content';
import { BandBadge, DifficultyChip, Empty, PageHeader } from '../components/ui';
import { useStore } from '../lib/store';
import { bestAttempts } from './ReadingList';

const PART_INFO = {
  1: 'Everyday conversation · form & note completion',
  2: 'Everyday monologue · MCQ, maps, matching',
  3: 'Academic discussion · MCQ & matching',
  4: 'Academic lecture · note completion',
} as const;

export default function ListeningList() {
  const attempts = useStore((s) => s.attempts);
  const best = useMemo(() => bestAttempts(attempts, 'listening'), [attempts]);
  return (
    <div>
      <PageHeader
        title="Listening practice"
        subtitle="Four full practice tests (16 parts, 160 questions). Audio is generated with your browser's English voices in different accents. Practise part by part, or take a whole test in exam mode from the mock test page."
        actions={
          <>
            <Link to="/guides/guide-listening-overview" className="btn-secondary">
              🧭 Listening strategy
            </Link>
            <Link to="/settings" className="btn-ghost">
              Voice speed
            </Link>
          </>
        }
      />
      <div className="mb-5 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm dark:border-sky-900 dark:bg-sky-950/40">
        <b>Tip:</b> For the most natural audio use Chrome or Edge (they include high-quality online voices) or Safari on macOS/iOS. <span className="muted">Mẹo: Đọc trước câu hỏi, gạch chân từ khoá và đoán loại từ cần điền (số, tên, danh từ…).</span>
      </div>
      {listeningTests.length === 0 && <Empty title="Listening tests are loading" />}
      <div className="space-y-6">
        {listeningTests.map((t) => (
          <section key={t.id}>
            <h2 className="h2 mb-3">{t.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.sections.map((s) => {
                const b = best.get(s.id);
                return (
                  <Link key={s.id} to={`/listening/${s.id}`} className="card group flex flex-col p-4 transition hover:border-brand-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="chip bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200">Part {s.part}</span>
                      {b ? <BandBadge band={b.band} size="sm" /> : <DifficultyChip d={s.difficulty} />}
                    </div>
                    <div className="mt-2 font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">{s.title}</div>
                    <div className="muted mt-1 text-xs">{PART_INFO[s.part]}</div>
                    <div className="muted mt-auto pt-2 text-xs">{b ? `Best ${b.score}/${b.total}` : 'Not attempted'}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
