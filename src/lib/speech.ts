import type { ScriptLine, Speaker } from '../content/types';

/* ---------------- Text-to-speech for listening scripts ---------------- */

export const ttsSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

function voices(): SpeechSynthesisVoice[] {
  return ttsSupported() ? window.speechSynthesis.getVoices() : [];
}

export function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const v = voices();
    if (v.length) return resolve(v);
    if (!ttsSupported()) return resolve([]);
    const t = setTimeout(() => resolve(voices()), 1500);
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      clearTimeout(t);
      resolve(voices());
    }, { once: true });
  });
}

const FEMALE = /(female|woman|samantha|karen|moira|tessa|serena|kate|victoria|fiona|susan|zira|hazel|libby|sonia|natasha|catherine|allison|ava|jenny|aria|emma|amy|olivia|matilda|sara|nicky|kathy|veena)/i;
const MALE = /(male|man|daniel|alex|fred|oliver|thomas|arthur|george|ryan|guy|david|mark|james|william|liam|rishi|aaron|tom|gordon|lee|reed|eddy|rocko|ralph)/i;

/** Assign a distinct voice to each speaker, preferring accent + gender matches. */
export function assignVoices(speakers: Speaker[], all: SpeechSynthesisVoice[]): Record<string, SpeechSynthesisVoice | undefined> {
  const en = all.filter((v) => v.lang.toLowerCase().startsWith('en'));
  const used = new Set<string>();
  const out: Record<string, SpeechSynthesisVoice | undefined> = {};
  for (const sp of speakers) {
    const accent = sp.accent.toLowerCase().replace('_', '-');
    const gender = sp.voice === 'female' ? FEMALE : MALE;
    const other = sp.voice === 'female' ? MALE : FEMALE;
    const score = (v: SpeechSynthesisVoice) =>
      (v.lang.toLowerCase().replace('_', '-') === accent ? 4 : 0) + (gender.test(v.name) ? 3 : 0) - (other.test(v.name) ? 3 : 0) + (used.has(v.name) ? -5 : 0) + (/natural|neural|premium|enhanced|google/i.test(v.name) ? 1 : 0);
    const best = [...en].sort((a, b) => score(b) - score(a))[0];
    out[sp.name] = best;
    if (best) used.add(best.name);
  }
  return out;
}

export interface Player {
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Speak script lines in order. Different speakers get different voices and, when
 * voices are scarce, different pitch so they remain distinguishable.
 */
export function playScript(
  lines: ScriptLine[],
  speakers: Speaker[],
  opts: { rate: number; startAt?: number; onLine?: (i: number) => void; onEnd?: () => void },
): Player {
  const synth = window.speechSynthesis;
  synth.cancel();
  let stopped = false;
  const all = voices();
  const map = assignVoices(speakers, all);
  const pitchFor = (name: string) => {
    const idx = speakers.findIndex((s) => s.name === name);
    const sp = speakers[idx];
    const sameVoice = speakers.some((o, j) => j !== idx && map[o.name]?.name === map[name]?.name);
    if (!sameVoice) return 1;
    return sp?.voice === 'female' ? 1.25 : 0.8;
  };
  let i = opts.startAt ?? 0;
  const next = () => {
    if (stopped) return;
    if (i >= lines.length) {
      opts.onEnd?.();
      return;
    }
    const line = lines[i];
    const u = new SpeechSynthesisUtterance(line.text);
    const v = map[line.speaker];
    if (v) {
      u.voice = v;
      u.lang = v.lang;
    } else u.lang = 'en-GB';
    u.rate = opts.rate;
    u.pitch = pitchFor(line.speaker);
    const idx = i;
    u.onstart = () => opts.onLine?.(idx);
    u.onend = () => {
      i++;
      // short natural pause between turns
      setTimeout(next, 350);
    };
    u.onerror = () => {
      i++;
      setTimeout(next, 50);
    };
    synth.speak(u);
  };
  next();
  return {
    stop: () => {
      stopped = true;
      synth.cancel();
    },
    pause: () => synth.pause(),
    resume: () => synth.resume(),
  };
}

export function speak(text: string, rate = 0.95, lang = 'en-GB') {
  if (!ttsSupported()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  const v = voices().find((x) => x.lang === lang) ?? voices().find((x) => x.lang.startsWith('en'));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

/* ---------------- Speech recognition (speaking practice) ---------------- */

interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string; confidence?: number } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}

export function recognitionSupported() {
  const w = window as unknown as Record<string, unknown>;
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

const FATAL_ASR: Record<string, string> = {
  'not-allowed': 'Microphone access was blocked, so there is no live transcript. Type what you said instead.',
  'service-not-allowed': 'Live transcript is not allowed in this browser. Type what you said instead.',
  'audio-capture': 'No microphone was found. Type what you said instead.',
  network: 'Live transcript needs an internet connection (it uses the browser’s online speech service). Type what you said instead.',
  'language-not-supported': 'This browser cannot transcribe English here. Type what you said instead.',
};

export function createRecognizer(
  onText: (finalText: string, interim: string) => void,
  onFatal?: (message: string) => void,
  onConfidence?: (confidence: number, words: number) => void,
): { start: () => void; stop: () => void } | null {
  const w = window as unknown as Record<string, new () => RecognitionLike>;
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const r = new Ctor();
  r.lang = 'en-GB';
  r.continuous = true;
  r.interimResults = true;
  let finalText = '';
  let active = false;
  r.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i];
      if (res.isFinal) {
        finalText += res[0].transcript.trim() + ' ';
        const c = res[0].confidence;
        // some browsers report 0 when they have no estimate — ignore those
        if (c && c > 0) onConfidence?.(c, res[0].transcript.trim().split(/\s+/).length);
      }
      else interim += res[0].transcript;
    }
    onText(finalText.trim(), interim);
  };
  r.onend = () => {
    if (active) {
      try {
        r.start(); // Chrome stops after silence — keep listening until the user stops
      } catch {
        /* already started */
      }
    }
  };
  // 'no-speech' and 'aborted' are normal (silence / stop); anything else would loop forever via onend
  r.onerror = (e) => {
    const msg = FATAL_ASR[e.error];
    if (!msg) return;
    active = false;
    onFatal?.(msg);
  };
  return {
    start: () => {
      active = true;
      finalText = '';
      try {
        r.start();
      } catch {
        /* ignore */
      }
    },
    stop: () => {
      active = false;
      try {
        r.stop();
      } catch {
        /* not started */
      }
    },
  };
}

/* ---------------- Audio recording ---------------- */

export async function startRecording(): Promise<{ stop: () => Promise<string>; cancel: () => void } | null> {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') return null;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream);
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  rec.start();
  const release = () => stream.getTracks().forEach((t) => t.stop());
  return {
    stop: () =>
      new Promise((resolve) => {
        rec.onstop = () => {
          release();
          resolve(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })));
        };
        rec.stop();
      }),
    cancel: () => {
      rec.stop();
      release();
    },
  };
}
