import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createRecognizer, recognitionSupported, startRecording } from '../lib/speech';
import { analyseSpeech } from '../lib/writingAnalysis';
import { scoreSpeechAuto } from '../lib/speakingScore';
import { IS_ARTIFACT } from '../lib/artifact';
import { criteriaBand } from '../lib/scoring';
import { describeError, gradeSpeaking, useAiAvailable, type SpeakingFeedback } from '../lib/ai';
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
  const noWordsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // word-weighted recogniser confidence across every answer recorded with this hook
  const conf = useRef({ sum: 0, words: 0 });
  const [confidence, setConfidence] = useState<number | null>(null);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setSeconds(Math.round((Date.now() - startedAt.current) / 1000)), 250);
    return () => clearInterval(id);
  }, [recording]);

  useEffect(
    () => () => {
      rec.current?.cancel();
      asr.current?.stop();
      if (noWordsTimer.current) clearTimeout(noWordsTimer.current);
    },
    [],
  );

  /** Clear everything about the current answer before the next question. */
  function reset() {
    if (noWordsTimer.current) clearTimeout(noWordsTimer.current);
    noWordsTimer.current = null;
    if (recording) {
      asr.current?.stop();
      asr.current = null;
      rec.current?.cancel();
      rec.current = null;
      setRecording(false);
    }
    setTranscript('');
    setInterim('');
    setAudioUrl(null);
    setSeconds(0);
    setError(null);
  }

  async function start() {
    if (noWordsTimer.current) clearTimeout(noWordsTimer.current);
    noWordsTimer.current = null;
    if (IS_ARTIFACT) {
      // claude.ai artifacts cannot use the microphone: the learner speaks through the
      // keyboard's own dictation into the box while we time the answer
      setError(null);
      setInterim('');
      setTranscript('');
      setAudioUrl(null);
      startedAt.current = Date.now();
      setSeconds(0);
      setRecording(true);
      setTimeout(() => document.getElementById('transcript')?.focus(), 0);
      return;
    }
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
          (c, w) => {
            conf.current.sum += c * w;
            conf.current.words += w;
            setConfidence(conf.current.sum / conf.current.words);
          },
        )
      : null;
    asr.current?.start();
    startedAt.current = Date.now();
    setSeconds(0);
    setRecording(true);
  }

  async function stop() {
    if (!recording) return;
    if (IS_ARTIFACT) {
      setRecording(false);
      setSeconds(Math.round((Date.now() - startedAt.current) / 1000));
      return;
    }
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
    noWordsTimer.current = setTimeout(() => {
      noWordsTimer.current = null;
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
  const asrSupported = IS_ARTIFACT ? false : recognitionSupported();
  return { recording, transcript, setTranscript, interim, audioUrl, seconds, error, start, stop, hasAnswer, confidence, asrSupported, reset };
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
            🎙️ {r.audioUrl || r.transcript ? (IS_ARTIFACT ? 'Answer again' : 'Record again') : IS_ARTIFACT ? 'Start answering' : label}
          </button>
        ) : (
          <button className="btn-danger" onClick={() => void r.stop()}>
            ■ {IS_ARTIFACT ? 'Done' : 'Stop'}
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
      {IS_ARTIFACT ? (
        <p className="muted text-xs">
          Press <b>Start answering</b>, then speak using your keyboard’s dictation: the 🎤 key on a phone keyboard, or press <kbd>Fn</kbd> twice (Mac) / <kbd>Win</kbd>+<kbd>H</kbd> (Windows). Press <b>Done</b> when you finish — your speaking time is measured. Nói qua chức năng đọc chính tả của bàn phím, không cần gõ.
        </p>
      ) : (
        !r.asrSupported && <p className="muted text-xs">Live transcript needs Chrome, Edge or Safari. You can type or paste what you said instead.</p>
      )}
      <div>
        <label className="label" htmlFor="transcript">
          Transcript {IS_ARTIFACT ? '(dictate your answer here)' : r.asrSupported ? '(automatic — correct any mistakes)' : '(type what you said)'}
        </label>
        <textarea
          id="transcript"
          className="input min-h-24 text-sm"
          value={r.recording && !IS_ARTIFACT ? `${r.transcript} ${r.interim}`.trim() : r.transcript}
          readOnly={r.recording && !IS_ARTIFACT}
          onChange={(e) => r.setTranscript(e.target.value)}
          placeholder={IS_ARTIFACT ? (r.recording ? 'Speak now with keyboard dictation…' : 'Press Start answering first.') : r.recording ? 'Listening…' : 'Your words will appear here.'}
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
export function SpeakingAssessment({
  part,
  questions,
  transcript,
  seconds,
  onSave,
  confidence,
  answers,
}: {
  part: 1 | 2 | 3;
  questions: string[];
  transcript: string;
  seconds: number;
  onSave: (c: SpeakingCriteria, band: number, source: 'self' | 'ai' | 'auto', feedback?: string) => void;
  confidence?: number | null;
  answers?: number;
}) {
  const apiKey = useStore((s) => s.settings.apiKey);
  const ai = useAiAvailable();
  const auto = useMemo(() => scoreSpeechAuto(transcript, seconds, { part, answers, confidence }), [transcript, seconds, part, answers, confidence]);
  const [c, setC] = useState<SpeakingCriteria>(() => (auto ? { fc: auto.fc.band, lr: auto.lr.band, gra: auto.gra.band, p: auto.p.band } : { fc: 6, lr: 6, gra: 6, p: 6 }));
  const [saved, setSaved] = useState<null | 'self' | 'ai' | 'auto'>(null);
  // automatic marking: saved straight away so it counts towards progress; self / AI marking replaces it
  const autoSaved = useRef(false);
  useEffect(() => {
    if (!auto || autoSaved.current) return;
    autoSaved.current = true;
    onSave({ fc: auto.fc.band, lr: auto.lr.band, gra: auto.gra.band, p: auto.p.band }, auto.band, 'auto');
    setSaved('auto');
  }, [auto, onSave]);
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
      <AutoScoreCard auto={auto} />
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
          {saved && <span className="text-sm text-emerald-600">✓ Saved ({saved === 'ai' ? 'AI examiner' : saved === 'auto' ? 'automatic' : 'self'})</span>}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="h2">{ai.via === 'claude' ? 'Claude examiner' : 'AI examiner'}</h3>
        {!ai.available ? (
          ai.via === 'claude' ? (
            <p className="muted mt-1 text-sm">
              {ai.state === 'checking' ? 'Connecting to Claude…' : 'Claude grading is available when you open this page on claude.ai and allow it to use Claude.'}
            </p>
          ) : (
            <p className="muted mt-1 text-sm">
              Get criterion-by-criterion feedback on your transcript. Add your own Anthropic API key in{' '}
              <Link className="text-brand-600 underline" to="/settings">
                Settings
              </Link>{' '}
              — it stays in this browser.
            </p>
          )
        ) : (
          <>
            <p className="muted mt-1 text-sm">
              {ai.via === 'claude'
                ? 'Claude assesses your answers like an examiner and suggests better phrases, using your own Claude account (no API key). Pronunciation can only be judged indirectly from text.'
                : 'Assesses your transcript (pronunciation can only be judged indirectly from text).'}
            </p>
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

const CRIT: [keyof SpeakingCriteria, string][] = [
  ['fc', 'Fluency & Coherence'],
  ['lr', 'Lexical Resource'],
  ['gra', 'Grammar Range & Accuracy'],
  ['p', 'Pronunciation'],
];

/** Instant automatic band (offline, no key). */
export function AutoScoreCard({ auto }: { auto: ReturnType<typeof scoreSpeechAuto> }) {
  if (!auto)
    return (
      <div className="card p-5 text-sm">
        <h3 className="h2">Automatic score</h3>
        <p className="muted mt-1">Automatic scoring needs a recorded answer with a transcript of at least about 25 words — it measures your speaking speed, vocabulary, grammar and clarity. If no transcript appeared, use Chrome or Edge on a computer. Typed answers can still be rated with the descriptors below or the AI examiner.</p>
      </div>
    );
  return (
    <div className="card p-5" aria-labelledby="auto-score">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="auto-score" className="h2">
          Automatic score
        </h3>
        <BandBadge band={auto.band} label="estimated band" />
      </div>
      <p className="muted mt-1 text-xs">
        Scored instantly on this device from your transcript ({auto.words} words, {auto.wpm} wpm){auto.pronunciationMeasured ? ' and speech-recognition clarity' : ''}. Saved to your progress (counts half as much as an examiner-style rating). Chấm tự động chỉ mang tính tham khảo — kết hợp tự chấm hoặc AI để chính xác hơn.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {CRIT.map(([k, name]) => (
          <div key={k} className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
            <div className="flex items-center justify-between font-semibold">
              {name} <BandBadge band={auto[k].band} size="sm" />
            </div>
            <ul className="mt-2 list-disc space-y-0.5 pl-5">
              {auto[k].notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
