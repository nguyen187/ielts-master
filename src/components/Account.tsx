import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { cloudEnabled, deleteCloudData, signInWithEmail, signInWithGoogle, signOut, syncNow, useCloud, type SyncStatus } from '../lib/cloud';

const LABEL: Record<SyncStatus, string> = {
  disabled: 'Local only',
  'signed-out': 'Not signed in',
  syncing: 'Syncing…',
  synced: 'Synced',
  offline: 'Offline — will sync later',
  error: 'Sync error',
};
const DOT: Record<SyncStatus, string> = {
  disabled: 'bg-slate-400',
  'signed-out': 'bg-slate-400',
  syncing: 'bg-sky-500 animate-pulse',
  synced: 'bg-emerald-500',
  offline: 'bg-amber-500',
  error: 'bg-rose-500',
};

/** Small status line for the sidebar. */
export function SyncBadge() {
  const c = useCloud();
  if (!cloudEnabled) return null;
  return (
    <Link to="/settings#account" className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 hover:underline" title={c.error ?? undefined}>
      <span className={`inline-block h-2 w-2 rounded-full ${DOT[c.status]}`} aria-hidden />
      {c.status === 'signed-out' ? 'Sign in to sync' : LABEL[c.status]}
    </Link>
  );
}

/** Account & sync section for the Settings page. */
export function AccountSection() {
  const c = useCloud();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const run = async (f: () => Promise<void>) => {
    setBusy(true);
    setErr(null);
    try {
      await f();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="account" className="card mb-5 p-5" aria-labelledby="s-account">
      <h2 id="s-account" className="h2 mb-2">
        Account &amp; sync
      </h2>
      {!cloudEnabled ? (
        <p className="muted text-sm">This copy of IELTS Master runs in local-only mode: your progress is stored in this browser. Use Export below to back it up.</p>
      ) : c.email ? (
        <div className="space-y-3 text-sm">
          <p>
            Signed in as <b>{c.email}</b>. Your progress syncs automatically across every device where you sign in.
          </p>
          <p className="flex items-center gap-2">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${DOT[c.status]}`} aria-hidden />
            {LABEL[c.status]}
            {c.lastSynced && c.status === 'synced' && <span className="muted">· {new Date(c.lastSynced).toLocaleTimeString()}</span>}
          </p>
          {c.error && <p className="text-rose-600">{c.error}</p>}
          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary" disabled={busy || c.status === 'syncing'} onClick={() => void run(syncNow)}>
              ↻ Sync now
            </button>
            <button className="btn-ghost" disabled={busy} onClick={() => void run(signOut)}>
              Sign out
            </button>
            {!confirmDelete ? (
              <button className="btn-ghost text-rose-600" onClick={() => setConfirmDelete(true)}>
                Delete my cloud data…
              </button>
            ) : (
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-rose-600">Delete everything stored online? This cannot be undone (data in this browser is kept).</span>
                <button className="btn-danger" disabled={busy} onClick={() => void run(deleteCloudData)}>
                  Yes, delete
                </button>
                <button className="btn-ghost" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
              </span>
            )}
          </div>
          <p className="muted text-xs">Your Anthropic API key, theme and voice settings are never uploaded.</p>
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <p className="muted">
            Sign in (optional) to back up your progress and continue on your phone or another computer. Everything you have done in this browser is kept and merged into your account. Mẹo: đăng nhập để không mất dữ liệu khi đổi máy.
          </p>
          {sent ? (
            <p className="rounded-lg bg-emerald-50 p-3 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
              Check <b>{email}</b> for a sign-in link, then open it in this browser.
            </p>
          ) : (
            <form
              className="flex flex-wrap gap-2"
              onSubmit={(e: FormEvent) => {
                e.preventDefault();
                void run(async () => {
                  await signInWithEmail(email.trim());
                  setSent(true);
                });
              }}
            >
              <label htmlFor="signin-email" className="sr-only">
                Email
              </label>
              <input id="signin-email" type="email" required className="input max-w-xs" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn-primary" disabled={busy || !email.includes('@')}>
                Email me a sign-in link
              </button>
            </form>
          )}
          <button className="btn-secondary" disabled={busy} onClick={() => void run(signInWithGoogle)}>
            Continue with Google
          </button>
          {err && <p className="text-rose-600">{err}</p>}
        </div>
      )}
    </section>
  );
}
