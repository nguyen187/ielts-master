import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Module } from '../content/types';
import { Modal, PageHeader } from '../components/ui';
import { exportData, importData, resetState, saveProfile, today, updateSettings, useStore, type Profile, type Settings as SettingsT } from '../lib/store';
import { speak, ttsSupported } from '../lib/speech';
import { AccountSection } from '../components/Account';
import { IS_ARTIFACT, useClaudeAi } from '../lib/artifact';
import { useProgressSave } from '../lib/artifactSync';
import { cloudEnabled } from '../lib/cloud';

const BANDS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

function ProfileForm({ profile }: { profile: Profile }) {
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setSaved(false);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveProfile({ ...draft, name: draft.name.trim(), hoursPerDay: Math.max(0.25, Math.min(12, draft.hoursPerDay || 1)) });
    setSaved(true);
  };
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="label" htmlFor="p-name">
          Name
        </label>
        <input id="p-name" className="input" value={draft.name} onChange={(e) => set('name', e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="p-module">
          Module
        </label>
        <select id="p-module" className="input" value={draft.module} onChange={(e) => set('module', e.target.value as Module)}>
          <option value="academic">Academic</option>
          <option value="general">General Training</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="p-target">
          Target band
        </label>
        <select id="p-target" className="input" value={draft.targetBand} onChange={(e) => set('targetBand', Number(e.target.value))}>
          {BANDS.map((b) => (
            <option key={b} value={b}>
              {b.toFixed(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="p-date">
          Exam date
        </label>
        <input id="p-date" type="date" className="input" value={draft.examDate} min={today()} onChange={(e) => set('examDate', e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor="p-hours">
          Study hours per day
        </label>
        <input id="p-hours" type="number" min={0.25} max={12} step={0.25} className="input" value={draft.hoursPerDay} onChange={(e) => set('hoursPerDay', Number(e.target.value))} />
      </div>
      <div className="flex items-end gap-3 sm:col-span-2">
        <button type="submit" className="btn-primary">
          Save profile
        </button>
        {saved && (
          <span className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
            ✓ Saved
          </span>
        )}
        <Link to="/start" className="btn-ghost ml-auto">
          Redo the diagnostic test
        </Link>
      </div>
    </form>
  );
}

export default function Settings() {
  const profile = useStore((s) => s.profile);
  const settings = useStore((s) => s.settings);
  const [showKey, setShowKey] = useState(false);
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const claude = useClaudeAi();
  const save = useProgressSave();
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const doExport = async () => {
    if (IS_ARTIFACT) {
      // file downloads go through the viewer's confirmation on claude.ai
      const c = (window as unknown as { claude?: { use(n: string): Promise<{ save(o: { filename: string; data: string }): Promise<unknown> } | null> } }).claude;
      const dl = c ? await c.use('downloads').catch(() => null) : null;
      if (!dl) {
        setExportMsg('Saving files is not available in this view.');
        return;
      }
      try {
        await dl.save({ filename: `ielts-master-backup-${today()}.json`, data: exportData() });
        setExportMsg(null);
      } catch {
        setExportMsg('The backup was not saved.');
      }
      return;
    }
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ielts-master-backup-${today()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const readFile = (f: File): Promise<string> =>
    typeof f.text === 'function'
      ? f.text()
      : new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result ?? ''));
          r.onerror = () => reject(r.error);
          r.readAsText(f);
        });

  const doImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const ok = importData(await readFile(f));
      setImportMsg(ok ? { ok, text: `✓ Imported “${f.name}”. Your progress has been restored.` } : { ok, text: '✗ That file is not a valid IELTS Master backup. Nothing was changed.' });
    } catch {
      setImportMsg({ ok: false, text: '✗ Could not read that file.' });
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" subtitle={cloudEnabled ? 'Your account, profile, AI examiner, voice and data.' : IS_ARTIFACT ? 'Your profile, Claude examiner, voice and data.' : 'Your profile, AI examiner, voice and data. Everything is stored only in this browser.'} />

      {!IS_ARTIFACT && <AccountSection />}

      <section className="card mb-5 p-5" aria-labelledby="s-profile">
        <h2 id="s-profile" className="h2 mb-4">
          Profile
        </h2>
        {profile ? (
          <ProfileForm key={profile.createdAt} profile={profile} />
        ) : (
          <p className="muted text-sm">
            You haven't set up a profile yet.{' '}
            <Link to="/start" className="text-brand-600 underline dark:text-brand-400">
              Take the diagnostic test
            </Link>{' '}
            to get a study plan.
          </p>
        )}
      </section>

      {IS_ARTIFACT ? (
        <section className="card mb-5 p-5" aria-labelledby="s-ai">
          <h2 id="s-ai" className="h2 mb-2">
            Claude examiner &amp; saving
          </h2>
          <p className="text-sm">
            {claude === 'ready'
              ? 'Writing and Speaking can be graded by Claude using your own Claude account — no API key needed. The first time, Claude asks you to allow this page.'
              : claude === 'checking'
                ? 'Connecting to Claude…'
                : 'Claude grading is not available in this view (open the page on claude.ai while signed in, and allow it to use Claude). Automatic scoring and the band descriptors still work.'}
          </p>
          <p className="muted mt-2 text-sm">
            {save === 'off'
              ? 'Progress is kept in this browser only. Sign in to claude.ai to save it to your account.'
              : save === 'loading'
                ? 'Loading your saved progress…'
                : save === 'saving'
                  ? 'Saving your progress…'
                  : save === 'error'
                    ? 'Your progress could not be saved to your account right now. It is still kept in this browser.'
                    : '✓ Your progress is saved privately to your account on this page — only you can see it.'}
          </p>
        </section>
      ) : (
      <section className="card mb-5 p-5" aria-labelledby="s-ai">
          <h2 id="s-ai" className="h2 mb-2">
            AI examiner (optional)
          </h2>
          <p className="muted mb-3 text-sm">
            Add your own Anthropic API key to get examiner-style feedback on Writing and Speaking. The key stays in this browser (localStorage) and requests go directly from your browser to Anthropic — never to our servers. You can create a key at{' '}
            <a href="https://console.anthropic.com/" target="_blank" rel="noreferrer noopener" className="text-brand-600 underline dark:text-brand-400">
              console.anthropic.com
            </a>
            . Mẹo: không chia sẻ khóa API trên máy dùng chung.
          </p>
          <label className="label" htmlFor="s-key">
            Anthropic API key
          </label>
          <div className="flex gap-2">
            <input
              id="s-key"
              type={showKey ? 'text' : 'password'}
              className="input font-mono"
              placeholder="sk-ant-…"
              autoComplete="off"
              spellCheck={false}
              value={settings.apiKey}
              onChange={(e) => updateSettings({ apiKey: e.target.value.trim() })}
            />
            <button type="button" className="btn-secondary" onClick={() => setShowKey((v) => !v)} aria-pressed={showKey}>
              {showKey ? 'Hide' : 'Show'}
            </button>
            {settings.apiKey && (
              <button type="button" className="btn-ghost" onClick={() => updateSettings({ apiKey: '' })}>
                Remove
              </button>
            )}
          </div>
          <p className="muted mt-2 text-xs">{settings.apiKey ? '✓ Key saved — AI feedback buttons are enabled.' : 'No key — you can still self-assess with the band descriptors.'}</p>
        </section>
      )}

      <section className="card mb-5 p-5" aria-labelledby="s-voice">
        <h2 id="s-voice" className="h2 mb-3">
          Voice & appearance
        </h2>
        <label className="label" htmlFor="s-rate">
          Speech rate: {settings.speechRate.toFixed(2)}×
        </label>
        <div className="flex items-center gap-3">
          <input
            id="s-rate"
            type="range"
            min={0.5}
            max={1.5}
            step={0.05}
            className="w-full accent-brand-600"
            value={settings.speechRate}
            onChange={(e) => updateSettings({ speechRate: Number(e.target.value) })}
          />
          <button type="button" className="btn-secondary whitespace-nowrap" onClick={() => speak('Welcome to IELTS Master. This is how the listening voices will sound.', settings.speechRate)}>
            🔊 Test voice
          </button>
        </div>
        {!ttsSupported() && <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">Text-to-speech is not available in this browser.</p>}
        <div className="mt-5 sm:w-60">
          <label className="label" htmlFor="s-theme">
            Theme
          </label>
          <select id="s-theme" className="input" value={settings.theme} onChange={(e) => updateSettings({ theme: e.target.value as SettingsT['theme'] })}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </section>

      <section className="card mb-5 p-5" aria-labelledby="s-data">
        <h2 id="s-data" className="h2 mb-2">
          Your data
        </h2>
        <p className="muted mb-4 text-sm">Back up your progress or move it to another device. Hãy sao lưu thường xuyên — xóa dữ liệu trình duyệt sẽ mất tiến độ.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => void doExport()}>
            ⬇ Export backup (JSON)
          </button>
          <label className="btn-secondary cursor-pointer">
            ⬆ Import backup
            <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label="Import backup file" onChange={doImport} />
          </label>
          <button type="button" className="btn-danger ml-auto" onClick={() => setConfirmReset(true)}>
            Reset all data
          </button>
        </div>
        {exportMsg && (
          <p role="status" className="mt-3 text-sm text-rose-700 dark:text-rose-400">
            {exportMsg}
          </p>
        )}
        {importMsg && (
          <p role="status" className={`mt-3 text-sm ${importMsg.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
            {importMsg.text}
          </p>
        )}
      </section>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset all data?">
        <p className="mb-4 text-sm">This permanently deletes your profile, results, essays, vocabulary progress, error log and settings from this browser. Export a backup first if you might need it.</p>
        <div className="flex justify-end gap-2">
          <button className="btn-secondary" onClick={() => setConfirmReset(false)}>
            Cancel
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              resetState();
              setConfirmReset(false);
              setImportMsg({ ok: true, text: 'All data has been reset.' });
            }}
          >
            Yes, delete everything
          </button>
        </div>
      </Modal>
    </div>
  );
}
