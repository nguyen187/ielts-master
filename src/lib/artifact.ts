/**
 * The claude.ai Artifact build (`npm run build:artifact`). Inside a Claude viewer the page can ask
 * Claude on the viewer's own account (`sample`) and keep each learner's progress in the artifact's
 * private per-user store (`db` + `user`). Every capability may be absent: the app then falls back
 * to the normal offline behaviour.
 */
import { useSyncExternalStore } from 'react';

export const IS_ARTIFACT = import.meta.env.VITE_TARGET === 'artifact';

/* ---- minimal typings for the runtime capabilities used here ---- */
export interface SampleError {
  code: string;
  message: string;
  text?: string;
}
export interface SampleFn {
  (input: string, options?: Record<string, unknown>): Promise<{ text: string; truncated: boolean }>;
  json<T = unknown>(input: string, options?: Record<string, unknown>): Promise<T>;
}
interface DocSnap {
  exists: boolean;
  data(): Record<string, unknown> | undefined;
}
interface DocRef {
  get(): Promise<DocSnap>;
  set(data: Record<string, unknown>): Promise<void>;
  delete(): Promise<void>;
}
export interface DB {
  doc(path: string): DocRef;
}
export interface UserNs {
  id(): Promise<string>;
}
type ClaudeWindow = { claude?: { use(name: string): Promise<unknown> } };

function use<T>(name: string): Promise<T | null> {
  if (!IS_ARTIFACT) return Promise.resolve(null);
  const c = (window as unknown as ClaudeWindow).claude;
  if (!c?.use) return Promise.resolve(null);
  return c.use(name).then((x) => (x as T) ?? null, () => null);
}

/* ---- Claude availability (observable so the UI can light up AI buttons) ---- */
type AiState = 'checking' | 'ready' | 'unavailable' | 'denied';
let aiState: AiState = IS_ARTIFACT ? 'checking' : 'unavailable';
let sampleFn: SampleFn | null = null;
const aiListeners = new Set<() => void>();
const setAi = (s: AiState) => {
  aiState = s;
  aiListeners.forEach((l) => l());
};

let started = false;
/** Resolve capabilities once at start-up. */
export function initArtifact() {
  if (!IS_ARTIFACT || started) return;
  started = true;
  void use<SampleFn>('sample').then((s) => {
    sampleFn = s;
    setAi(s ? 'ready' : 'unavailable');
  });
}

export function useClaudeAi(): AiState {
  return useSyncExternalStore(
    (l) => {
      aiListeners.add(l);
      return () => {
        aiListeners.delete(l);
      };
    },
    () => aiState,
    () => aiState,
  );
}

export function claudeSample(): SampleFn | null {
  return sampleFn;
}

/** A viewer who declined (or whose account can't use Claude here) won't be asked again this view. */
export function markClaudeDenied() {
  setAi('denied');
}

export function isSampleError(e: unknown): e is SampleError {
  return !!e && typeof e === 'object' && 'code' in e && typeof (e as SampleError).code === 'string';
}

export function describeSampleError(e: SampleError): string {
  switch (e.code) {
    case 'not_granted':
    case 'sampling_disabled':
    case 'not_declared':
    case 'capability_disabled':
    case 'capability_removed':
      return 'Claude is not allowed for this page on your account. You can still use the automatic score and the band descriptors.';
    case 'rate_limited':
      return 'You have reached your Claude usage limit for now. Try again later.';
    case 'session_expired':
      return 'Your Claude session expired. Sign in to claude.ai again, then retry.';
    case 'refused':
      return 'Claude declined to assess this text. Check that it is your own answer to the question.';
    case 'invalid_json':
    case 'empty_completion':
      return 'Claude’s answer could not be read. Press the button to try again.';
    case 'prompt_too_large':
      return 'This answer is too long to assess in one go.';
    case 'cancelled':
      return 'Stopped.';
    default:
      return 'Claude could not be reached. Check your connection and try again.';
  }
}

export const getDb = () => use<DB>('db');
export const getUser = () => use<UserNs>('user');
