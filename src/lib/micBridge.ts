/**
 * A real microphone for the claude.ai artifact. The artifact's frame may not open the microphone, so it
 * opens a small companion window (public/mic.html, served by the web build) that may: there the questions
 * are read aloud and the learner's answer is recognised live; the words come back here by postMessage,
 * Claude answers here (on the viewer's account), and the reply goes back to be spoken.
 */
export const MIC_URL = 'https://nguyen187.github.io/ielts-master/mic.html';
const APP = 'ielts-mic';

export type MicState = 'idle' | 'speaking' | 'listening' | 'thinking' | 'paused';
export interface MicEvents {
  onLinked?: () => void; // the window is open and talking to us
  onReady?: () => void; // the learner allowed the microphone
  onState?: (s: MicState) => void;
  onInterim?: (text: string) => void;
  onAnswer?: (text: string, confidence: number | null) => void;
  onAudio?: (blob: Blob) => void; // browsers without speech recognition send the recording instead
  onError?: (message: string) => void;
  onClosed?: () => void;
}

export interface MicWindow {
  say: (text: string, opts?: { wait?: number; listen?: boolean }) => void;
  listen: (wait?: number) => void;
  thinking: (text?: string) => void;
  stop: (text?: string) => void;
  focus: () => void;
  close: () => void;
  isOpen: () => boolean;
  ready: () => boolean;
}

/** Must be called straight from a click, or the browser blocks the window. Returns null when it was blocked. */
export function openMicWindow(ev: MicEvents, url = MIC_URL): MicWindow | null {
  let w: Window | null = null;
  try {
    w = window.open(url, 'ielts-master-mic', 'popup,width=440,height=680');
  } catch {
    w = null;
  }
  if (!w) return null;
  let linked = false;
  let isReady = false;
  let queued: Record<string, unknown> | null = null;
  const post = (msg: Record<string, unknown>) => {
    if (!isReady && msg.type !== 'welcome') {
      queued = msg; // keep only the latest request until the learner has allowed the microphone
      return;
    }
    try {
      w?.postMessage({ app: APP, ...msg }, '*');
    } catch {
      /* closed */
    }
  };
  const onMessage = (e: MessageEvent) => {
    if (e.source !== w) return;
    const d = e.data as { app?: string; type?: string; [k: string]: unknown };
    if (!d || d.app !== APP) return;
    switch (d.type) {
      case 'hello':
        post({ type: 'welcome' });
        if (!linked) {
          linked = true;
          ev.onLinked?.();
        }
        break;
      case 'ready':
        isReady = true;
        ev.onReady?.();
        if (queued) {
          const q = queued;
          queued = null;
          post(q);
        }
        break;
      case 'state':
        ev.onState?.(d.state as MicState);
        break;
      case 'interim':
        ev.onInterim?.(String(d.text ?? ''));
        break;
      case 'answer':
        ev.onAnswer?.(String(d.text ?? ''), typeof d.confidence === 'number' ? d.confidence : null);
        break;
      case 'audio':
        if (d.blob instanceof Blob) ev.onAudio?.(d.blob);
        break;
      case 'error':
        ev.onError?.(String(d.message ?? 'Microphone error'));
        break;
      case 'closed':
        cleanup();
        break;
    }
  };
  window.addEventListener('message', onMessage);
  const poll = setInterval(() => {
    if (w?.closed) cleanup();
  }, 1000);
  let gone = false;
  function cleanup() {
    if (gone) return;
    gone = true;
    clearInterval(poll);
    window.removeEventListener('message', onMessage);
    ev.onClosed?.();
  }
  return {
    say: (text, o) => post({ type: 'say', text, wait: o?.wait, listen: o?.listen }),
    listen: (wait) => post({ type: 'listen', wait }),
    thinking: (text) => post({ type: 'thinking', text }),
    stop: (text) => post({ type: 'stop', text }),
    focus: () => {
      try {
        w?.focus();
      } catch {
        /* ignore */
      }
    },
    close: () => {
      try {
        w?.postMessage({ app: APP, type: 'close' }, '*');
        w?.close();
      } catch {
        /* ignore */
      }
      cleanup();
    },
    isOpen: () => !gone && !w?.closed,
    ready: () => isReady,
  };
}
