import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createRecognizer, recognitionSupported, startRecording } from '../lib/speech';
import { analyseSpeech } from '../lib/writingAnalysis';
import { criteriaBand } from '../lib/scoring';
import { describeError, gradeSpeaking, type SpeakingFeedback } from '../lib/ai';
import { BAND_OPTIONS, descriptorFor, speakingDescriptors } from '../content/descriptors';
import { useStore } from '../lib/store';
import { BandBadge } from './ui';

export type SpeakingCriteria = { fc: number; lr: number; gra: number; p: number };

/** Microphone recording + live speech-to-text. Falls back gracefully when unsupported. */
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const rec = useRef<Awaited<ReturnType<typeof startRecording>>>(null);
  const asr = useRef<ReturnType<typeof createRecognizer>>(null);
  const startedAt = useRef(0);
  const base = useRef('');

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setSeconds(Math.round((Date.now() - startedAt.current) / 1000)), 250);
    return () => clearInterval(id);
  }, [recording]);

  useEffect(
    () => () => {
      rec.current?.cancel();
      asr.current?.stop();
    },
    [],
  );

  async function start() {
    setError(null);
    setInterim('');
    base.current = '';
    setTranscript('');
    setAudioUrl(null);
    try {
      rec.current = await startRecording();
    } catch (e) {
      // Permission denied / no microphone: don't enter "recording" mode, so the box stays editable
      rec.current = null;
      const name = e instanceof DOMException ? e.name : '';
      setError(
        name === 'NotFoundError'
          ? 'No microphone was found. Type what you said in the box below instead.'
          : 'Microphone access was blocked. Allow the microphone (lock icon next to the address bar) and try again, or type what you said below.',
      );
      return;
    }
    if (!rec.current && !recognitionSupported()) {
      setError('Recording is not available in this browser. Type what you said in the box below instead.');
      return;
    }
    if (!rec.current) setError('Audio playback is not available in this browser, but the live transcript still works.');
    asr.current = recognitionSupported()
      ? createRecognizer(
          (finalText, int) => {
            setTranscript(finalText);
            setInterim(int);
          },
          (msg) => setError(msg),
        )
      : null;
    asr.current?.start();
    startedAt.current = Date.now();
    setSeconds(0);
    setRecording(true);
  }

  async function stop() {
    if (!recording) return;
    setRecording(false);
    asr.current?.stop();
    asr.current = null;
    setSeconds(Math.round((Date.now() - startedAt.current) / 1000));
    setTranscript((t) => (interim ? `${t} ${interim}`.trim() : t));
    setInterim('');
    if (rec.current) {
      const url = await rec.current.stop();
      rec.current = null;
      setAudioUrl(url);
    }
    // final results can arrive shortly after stop(); if still nothing, tell the learner why
    setTimeout(() => {
      setTranscript((t) => {
        if (!t.trim())
          setError(
            (e) =>
              e ??
              (recognitionSupported()
                ? 'No words were recognised. Live transcript works best in Chrome or Edge on a computer (in Safari, turn on Siri / Dictation). Your recording is saved — type a short summary of what you said, or just press Next.'
                : 'This browser has no live transcript (use Chrome or Edge for it). Your recording is saved — type what you said, or just press Next.'),
          );
        return t;
      });
    }, 1200);
  }

  const hasAnswer = !!(transcript.trim() || audioUrl);
  return { recording, transcript, setTranscript, interim, audioUrl, seconds, error, start, stop, hasAnswer, asrSupported: recognitionSupported() };
}

export function RecorderPanel({ r, limit, label = 'Record answer' }: { r: ReturnType<typeof useRecorder>; limit?: number; label?: string }) {
  useEffect(() => {
    if (limit && r.recording && r.seconds >= limit) void r.stop();
  }, [limit, r]);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {!r.recording ? (
          <button className="btn-primary" onClick={() => void r.start()}>
            🎙️ {r.audioUrl || r.transcript ? 'Record again' : label}
          </button>
        ) : (
          <button className="btn-danger" onClick={() => void r.stop()}>
            ■ Stop
          </button>
        )}
        {r.recording && (
          <span className="chip bg-rose-100 font-mono text-sm text-rose-700 dark:bg-rose-900/50 dark:text-rose-300" aria-live="polite">
            ● REC {Math.floor(r.seconds / 60)}:{String(r.seconds % 60).padStart(2, '0')}
            {limit ? ` / ${Math.floor(limit / 60)}:${String(limit % 60).padStart(2, '0')}` : ''}
          </span>
        )}
        {r.audioUrl && !r.recording && <audio controls src={r.audioUrl} className="h-9 max-w-full" aria-label="Your recording" />}
      </div>
      {r.error && <p className="text-sm text-amber-700 dark:text-amber-400">{r.error}</p>}
      {!r.asrSupported && <p className="muted text-xs">Live transcript needs Chrome, Edge or Safari. You can type or paste what you said instead.</p>}
      <div>
        <label className="label" htmlFor="transcript">
          Transcript {r.asrSupported ? '(automatic — correct any mistakes)' : '(type what you said)'}
        </label>
        <textarea
          id="transcript"
          className="input min-h-24 text-sm"
          value={r.recording ? `${r.transcript} ${r.interim}`.trim() : r.transcript}
          readOnly={r.recording}
          onChange={(e) => r.setTranscript(e.target.value)}
          placeholder={r.recording ? 'Listening…' : 'Your words will appear here.'}
        />
      </div>
    </div>
  );
}

export function SpeechStats({ transcript, seconds }: { transcript: string; seconds: number }) {
  const a = analyseSpeech(transcript, seconds);
  if (!a.words) return null;
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <div className="muted text-xs">Words</div>
          <div className="font-bold">{a.words}</div>
        </div>
        <div>
          <div className="muted text-xs">Words / minute</div>
          <div className="font-bold">{a.wpm || '–'}</div>
        </div>
        <div>
          <div className="muted text-xs">Fillers (um, uh…)</div>
          <div className="font-bold">{a.fillers}</div>
        </div>
        <div>
          <div className="muted text-xs">Vocabulary variety</div>
          <div className="font-bold">{Math.round(a.lexicalDiversity * 100)}%</div>
        </div>
      </div>
      {a.tips.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {a.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Self-assessment with descriptors + optional AI examiner. */
export function SpeakingAssessment({ part, questions, transcript, seconds, onSave }: { part: 1 | 2 | 3; questions: string[]; transcript: string; seconds: number; onSave: (c: SpeakingCriteria, band: number, source: 'self' | 'ai', feedback?: string) => void }) {
  const apiKey = useStore((s) => s.settings.apiKey);
  const [c, setC] = useState<SpeakingCriteria>({ fc: 6, lr: 6, gra: 6, p: 6 });
  const [saved, setSaved] = useState<null | 'self' | 'ai'>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fb, setFb] = useState<SpeakingFeedback | null>(null);

  async function runAi() {
    setBusy(true);
    setErr(null);
    try {
      const res = await gradeSpeaking(apiKey, { part, questions, transcript, seconds });
      setFb(res);
      const crit = { fc: res.fc.band, lr: res.lr.band, gra: res.gra.band, p: res.p.band };
      setC(crit);
      onSave(crit, criteriaBand(Object.values(crit)), 'ai', JSON.stringify(res));
      setSaved('ai');
    } catch (e) {
      setErr(describeError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h3 className="h2">Rate yourself with the band descriptors</h3>
        <p className="muted mt-1 text-sm">Listen to your recording, then choose the band whose description fits best. Be strict — examiners are.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {speakingDescriptors.map((d) => {
            const k = d.key as keyof SpeakingCriteria;
            const desc = descriptorFor('speaking', d.key, c[k]);
            return (
              <div key={d.key} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-semibold" htmlFor={`sp-${d.key}`}>
                    {d.code} · {d.name}
                  </label>
                  <select id={`sp-${d.key}`} className="input w-24" value={c[k]} onChange={(e) => setC((x) => ({ ...x, [k]: Number(e.target.value) }))}>
                    {BAND_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b.toFixed(1)}
                      </option>
                    ))}
                  </select>
                </div>
                {desc && (
                  <p className="muted mt-2 text-xs">
                    {desc.text}
                    {desc.upper && <span> Some features of band {desc.upper.band}.</span>}
                    <span className="mt-1 block text-brand-700 dark:text-brand-300">↑ {desc.moveUp}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <BandBadge band={criteriaBand(Object.values(c))} label="overall" />
          <button
            className="btn-primary"
            onClick={() => {
              onSave(c, criteriaBand(Object.values(c)), 'self');
              setSaved('self');
            }}
          >
            Save self-assessment
          </button>
          {saved && <span className="text-sm text-emerald-600">✓ Saved ({saved === 'ai' ? 'AI examiner' : 'self'})</span>}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="h2">AI examiner</h3>
        {!apiKey ? (
          <p className="muted mt-1 text-sm">
            Get criterion-by-criterion feedback on your transcript. Add your own Anthropic API key in{' '}
            <Link className="text-brand-600 underline" to="/settings">
              Settings
            </Link>{' '}
            — it stays in this browser.
          </p>
        ) : (
          <>
            <p className="muted mt-1 text-sm">Assesses your transcript (pronunciation can only be judged indirectly from text).</p>
            <button className="btn-primary mt-3" disabled={busy || transcript.split(/\s+/).length < 15} onClick={() => void runAi()}>
              {busy ? 'Assessing…' : 'Get AI feedback'}
            </button>
            {transcript.split(/\s+/).length < 15 && <span className="muted ml-2 text-xs">Need a longer transcript.</span>}
          </>
        )}
        {err && <p className="mt-2 text-sm text-rose-600">{err}</p>}
        {fb && (
          <div className="mt-4 space-y-3 text-sm">
            <p>{fb.summary}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {(['fc', 'lr', 'gra', 'p'] as const).map((k) => (
                <div key={k} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between font-semibold">
                    {speakingDescriptors.find((d) => d.key === k)?.name} <BandBadge band={fb[k].band} size="sm" />
                  </div>
                  <ul className="mt-2 list-disc space-y-0.5 pl-5">
                    {fb[k].strengths.map((s) => (
                      <li key={s}>✓ {s}</li>
                    ))}
                    {fb[k].weaknesses.map((s) => (
                      <li key={s} className="text-rose-700 dark:text-rose-300">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {fb.betterPhrases.length > 0 && (
              <div>
                <div className="font-semibold">Upgrade your phrases</div>
                <ul className="mt-1 space-y-1">
                  {fb.betterPhrases.map((p) => (
                    <li key={p.said}>
                      <span className="text-rose-600 line-through">{p.said}</span> → <span className="text-emerald-700 dark:text-emerald-300">{p.better}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <div className="font-semibold">Next steps</div>
              <ol className="mt-1 list-decimal pl-5">
                {fb.nextSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
