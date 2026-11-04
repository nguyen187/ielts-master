import { useEffect, useRef, useState } from 'react';
import type { ListeningSection } from '../content/types';
import { playScript, ttsSupported, waitForVoices, type Player } from '../lib/speech';
import { useStore } from '../lib/store';
import { ProgressBar } from './ui';

/**
 * Plays a listening section with browser text-to-speech.
 * examMode: plays once, no pause / replay (like the real test).
 */
export function ListeningPlayer({ section, examMode, autoStart, onEnded, prepSeconds = 0 }: { section: ListeningSection; examMode: boolean; autoStart?: boolean; onEnded?: () => void; prepSeconds?: number }) {
  const rate = useStore((s) => s.settings.speechRate);
  const [state, setState] = useState<'idle' | 'prep' | 'playing' | 'paused' | 'ended'>('idle');
  const [line, setLine] = useState(0);
  const [prepLeft, setPrepLeft] = useState(prepSeconds);
  const player = useRef<Player | null>(null);
  const ended = useRef(onEnded);
  ended.current = onEnded;
  const supported = ttsSupported();

  useEffect(() => () => {
    player.current?.stop();
  }, []);
  useEffect(() => {
    player.current?.stop();
    setState('idle');
    setLine(0);
    setPrepLeft(prepSeconds);
  }, [section.id, prepSeconds]);

  const begin = async (from = 0) => {
    await waitForVoices();
    setState('playing');
    player.current = playScript(section.script, section.speakers, {
      rate,
      startAt: from,
      onLine: setLine,
      onEnd: () => {
        setState('ended');
        ended.current?.();
      },
    });
  };

  const start = () => {
    if (prepSeconds > 0) {
      setState('prep');
      setPrepLeft(prepSeconds);
    } else void begin(0);
  };

  useEffect(() => {
    if (state !== 'prep') return;
    if (prepLeft <= 0) {
      void begin(0);
      return;
    }
    const t = setTimeout(() => setPrepLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, prepLeft]);

  useEffect(() => {
    if (autoStart && state === 'idle' && supported) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, section.id]);

  if (!supported)
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-800 dark:bg-amber-950/40">
        Your browser does not support speech playback. Use a recent Chrome, Edge or Safari — or open the transcript and read it as a reading exercise.
        {onEnded && (
          <button className="btn-secondary ml-2" onClick={onEnded}>
            Continue
          </button>
        )}
      </div>
    );

  return (
    <div className="card flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {state === 'playing' ? '🔊' : '🎧'}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">
            Part {section.part}: {section.title}
          </div>
          <div className="muted text-xs">
            {state === 'prep' ? `Read the questions — audio starts in ${prepLeft}s` : state === 'ended' ? 'Recording finished' : state === 'playing' ? 'Playing…' : state === 'paused' ? 'Paused' : examMode ? 'Exam mode: the recording plays once only' : 'Practice mode: you can pause and replay'}
          </div>
        </div>
        {state === 'idle' && (
          <button className="btn-primary" onClick={start}>
            ▶ Play
          </button>
        )}
        {state === 'prep' && (
          <button className="btn-secondary" onClick={() => void begin(0)}>
            Start now
          </button>
        )}
        {!examMode && state === 'playing' && (
          <button
            className="btn-secondary"
            onClick={() => {
              player.current?.stop();
              setState('paused');
            }}
          >
            ⏸ Pause
          </button>
        )}
        {!examMode && state === 'paused' && (
          <button className="btn-primary" onClick={() => void begin(line)}>
            ▶ Resume
          </button>
        )}
        {!examMode && (state === 'playing' || state === 'paused') && (
          <button
            className="btn-ghost"
            onClick={() => {
              player.current?.stop();
              void begin(Math.max(0, line - 2));
            }}
          >
            ↺ Back
          </button>
        )}
        {!examMode && state === 'ended' && (
          <button className="btn-secondary" onClick={() => void begin(0)}>
            ↻ Replay
          </button>
        )}
      </div>
      <ProgressBar value={state === 'ended' ? section.script.length : line} max={section.script.length} />
    </div>
  );
}

export function Transcript({ section, highlight = [] }: { section: ListeningSection; highlight?: string[] }) {
  const terms = highlight.filter((h) => h.trim().length > 1).map((h) => h.trim());
  const re = terms.length ? new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi') : null;
  return (
    <div className="space-y-2 text-sm leading-7">
      {section.script.map((l, i) => (
        <p key={i}>
          <span className="mr-2 font-semibold text-brand-700 dark:text-brand-300">{l.speaker}:</span>
          {re
            ? l.text.split(re).map((part, j) =>
                terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
                  <mark key={j} className="hl">
                    {part}
                  </mark>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )
            : l.text}
        </p>
      ))}
    </div>
  );
}
