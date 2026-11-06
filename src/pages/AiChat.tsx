import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Markdown, PageHeader, Tabs } from '../components/ui';
import { useAiAvailable } from '../lib/ai';
import { IS_ARTIFACT } from '../lib/artifact';
import { MODES, chatReply, loadChat, saveChat, speak, stopSpeaking, type ChatMode, type ChatMsg } from '../lib/chat';
import { createRecognizer, recognitionSupported } from '../lib/speech';
import { useStore } from '../lib/store';

export default function AiChat() {
  const apiKey = useStore((s) => s.settings.apiKey);
  const ai = useAiAvailable();
  const [mode, setMode] = useState<ChatMode>('partner');
  const [history, setHistory] = useState<ChatMsg[]>(() => loadChat('partner'));
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState<string | null>(null); // the reply streaming in
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [autoRead, setAutoRead] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const asr = useRef<ReturnType<typeof createRecognizer>>(null);
  const before = useRef('');
  const bottom = useRef<HTMLDivElement>(null);
  const micOk = !IS_ARTIFACT && recognitionSupported();
  const busy = pending !== null;

  useEffect(() => {
    bottom.current?.scrollIntoView?.({ block: 'end' });
  }, [history, pending]);
  useEffect(() => () => {
    abort.current?.abort();
    asr.current?.stop();
    stopSpeaking();
  }, []);

  function switchMode(m: ChatMode) {
    if (m === mode) return;
    abort.current?.abort();
    stopMic();
    stopSpeaking();
    setSpeakingIdx(null);
    setMode(m);
    setHistory(loadChat(m));
    setPending(null);
    setError(null);
    setDraft('');
  }

  function startMic() {
    if (listening) return;
    before.current = draft ? `${draft.trim()} ` : '';
    const r = createRecognizer(
      (final, interim) => setDraft(`${before.current}${final}${interim ? ` ${interim}` : ''}`),
      (msg) => {
        setError(msg);
        setListening(false);
      },
    );
    if (!r) return;
    asr.current = r;
    r.start();
    setListening(true);
  }
  function stopMic() {
    asr.current?.stop();
    asr.current = null;
    setListening(false);
  }

  function readAloud(i: number, text: string) {
    if (speakingIdx === i) {
      stopSpeaking();
      setSpeakingIdx(null);
      return;
    }
    if (speak(text, () => setSpeakingIdx((cur) => (cur === i ? null : cur)))) setSpeakingIdx(i);
  }

  async function send(text = draft, base = history) {
    const content = text.trim();
    if (!content || busy) return;
    stopMic();
    stopSpeaking();
    setSpeakingIdx(null);
    const next: ChatMsg[] = [...base, { role: 'user', content }];
    setHistory(next);
    saveChat(mode, next);
    setDraft('');
    setError(null);
    setPending('');
    const ctrl = new AbortController();
    abort.current = ctrl;
    const forMode = mode;
    try {
      const reply = (await chatReply({ mode, history: next, apiKey, signal: ctrl.signal, onText: (t) => !ctrl.signal.aborted && setPending(t) })).trim();
      if (ctrl.signal.aborted || forMode !== mode) return;
      const done: ChatMsg[] = reply ? [...next, { role: 'assistant', content: reply }] : next;
      setHistory(done);
      saveChat(mode, done);
      if (reply && autoRead && speak(reply, () => setSpeakingIdx(null))) setSpeakingIdx(done.length - 1);
    } catch (e) {
      if (ctrl.signal.aborted) return;
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      if (abort.current === ctrl) {
        abort.current = null;
        setPending(null);
      }
    }
  }

  function stopReply() {
    const partial = pending?.trim();
    abort.current?.abort();
    abort.current = null;
    setPending(null);
    if (partial) {
      const done: ChatMsg[] = [...history, { role: 'assistant', content: partial }];
      setHistory(done);
      saveChat(mode, done);
    }
  }

  function newChat() {
    abort.current?.abort();
    abort.current = null;
    stopMic();
    stopSpeaking();
    setSpeakingIdx(null);
    setPending(null);
    setError(null);
    setHistory([]);
    saveChat(mode, []);
  }

  const m = MODES[mode];
  const shown: ChatMsg[] = [{ role: 'assistant', content: m.opener }, ...history];
  const lastUser = [...history].reverse().find((x) => x.role === 'user');

  return (
    <div>
      <PageHeader
        title="Chat with AI"
        subtitle={
          IS_ARTIFACT
            ? 'Practise real conversation with Claude, on your own Claude account. Trò chuyện, thi thử Speaking hoặc hỏi bài.'
            : 'Practise real conversation with Claude using your own API key. Trò chuyện, thi thử Speaking hoặc hỏi bài.'
        }
        actions={
          <button className="btn-secondary" onClick={newChat} disabled={!history.length && !busy}>
            ＋ New chat
          </button>
        }
      />

      <Tabs tabs={(Object.keys(MODES) as ChatMode[]).map((id) => ({ id, label: `${MODES[id].icon} ${MODES[id].label}` }))} value={mode} onChange={switchMode} />
      <p className="muted mt-3 text-sm">{m.hint}</p>

      {!ai.available && (
        <div className="card mt-4 border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-700 dark:bg-amber-950/40">
          {IS_ARTIFACT ? (
            ai.state === 'checking' ? (
              'Connecting to Claude…'
            ) : (
              'Claude is not available here. Sign in to claude.ai and allow this page to use Claude when it asks (Cho phép trang dùng Claude khi được hỏi).'
            )
          ) : (
            <>
              To chat, add your own Anthropic API key in{' '}
              <Link to="/settings" className="font-semibold text-brand-600 underline">
                Settings
              </Link>
              . Key chỉ lưu trên máy bạn. Bản trên claude.ai dùng được mà không cần key.
            </>
          )}
        </div>
      )}

      <div className="card mt-4 flex flex-col">
        <div className="flex max-h-[60vh] min-h-[320px] flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
          {shown.map((msg, i) => (
            <Bubble key={i} msg={msg} speaking={speakingIdx === i - 1} onSpeak={() => readAloud(i - 1, msg.content)} />
          ))}
          {pending !== null && <Bubble msg={{ role: 'assistant', content: pending || '…' }} streaming />}
          {!history.length && !busy && (
            <div className="flex flex-wrap gap-2 pt-1">
              {m.starters.map((s) => (
                <button key={s} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" onClick={() => setDraft(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <div ref={bottom} />
        </div>

        {error && (
          <div role="alert" className="mx-4 mb-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            {error}{' '}
            {lastUser && !busy && history[history.length - 1]?.role === 'user' && (
              <button
                className="font-semibold underline"
                onClick={() => void send(lastUser.content, history.slice(0, -1))}
              >
                Try again
              </button>
            )}
          </div>
        )}

        <form
          className="flex flex-col gap-2 border-t border-slate-200 p-3 dark:border-slate-700"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <textarea
            aria-label="Your message"
            className="input min-h-[72px] w-full resize-y"
            placeholder={mode === 'tutor' ? 'Ask a question… (tiếng Việt hoặc English)' : listening ? 'Listening… speak now' : 'Type or speak your answer in English…'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            {micOk && (
              <button type="button" className={listening ? 'btn-primary bg-rose-600 hover:bg-rose-700' : 'btn-secondary'} onClick={listening ? stopMic : startMic}>
                {listening ? '■ Stop mic' : '🎤 Speak'}
              </button>
            )}
            <label className="muted flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={autoRead} onChange={(e) => setAutoRead(e.target.checked)} /> Read replies aloud
            </label>
            <span className="flex-1" />
            {busy ? (
              <button type="button" className="btn-secondary" onClick={stopReply}>
                ■ Stop
              </button>
            ) : (
              <button type="submit" className="btn-primary" disabled={!draft.trim() || !ai.available}>
                Send ➤
              </button>
            )}
          </div>
          <p className="muted text-xs">
            Enter to send · Shift+Enter for a new line.{' '}
            {IS_ARTIFACT
              ? 'To speak instead of typing, use dictation: the 🎤 key on a phone keyboard, Fn twice on a Mac, or Win+H on Windows.'
              : !micOk
                ? 'Voice input needs Chrome, Edge or Safari.'
                : ''}
          </p>
        </form>
      </div>
      {mode === 'examiner' && <p className="muted mt-3 text-xs">Type “end test” at any time to finish and get your estimated band. Viết “end test” để kết thúc và nhận nhận xét.</p>}
    </div>
  );
}

function Bubble({ msg, streaming, speaking, onSpeak }: { msg: ChatMsg; streaming?: boolean; speaking?: boolean; onSpeak?: () => void }) {
  const mine = msg.role === 'user';
  const [reply, fix] = mine ? [msg.content, ''] : splitFix(msg.content);
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] min-w-0 rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${mine ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'}`}>
        {mine ? <div className="whitespace-pre-wrap break-words">{reply}</div> : <Markdown text={reply} />}
        {fix && (
          <div className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-100">
            <Markdown text={fix} />
          </div>
        )}
        {!mine && !streaming && onSpeak && typeof window !== 'undefined' && 'speechSynthesis' in window && (
          <button className="mt-1 text-xs text-slate-500 hover:text-brand-600" onClick={onSpeak} aria-label={speaking ? 'Stop reading' : 'Read aloud'}>
            {speaking ? '■ Stop' : '🔊 Listen'}
          </button>
        )}
      </div>
    </div>
  );
}

/** Split the partner's "✏️ corrections" paragraph from the reply so it can be shown apart. */
export function splitFix(text: string): [string, string] {
  const i = text.indexOf('✏️');
  if (i <= 0) return [text, ''];
  return [text.slice(0, i).trim(), text.slice(i).trim()];
}
