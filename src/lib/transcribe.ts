/**
 * Offline speech-to-text for the claude.ai artifact, where the page cannot open the microphone.
 * The learner records with their device (phone recorder / Voice Memos / a video), gives the file
 * to the page, and Whisper (tiny.en, quantized) transcribes it here in the browser with
 * onnxruntime-web — no network, no API key.
 *
 * The model and the WebAssembly runtime are published next to the page under `whisper/`, split
 * into parts under the artifact's per-file limit (see scripts/build-artifact.mjs). `manifest.json`
 * maps each file to its parts.
 */
const MODEL = 'Xenova/whisper-tiny.en';
const WASM = 'ort-wasm-simd-threaded.wasm';

interface Manifest {
  files: Record<string, { parts: string[]; size: number }>;
}

export type TranscribeStage = 'loading' | 'decoding' | 'transcribing';
export type Progress = (stage: TranscribeStage, fraction?: number) => void;

const base = () => new URL('whisper/', document.baseURI).href;
let manifest: Promise<Manifest> | null = null;
const files = new Map<string, Promise<ArrayBuffer>>();
let loaded = 0;
let total = 0;
let onBytes: (() => void) | null = null;

function getManifest() {
  manifest ??= fetch(base() + 'manifest.json').then((r) => {
    if (!r.ok) throw new Error('The speech model files are missing from this page.');
    return r.json() as Promise<Manifest>;
  });
  return manifest;
}

/** One model or runtime file, put back together from its parts. */
function getFile(name: string): Promise<ArrayBuffer> {
  let p = files.get(name);
  if (!p) {
    p = (async () => {
      const m = (await getManifest()).files[name];
      if (!m) throw new Error(`Missing speech model file: ${name}`);
      const out = new Uint8Array(m.size);
      let at = 0;
      for (const part of m.parts) {
        const r = await fetch(base() + part);
        if (!r.ok) throw new Error('Could not load the speech model. Reload the page and try again.');
        const buf = new Uint8Array(await r.arrayBuffer());
        out.set(buf, at);
        at += buf.length;
        loaded += buf.length;
        onBytes?.();
      }
      return out.buffer;
    })();
    p.catch(() => files.delete(name));
    files.set(name, p);
  }
  return p;
}

type Pipe = (audio: Float32Array, opts: Record<string, unknown>) => Promise<{ text: string } | { text: string }[]>;
let pipe: Promise<Pipe> | null = null;

function loadModel(progress?: Progress): Promise<Pipe> {
  if (!pipe) {
    pipe = (async () => {
      const m = await getManifest();
      total = Object.values(m.files).reduce((s, f) => s + f.size, 0);
      const T = await import('@huggingface/transformers');
      const env = T.env;
      env.allowLocalModels = false;
      env.useBrowserCache = false;
      env.useCustomCache = true;
      // every model file comes from the parts published with the page
      env.customCache = {
        match: async (key: string) => {
          const name = Object.keys(m.files).find((f) => f !== WASM && key.endsWith(`/${f}`));
          if (!name) return undefined;
          return new Response(await getFile(name), { headers: { 'content-type': name.endsWith('.json') ? 'application/json' : 'application/octet-stream' } });
        },
        put: async () => undefined,
      } as never;
      const wasm = env.backends.onnx.wasm!;
      // transformers.js points the runtime at its CDN, which the artifact cannot load from: use the small
      // loader published with the page, and hand over the .wasm bytes put together from their parts
      wasm.wasmPaths = { mjs: base() + 'ort-wasm-simd-threaded.mjs' } as never;
      wasm.wasmBinary = await getFile(WASM);
      wasm.numThreads = 1; // no cross-origin isolation in the viewer, so no threads
      wasm.proxy = false;
      const p = await T.pipeline('automatic-speech-recognition', MODEL, { dtype: 'q8', device: 'wasm' });
      return p as unknown as Pipe;
    })();
    pipe.catch(() => {
      pipe = null;
    });
  }
  onBytes = () => progress?.('loading', total ? loaded / total : undefined);
  return pipe;
}

/** Decode any audio/video file the browser can play into 16 kHz mono samples. */
async function decode(file: Blob): Promise<Float32Array> {
  const data = await file.arrayBuffer();
  const Ctx = window.OfflineAudioContext || (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;
  const ctx = new Ctx(1, 16000, 16000);
  let audio: AudioBuffer;
  try {
    audio = await ctx.decodeAudioData(data);
  } catch {
    throw new Error('This file could not be read as audio. Try an .m4a, .mp3, .wav, .webm or a phone video.');
  }
  if (audio.numberOfChannels === 1) return audio.getChannelData(0);
  const a = audio.getChannelData(0);
  const b = audio.getChannelData(1);
  const mono = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) mono[i] = (a[i] + b[i]) / 2;
  return mono;
}

/** Start downloading the model early (e.g. when the voice panel opens) so the first answer is quicker. */
export function preloadTranscriber() {
  void loadModel().catch(() => undefined);
}

export async function transcribe(file: Blob, progress?: Progress): Promise<{ text: string; seconds: number }> {
  progress?.('decoding');
  const samples = await decode(file);
  const seconds = Math.round(samples.length / 16000);
  if (seconds < 1) throw new Error('The recording is empty.');
  progress?.('loading', total ? loaded / total : 0);
  const asr = await loadModel(progress);
  progress?.('transcribing');
  const out = await asr(samples, { chunk_length_s: 30, stride_length_s: 5 });
  const text = (Array.isArray(out) ? out.map((o) => o.text).join(' ') : out.text)
    .replace(/\[(BLANK_AUDIO|MUSIC|NOISE|SILENCE)\]|\((?:[^)]*)\)/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return { text, seconds };
}
