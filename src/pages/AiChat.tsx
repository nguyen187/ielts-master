import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Markdown, PageHeader, Tabs } from '../components/ui';
import { useAiAvailable } from '../lib/ai';
import { IS_ARTIFACT } from '../lib/artifact';
import { MODES, chatReply, loadChat, saveChat, speak, stopSpeaking, type ChatMode, type ChatMsg } from '../lib/chat';
import { createRecognizer, recognitionSupported } from '../lib/speech';
import { useStore } from '../lib/store';

/** Pause (ms) after the learner stops talking before the answer is sent in a voice conversation. */
export const SILENCE_MS = 2200;

export default function AiChat() {
  const apiKey = useStore((s) => s.settings.apiKey);
  const ai = useAiAvailable();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<ChatMode>(() => (['examiner', 'partner', 'tutor'].includes(params.get('mode') ?? '') ? (params.get('mode') as ChatMode) : 'examiner'));
  const [history, setHistory] = useState<ChatMsg[]>(() => loadChat(mode));
  const [draft, setDraftState] = useState('');
  const [pending, setPending] = useState<string | null>(null); // the reply streaming in
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [autoRead, setAutoRead] = useState(false);
  const [live, setLive] = useState(false); // hands-free voice conversation running
  const liveRef = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const asr = useRef<ReturnType<typeof createRecognizer>>(null);
  const before = useRef('');
  const draftRef = useRef('');
  const lastHeard = useRef(0);
  const bottom = useRef<HTMLDivElement>(null);
  const micOk = !IS_ARTIFACT && recognitionSupported();
  const busy = pending !== null;
  const shown: ChatMsg[] = [{ role: 'assistant', content: MODES[mode].opener }, ...history];
  const setDraft = (v: string) => {
    draftRef.current = v;
    setDraftState(v);
  };

  useEffect(() => {
    bottom.current?.scrollIntoView?.({ block: 'end' });
  }, [history, pending]);
  useEffect(() => () => {
    liveRef.current = false;
    abort.current?.abort();
    asr.current?.stop();
    stopSpeaking();
  }, []);

  // in a voice conversation, send the answer once the learner has been quiet for a moment
  const sendRef = useRef<() => void>(() => undefined);
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      if (asr.current && draftRef.current.trim() && Date.now() - lastHeard.current > SILENCE_MS) sendRef.current();
    }, 300);
    return () => clearInterval(t);
  }, [live]);

  function endConversation() {
    liveRef.current = false;
    setLive(false);
    stopMic();
    stopSpeaking();
    setSpeakingIdx(null);
  }

  function switchMode(m: ChatMode) {
    if (m === mode) return;
    endConversation();
    abort.current?.abort();
    setMode(m);
    setHistory(loadChat(m));
    setPending(null);
    setError(null);
    setDraft('');
  }

  function startMic() {
    if (asr.current) return;
    before.current = draftRef.current.trim() ? `${draftRef.current.trim()} ` : '';
    lastHeard.current = Date.now();
    const r = createRecognizer(
      (final, interim) => {
        lastHeard.current = Date.now();
        setDraft(`${before.current}${final}${interim ? ` ${interim}` : ''}`);
      },
      (msg) => {
        setError(msg);
        asr.current = null;
        setListening(false);
        liveRef.current = false;
        setLive(false);
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

  /** Voice conversation: the AI says its message, then the mic opens for the learner's answer. */
  function sayThenListen(text: string, idx: number) {
    stopMic();
    if (!liveRef.current) return;
    const listen = () => {
      setSpeakingIdx((cur) => (cur === idx ? null : cur));
      if (liveRef.current) startMic();
    };
    if (speak(text, listen)) setSpeakingIdx(idx);
    else listen();
  }

  function startConversation() {
    setError(null);
    liveRef.current = true;
    setLive(true);
    const last = shown[shown.length - 1];
    if (last.role === 'assistant') sayThenListen(last.content, shown.length - 2);
    else startMic();
  }

  /** Stop the AI talking and let the learner answer straight away. */
  function interrupt() {
    stopSpeaking();
    setSpeakingIdx(null);
    if (liveRef.current) startMic();
  }

  function readAloud(i: number, text: string) {
    if (speakingIdx === i) {
      stopSpeaking();
      setSpeakingIdx(null);
      return;
    }
    if (speak(text, () => setSpeakingIdx((cur) => (cur === i ? null : cur)))) setSpeakingIdx(i);
  }

  async function send(text = draftRef.current, base = history) {
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
    try {
      const reply = (await chatReply({ mode, history: next, apiKey, signal: ctrl.signal, onText: (t) => !ctrl.signal.aborted && setPending(t) })).trim();
      if (ctrl.signal.aborted) return;
      const done: ChatMsg[] = reply ? [...next, { role: 'assistant', content: reply }] : next;
      setHistory(done);
      saveChat(mode, done);
      if (liveRef.current) {
        if (reply) sayThenListen(reply, done.length - 1);
        else startMic();
      } else if (reply && autoRead && speak(reply, () => setSpeakingIdx(null))) setSpeakingIdx(done.length - 1);
    } catch (e) {
      if (ctrl.signal.aborted) return;
      endConversation();
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      if (abort.current === ctrl) {
        abort.current = null;
        setPending(null);
      }
    }
  }
  sendRef.current = () => void send();

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
    endConversation();
    abort.current?.abort();
    abort.current = null;
    setPending(null);
    setError(null);
    setHistory([]);
    saveChat(mode, []);
  }

  const m = MODES[mode];
  const lastUser = [...history].reverse().find((x) => x.role === 'user');

  return (
    <div>
      <PageHeader
        title="Speak with AI"
        subtitle={
          IS_ARTIFACT
            ? 'A Speaking mock test with Claude as your examiner, a conversation partner, or a tutor — on your own Claude account. Thi thử Speaking với giám khảo AI.'
            : 'A Speaking mock test by voice with Claude as your examiner: it asks out loud, you answer into the mic. Thi thử Speaking bằng giọng nói với giám khảo AI.'
        }
        actions={
          <button className="btn-secondary" onClick={newChat} disabled={!history.length && !busy}>
            ＋ {mode === 'examiner' ? 'New test' : 'New chat'}
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

        {mode !== 'tutor' && (
          <div className="border-t border-slate-200 p-4 dark:border-slate-700">
            {!micOk ? (
              <p className="muted text-sm">
                {IS_ARTIFACT ? (
                  <>
                    Artifacts on claude.ai cannot use the microphone, so here you answer by typing or with your keyboard’s dictation. For the full voice test (AI hỏi bằng giọng, bạn trả lời bằng micro), use the web version:{' '}
                    <a className="font-semibold text-brand-600 underline" href="https://nguyen187.github.io/ielts-master/" target="_blank" rel="noreferrer">
                      nguyen187.github.io/ielts-master
                    </a>
                  </>
                ) : (
                  'Voice conversation needs Chrome, Edge or Safari. Hội thoại bằng giọng nói cần Chrome, Edge hoặc Safari.'
                )}
              </p>
            ) : !live ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <button className="btn-primary px-6 py-3 text-base" onClick={startConversation} disabled={!ai.available || busy}>
                  🎙️ {mode === 'examiner' ? (history.length ? 'Continue the speaking test' : 'Start the speaking test') : history.length ? 'Continue talking' : 'Start talking'}
                </button>
                <p className="muted max-w-md text-xs">
                  AI đọc câu hỏi thành tiếng, bạn trả lời bằng micro. Ngừng nói khoảng 2 giây là câu trả lời tự gửi. Nên dùng tai nghe để micro không thu tiếng AI.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2" role="status">
                <span className="flex items-center gap-2 font-medium">
                  {speakingIdx !== null ? (
                    <>🔊 {mode === 'examiner' ? 'Examiner is speaking…' : 'AI is speaking…'}</>
                  ) : busy ? (
                    <>💭 Thinking…</>
                  ) : listening ? (
                    <>
                      <span className="h-3 w-3 animate-pulse rounded-full bg-rose-600" aria-hidden /> Listening — speak now
                      <span className="muted text-xs font-normal">(sends after a short pause)</span>
                    </>
                  ) : (
                    'Paused'
                  )}
                </span>
                <span className="flex-1" />
                {speakingIdx !== null && (
                  <button className="btn-secondary" onClick={interrupt}>
                    ⏭ Answer now
                  </button>
                )}
                {listening && draft.trim() && (
                  <button className="btn-primary" onClick={() => void send()}>
                    Send now ➤
                  </button>
                )}
                <button className="btn-secondary" onClick={endConversation}>
                  ■ End
                </button>
              </div>
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
            {micOk && !live && (
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
      {mode === 'examiner' && <p className="muted mt-3 text-xs">Say or type “end test” at any time to finish and get your estimated band. Nói hoặc gõ “end test” để kết thúc và nhận nhận xét, band ước tính.</p>}
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
