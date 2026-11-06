import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { cueCards, speakingPart1 } from '../content';
import { BandBadge, PageHeader, Tabs } from '../components/ui';
import { useStore } from '../lib/store';

export default function SpeakingHome() {
  const subs = useStore((s) => s.speaking);
  const [tab, setTab] = useState<'p2' | 'p1'>('p2');
  const [q, setQ] = useState('');
  const best = useMemo(() => {
    const m = new Map<string, number | undefined>();
    subs.forEach((s) => m.set(s.itemId, Math.max(m.get(s.itemId) ?? 0, s.band ?? 0) || undefined));
    return m;
  }, [subs]);
  const needle = q.trim().toLowerCase();
  const cards = cueCards.filter((c) => !needle || `${c.topic} ${c.prompt}`.toLowerCase().includes(needle));
  const p1 = speakingPart1.filter((t) => !needle || `${t.topic} ${t.questions.join(' ')}`.toLowerCase().includes(needle));

  return (
    <div>
      <PageHeader
        title="Speaking practice"
        subtitle="The test is an 11–14 minute conversation with an examiner in three parts. Practise each part with timers, record yourself, read your transcript and compare with band 8 answers."
        actions={
          <>
            <Link to="/speaking/mock" className="btn-primary">
              🎤 Full speaking mock
            </Link>
            <Link to="/chat" className="btn-secondary">
              🤖 Talk with AI
            </Link>
            <Link to="/guides/guide-speaking-overview" className="btn-secondary">
              🧭 Strategy
            </Link>
          </>
        }
      />
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {[
          ['Part 1 · 4–5 min', 'Short questions about you: home, work, hobbies. Answer directly, add a reason and a detail (2–3 sentences).'],
          ['Part 2 · 3–4 min', '1 minute to prepare notes, then speak for up to 2 minutes on a cue card. Tell a story with specific details.'],
          ['Part 3 · 4–5 min', 'Abstract discussion linked to Part 2. Give opinions, reasons, examples and consider other views.'],
        ].map(([t, d]) => (
          <div key={t} className="card p-4">
            <div className="font-semibold">{t}</div>
            <p className="muted mt-1 text-sm">{d}</p>
          </div>
        ))}
      </div>
      <div className="card mb-6 p-4 text-sm">
        <b>Assessed on 4 equal criteria:</b> Fluency &amp; Coherence · Lexical Resource · Grammatical Range &amp; Accuracy · Pronunciation.{' '}
        <Link to="/descriptors" className="text-brand-600 underline">
          See band descriptors
        </Link>
        <div className="muted mt-1">Mẹo: Đừng học thuộc lòng bài mẫu — giám khảo nhận ra ngay. Hãy học cấu trúc và từ vựng, rồi nói bằng câu chuyện của chính bạn.</div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs
          tabs={[
            { id: 'p2', label: `Part 2 & 3 cue cards (${cueCards.length})` },
            { id: 'p1', label: `Part 1 topics (${speakingPart1.length})` },
          ]}
          value={tab}
          onChange={setTab}
        />
        <input className="input mb-4 max-w-xs" placeholder="Search topics…" aria-label="Search speaking topics" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {tab === 'p2' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.id} to={`/speaking/card/${c.id}`} className="card group flex flex-col p-4 transition hover:border-brand-300 hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">{c.topic}</div>
                {best.get(c.id) ? <BandBadge band={best.get(c.id)} size="sm" /> : null}
              </div>
              <p className="muted mt-1 text-sm">{c.prompt}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {p1.map((t) => (
            <Link key={t.id} to={`/speaking/part1/${t.id}`} className="card group p-4 transition hover:border-brand-300 hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">{t.topic}</div>
                {best.get(t.id) ? <BandBadge band={best.get(t.id)} size="sm" /> : null}
              </div>
              <p className="muted mt-1 text-sm">{t.questions[0]}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
