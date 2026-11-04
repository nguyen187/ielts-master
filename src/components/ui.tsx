import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function PageHeader({ title, subtitle, actions, back }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; back?: { to: string; label: string } }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {back && (
          <Link to={back.to} className="mb-2 inline-flex items-center gap-1 text-sm text-brand-600 hover:underline dark:text-brand-400">
            ← {back.label}
          </Link>
        )}
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="muted mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function bandColor(b: number | undefined | null) {
  if (b == null) return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
  if (b >= 7.5) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
  if (b >= 6.5) return 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300';
  if (b >= 5.5) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
  return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';
}

export function BandBadge({ band, label, size = 'md' }: { band: number | null | undefined; label?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'text-3xl px-4 py-2' : size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';
  return (
    <span className={`inline-flex items-baseline gap-1 rounded-xl font-bold ${sz} ${bandColor(band)}`} title={label}>
      {band == null ? '–' : band.toFixed(1)}
      {label && <span className="text-xs font-medium opacity-80">{label}</span>}
    </span>
  );
}

export function ProgressBar({ value, max = 100, className = '', color = 'bg-brand-600' }: { value: number; max?: number; className?: string; color?: string }) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(max, 1)) * 100));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${className}`} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="card p-4">
      <div className="muted text-xs font-medium uppercase tracking-wide">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      {hint && <div className="muted mt-1 text-xs">{hint}</div>}
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="card p-8 text-center">
      <div className="h2">{title}</div>
      {children && <div className="muted mt-2 text-sm">{children}</div>}
    </div>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: ReactNode }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/70" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${value === t.id ? 'bg-white text-slate-900 shadow dark:bg-slate-900 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function fmtTime(sec: number) {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

/** Countdown (or count-up when limit is null). Calls onExpire once. */
export function useTimer(limitSec: number | null, running: boolean, onExpire?: () => void) {
  const [elapsed, setElapsed] = useState(0);
  const fired = useRef(false);
  const cb = useRef(onExpire);
  cb.current = onExpire;
  useEffect(() => {
    if (!running) return;
    const start = Date.now() - elapsed * 1000;
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
  useEffect(() => {
    if (limitSec != null && elapsed >= limitSec && !fired.current) {
      fired.current = true;
      cb.current?.();
    }
  }, [elapsed, limitSec]);
  const reset = () => {
    fired.current = false;
    setElapsed(0);
  };
  return { elapsed, remaining: limitSec == null ? null : Math.max(0, limitSec - elapsed), reset };
}

export function TimerBadge({ remaining, elapsed, warnAt = 300 }: { remaining: number | null; elapsed: number; warnAt?: number }) {
  const t = remaining ?? elapsed;
  const warn = remaining != null && remaining <= warnAt;
  return (
    <span className={`chip font-mono text-sm ${warn ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`} aria-live="off">
      ⏱ {fmtTime(t)}
    </span>
  );
}

/** Render the markdown-lite used in guides and grammar lessons. */
export function Markdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  const lines = text.replace(/\r/g, '').split('\n');
  let i = 0;
  let key = 0;
  const inline = (s: string): ReactNode[] =>
    s.split(/(\*\*[^*]+\*\*)/g).map((part, j) => (part.startsWith('**') && part.endsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part));
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    if (line.startsWith('## ') || line.startsWith('### ')) {
      blocks.push(<h2 key={key++}>{inline(line.replace(/^#+\s*/, ''))}</h2>);
      i++;
    } else if (/^[-•] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-•] /.test(lines[i].trim())) items.push(lines[i++].trim().slice(2));
      blocks.push(
        <ul key={key++}>
          {items.map((t, j) => (
            <li key={j}>{inline(t)}</li>
          ))}
        </ul>,
      );
    } else if (/^\d+[.)] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)] /.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+[.)] /, ''));
      blocks.push(
        <ol key={key++}>
          {items.map((t, j) => (
            <li key={j}>{inline(t)}</li>
          ))}
        </ol>,
      );
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(##|[-•] |\d+[.)] )/.test(lines[i].trim())) para.push(lines[i++].trim());
      blocks.push(<p key={key++}>{inline(para.join(' '))}</p>);
    }
  }
  return <div className="prose-lite">{blocks}</div>;
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="h2">{title}</h2>
          <button className="btn-ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export const SKILL_META = {
  listening: { label: 'Listening', icon: '🎧', color: 'text-sky-600' },
  reading: { label: 'Reading', icon: '📖', color: 'text-emerald-600' },
  writing: { label: 'Writing', icon: '✍️', color: 'text-amber-600' },
  speaking: { label: 'Speaking', icon: '🗣️', color: 'text-rose-600' },
} as const;

export function DifficultyChip({ d }: { d: number }) {
  const map = { 1: ['Band 5–6', 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'], 2: ['Band 6–7', 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'], 3: ['Band 7–9', 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'] } as const;
  const [l, c] = map[(d as 1 | 2 | 3) ?? 1] ?? map[1];
  return <span className={`chip ${c}`}>{l}</span>;
}
