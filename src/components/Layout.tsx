import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useStore, streak } from '../lib/store';

const NAV: { to: string; label: string; icon: string; group?: string }[] = [
  { to: '/', label: 'Today', icon: '🏠' },
  { to: '/listening', label: 'Listening', icon: '🎧', group: 'Practise' },
  { to: '/reading', label: 'Reading', icon: '📖', group: 'Practise' },
  { to: '/writing', label: 'Writing', icon: '✍️', group: 'Practise' },
  { to: '/speaking', label: 'Speaking', icon: '🗣️', group: 'Practise' },
  { to: '/mock', label: 'Full mock test', icon: '📝', group: 'Practise' },
  { to: '/vocabulary', label: 'Vocabulary', icon: '🧠', group: 'Build' },
  { to: '/grammar', label: 'Grammar', icon: '🧩', group: 'Build' },
  { to: '/guides', label: 'Strategy guides', icon: '🧭', group: 'Build' },
  { to: '/descriptors', label: 'Band descriptors', icon: '📏', group: 'Build' },
  { to: '/progress', label: 'Progress', icon: '📈', group: 'You' },
  { to: '/settings', label: 'Settings', icon: '⚙️', group: 'You' },
];

function useTheme() {
  const theme = useStore((s) => s.settings.theme);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const apply = () => document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && !!mq?.matches));
    apply();
    mq?.addEventListener?.('change', apply);
    return () => mq?.removeEventListener?.('change', apply);
  }, [theme]);
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  let lastGroup: string | undefined;
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Main">
      {NAV.map((n) => {
        const header = n.group && n.group !== lastGroup ? n.group : null;
        lastGroup = n.group;
        return (
          <div key={n.to}>
            {header && <div className="mt-4 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{header}</div>}
            <NavLink
              to={n.to}
              end={n.to === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`
              }
            >
              <span aria-hidden className="w-5 text-center">
                {n.icon}
              </span>
              {n.label}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <NavLink to="/" className="flex items-center gap-2 px-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg font-black text-white">9</span>
      <span className="leading-tight">
        <span className="block font-bold text-slate-900 dark:text-white">IELTS Master</span>
        <span className="block text-[11px] text-slate-500">from diagnostic to target band</span>
      </span>
    </NavLink>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  useTheme();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const profile = useStore((s) => s.profile);
  const days = useStore((s) => s.activeDays);
  const st = streak(days);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  const focusMode = /^\/(mock|reading\/|listening\/)/.test(loc.pathname) && loc.pathname !== '/mock' ? false : false;

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-2">
        Skip to content
      </a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white px-3 py-5 lg:flex dark:border-slate-800 dark:bg-slate-900">
        <Brand />
        <div className="mt-6 flex-1 overflow-y-auto">
          <NavItems />
        </div>
        {profile && (
          <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
            <div className="font-semibold text-slate-700 dark:text-slate-200">{profile.name || 'Learner'}</div>
            <div className="muted">
              Target {profile.targetBand.toFixed(1)} · 🔥 {st} day streak
            </div>
          </div>
        )}
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/90">
        <Brand />
        <button className="btn-ghost" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          ☰
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-white p-4 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <Brand />
              <button className="btn-ghost" aria-label="Close menu" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <NavItems onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main id="main" className={`lg:pl-64 ${focusMode ? '' : ''}`}>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10">{children}</div>
        <footer className="mx-auto max-w-6xl px-4 pb-8 text-xs text-slate-400 sm:px-6">
          IELTS Master is an independent study tool and is not affiliated with or endorsed by the British Council, IDP or Cambridge University Press &amp; Assessment. All practice material is original. Band estimates are indicative.
        </footer>
      </main>
    </div>
  );
}
