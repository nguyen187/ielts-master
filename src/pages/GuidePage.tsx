import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findGuide, guides } from '../content';
import type { Guide } from '../content/types';
import { Empty, Markdown, PageHeader } from '../components/ui';
import { markGuideRead, useStore } from '../lib/store';
import { guideSkillMeta } from './GuidesList';

const PRACTICE: Record<Guide['skill'], { to: string; label: string }> = {
  general: { to: '/mock', label: 'Try a full mock test' },
  listening: { to: '/listening', label: 'Practise Listening' },
  reading: { to: '/reading', label: 'Practise Reading' },
  writing: { to: '/writing', label: 'Practise Writing' },
  speaking: { to: '/speaking', label: 'Practise Speaking' },
};

export default function GuidePage() {
  const { id = '' } = useParams();
  const guide = findGuide(id);
  const isRead = useStore((s) => s.readGuides.includes(id));
  const sentinel = useRef<HTMLDivElement>(null);

  // Auto-mark as read once the learner scrolls to the end of the guide.
  useEffect(() => {
    if (!guide || isRead || typeof IntersectionObserver === 'undefined' || !sentinel.current) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) timer = setTimeout(() => markGuideRead(guide.id), 1500);
      else if (timer) clearTimeout(timer);
    });
    obs.observe(sentinel.current);
    return () => {
      obs.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [guide, isRead]);

  if (!guide) {
    return (
      <div>
        <PageHeader title="Guide not found" back={{ to: '/guides', label: 'All guides' }} />
        <Empty title="We couldn't find that guide">
          <Link to="/guides" className="text-brand-600 underline">
            Back to strategy guides
          </Link>
        </Empty>
      </div>
    );
  }

  const siblings = guides.filter((g) => g.skill === guide.skill);
  const i = siblings.findIndex((g) => g.id === guide.id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  const meta = guideSkillMeta(guide.skill);
  const practice = PRACTICE[guide.skill];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={guide.title}
        subtitle={guide.summary}
        back={{ to: '/guides', label: 'All guides' }}
        actions={
          <span className="chip bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {meta.icon} {meta.label}
          </span>
        }
      />

      {guide.vi && (
        <aside className="mb-5 rounded-2xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-900/30" aria-label="Tóm tắt tiếng Việt">
          <div className="mb-1 text-sm font-semibold text-brand-800 dark:text-brand-200">🇻🇳 Tóm tắt tiếng Việt</div>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{guide.vi}</p>
        </aside>
      )}

      <article className="card p-5 sm:p-6">
        <Markdown text={guide.body} />
        <div ref={sentinel} aria-hidden />
      </article>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {isRead ? (
          <span className="chip bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">✓ Read</span>
        ) : (
          <button className="btn-primary" onClick={() => markGuideRead(guide.id)}>
            Mark as read
          </button>
        )}
        <Link to={practice.to} className="btn-secondary">
          {practice.label} →
        </Link>
      </div>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="More guides">
        {prev ? (
          <Link to={`/guides/${prev.id}`} className="card p-4 transition hover:border-brand-400">
            <div className="muted text-xs">← Previous</div>
            <div className="font-medium text-slate-900 dark:text-white">{prev.title}</div>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/guides/${next.id}`} className="card p-4 text-right transition hover:border-brand-400">
            <div className="muted text-xs">Next →</div>
            <div className="font-medium text-slate-900 dark:text-white">{next.title}</div>
          </Link>
        )}
      </nav>
    </div>
  );
}
