import { useState } from 'react';
import { Link } from 'react-router-dom';
import { guides } from '../content';
import type { Guide } from '../content/types';
import { Empty, PageHeader, ProgressBar, SKILL_META } from '../components/ui';
import { useStore } from '../lib/store';

export const GUIDE_SKILLS: Guide['skill'][] = ['general', 'listening', 'reading', 'writing', 'speaking'];

export const guideSkillMeta = (s: Guide['skill']) => (s === 'general' ? { label: 'General', icon: '🧭' } : SKILL_META[s]);

export default function GuidesList() {
  const read = useStore((s) => s.readGuides);
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const match = (g: Guide) => !needle || [g.title, g.summary, g.body, g.vi].some((x) => x.toLowerCase().includes(needle));
  const readCount = guides.filter((g) => read.includes(g.id)).length;
  const groups = GUIDE_SKILLS.map((skill) => ({ skill, items: guides.filter((g) => g.skill === skill && match(g)) })).filter((g) => g.items.length);

  return (
    <div>
      <PageHeader title="Strategy guides" subtitle="How each part of the test works, the traps examiners set, and step-by-step methods for every question type. Mỗi bài có tóm tắt tiếng Việt." />
      {!guides.length ? (
        <Empty title="No guides yet">
          Guides are on their way.{' '}
          <Link to="/" className="text-brand-600 underline">
            Back to today
          </Link>
        </Empty>
      ) : (
        <>
          <div className="card mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="label" htmlFor="guide-search">
                Search guides
              </label>
              <input id="guide-search" type="search" className="input" placeholder="e.g. True False Not Given, Part 2, spelling…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="sm:w-56">
              <div className="muted mb-1 text-xs">
                {readCount} / {guides.length} read
              </div>
              <ProgressBar value={readCount} max={guides.length} />
            </div>
          </div>
          {!groups.length && <Empty title="No guides match your search">Try a different keyword.</Empty>}
          {groups.map(({ skill, items }) => {
            const meta = guideSkillMeta(skill);
            return (
              <section key={skill} className="mb-6" aria-labelledby={`g-${skill}`}>
                <h2 id={`g-${skill}`} className="h2 mb-3">
                  <span aria-hidden>{meta.icon}</span> {meta.label}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((g) => {
                    const isRead = read.includes(g.id);
                    return (
                      <Link key={g.id} to={`/guides/${g.id}`} className="card block p-4 transition hover:border-brand-400">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-slate-900 dark:text-white">{g.title}</span>
                          {isRead ? (
                            <span className="chip shrink-0 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">✓ Read</span>
                          ) : (
                            <span className="chip shrink-0 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">Unread</span>
                          )}
                        </div>
                        <p className="muted mt-1 text-sm">{g.summary}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
