import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Markdown, PageHeader, Tabs } from '../components/ui';
import { useAiAvailable } from '../lib/ai';
import { IS_ARTIFACT } from '../lib/artifact';
import { CRITERIA, MODES, chatReply, loadChat, loadReport, saveChat, saveReport, scoreSpeaking, speak, stopSpeaking, type ChatMode, type ChatMsg, type CriterionKey, type SpeakingReport } from '../lib/chat';
import { openMicWindow, type MicState, type MicWindow } from '../lib/micBridge';
import { createRecognizer, recognitionSupported } from '../lib/speech';
import { useStore } from '../lib/store';

/** Pause (ms) after the learner stops talking before the answer is sent in a voice conversation. */
export const SILENCE_MS = 2200;
/** On claude.ai the answer arrives through the system's dictation, which writes in bursts: wait a little longer. */
export const DICTATION_SILENCE_MS = 3000;
/** A Part 2 long turn has natural thinking pauses: wait longer after a cue card. */
const CUE_CARD = /you should say|one minute to prepare|talk for (up to )?(one|two|1|2) minutes?/i;
const waitAfter = (ask: string, base: number) => (CUE_CARD.test(ask) ? 6000 : base);
const ENDS_TEST = /\b(end (the )?test|finish (the )?test)\b|kết thúc/i;

// a phone can hand the page a fresh recording from its recorder or camera; a computer can only pick a file
const UA = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const IS_IOS = /iPhone|iPad|iPod/.test(UA) || (/Macintosh/.test(UA) && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1);
const IS_PHONE = IS_IOS || /Android|Mobile/.test(UA);

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
  const box = useRef<HTMLTextAreaElement>(null);
  const fileIn = useRef<HTMLInputElement>(null);
  const [stt, setStt] = useState<string | null>(null); // offline transcription in progress
  const dictating = useRef(false); // artifact: waiting for the learner's dictated answer in the text box
  // claude.ai: the real microphone lives in a companion window (see lib/micBridge)
  const mic = useRef<MicWindow | null>(null);
  const [micState, setMicState] = useState<MicState | 'opening' | null>(null);
  const clarity = useRef<number[]>([]);
  const micLinked = useRef(false);
  const [report, setReport] = useState<SpeakingReport | null>(() => loadReport(mode));
  const [scoring, setScoring] = useState(false);
  const micOk = !IS_ARTIFACT && recognitionSupported();
  // artifacts cannot open the microphone themselves, but the system's dictation (Fn Fn on a Mac, the 🎤 key on a
  // phone, Win+H) types speech into the box — so the voice conversation still works there
  const voiceOk = micOk || IS_ARTIFACT;
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
    mic.current?.close();
  }, []);

  // in a voice conversation, send the answer once the learner has been quiet for a moment
  const sendRef = useRef<() => void>(() => undefined);
  const lastAsk = useRef('');
  lastAsk.current = pending ?? shown[shown.length - 1]?.content ?? '';
  const busyRef = useRef(false);
  busyRef.current = busy;
  const lastVal = useRef('');
  const composing = useRef(false);
  const [heard, setHeard] = useState<{ words: number; sendIn: number | null; idle: number }>({ words: 0, sendIn: null, idle: 0 });
  useEffect(() => {
    if (!live) return;
    lastVal.current = '';
    const t = setInterval(() => {
      if (busyRef.current || mic.current) return;
      // read the box itself: dictation can write into it without the events React listens to
      const val = IS_ARTIFACT ? (box.current?.value ?? '') : draftRef.current;
      if (val !== lastVal.current) {
        lastVal.current = val;
        lastHeard.current = Date.now();
        if (val !== draftRef.current) setDraft(val);
        // the learner started answering while the AI was still talking: stop talking and listen
        if (val.trim() && !dictating.current && !asr.current && IS_ARTIFACT) {
          stopSpeaking();
          setSpeakingIdx(null);
          dictating.current = true;
          setListening(true);
        }
      }
      const listeningNow = !!(asr.current || dictating.current);
      // a Part 2 long turn has natural thinking pauses: wait longer after a cue card
      const wait = waitAfter(lastAsk.current, IS_ARTIFACT ? DICTATION_SILENCE_MS : SILENCE_MS);
      const quiet = Date.now() - lastHeard.current;
      const text = val.trim();
      setHeard({ words: text ? text.split(/\s+/).length : 0, sendIn: text && listeningNow ? Math.max(0, Math.ceil((wait - quiet) / 1000)) : null, idle: listeningNow && !text ? Math.floor(quiet / 1000) : 0 });
      if (!listeningNow || !text || quiet <= wait) return;
      if (composing.current) {
        box.current?.blur(); // commits the dictation's pending text; sent on the next tick
        composing.current = false;
        return;
      }
      sendRef.current();
    }, 300);
    return () => clearInterval(t);
  }, [live]);

  function endConversation() {
    liveRef.current = false;
    setLive(false);
    const w = mic.current;
    mic.current = null;
    setMicState(null);
    w?.close();
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
    setReport(loadReport(m));
    setPending(null);
    setError(null);
    setDraft('');
  }

  function startMic() {
    if (IS_ARTIFACT) {
      dictating.current = true;
      lastHeard.current = Date.now();
      setListening(true);
      box.current?.focus();
      return;
    }
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
    dictating.current = false;
    asr.current?.stop();
    asr.current = null;
    setListening(false);
  }

  /** Voice conversation: the AI says its message, then the mic opens for the learner's answer. */
  function sayThenListen(text: string, idx: number) {
    stopMic();
    if (!liveRef.current) return;
    if (mic.current) {
      mic.current.say(text, { wait: waitAfter(text, SILENCE_MS) });
      setSpeakingIdx(idx);
      return;
    }
    const listen = () => {
      setSpeakingIdx((cur) => (cur === idx ? null : cur));
      if (liveRef.current && !busyRef.current) startMic();
    };
    if (speak(text, listen)) setSpeakingIdx(idx);
    else listen();
  }

  /** A recording made with the device (no microphone access on claude.ai): transcribe it here, then send it. */
  async function onRecording(file: Blob) {
    stopSpeaking();
    setSpeakingIdx(null);
    setError(null);
    setStt('Reading your recording…');
    try {
      const { transcribe } = await import('../lib/transcribe');
      const { text } = await transcribe(file, (stage, frac) =>
        setStt(
          stage === 'loading'
            ? `Loading the speech recogniser — first time only${frac !== undefined ? ` (${Math.round(frac * 100)}%)` : ''}…`
            : stage === 'decoding'
              ? 'Reading your recording…'
              : 'Turning your speech into text…',
        ),
      );
      setStt(null);
      if (!text) {
        setError('No words were recognised in that recording. Speak a little louder and closer to the phone, then try again.');
        return;
      }
      void send(draftRef.current.trim() ? `${draftRef.current.trim()} ${text}` : text);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not transcribe that recording.');
    } finally {
      setStt(null);
    }
  }
  const recordButton = (big = false) => (
    <button type="button" className={big ? 'btn-primary px-5 py-3 text-base' : 'btn-secondary'} onClick={() => fileIn.current?.click()} disabled={!!stt || busy || !ai.available}>
      {IS_PHONE ? '🎙️ Record answer' : '📁 Upload a recording'}
    </button>
  );

  /** The question to put to the learner when the voice conversation (re)starts. */
  function resume() {
    const last = shown[shown.length - 1];
    if (last.role === 'assistant') sayThenListen(last.content, shown.length - 2);
    else if (mic.current) mic.current.listen(SILENCE_MS);
    else startMic();
  }

  /** claude.ai: open the microphone window. Must run straight from the click. */
  function openMic(): boolean {
    const w = openMicWindow({
      onLinked: () => {
        micLinked.current = true;
      },
      onReady: () => {
        setMicState('idle');
        if (liveRef.current && !busyRef.current) latest.current.resume();
      },
      onState: (st) => {
        setMicState(st);
        if (st !== 'speaking') setSpeakingIdx(null);
        setListening(st === 'listening');
      },
      onInterim: (t) => setDraft(t),
      onAnswer: (t, conf) => {
        if (conf) clarity.current.push(conf);
        if (t.trim()) void latest.current.send(t);
        else mic.current?.listen();
      },
      onAudio: (b) => void latest.current.onRecording(b),
      onError: (msg) => setError(msg),
      onClosed: () => {
        if (mic.current !== w) return;
        mic.current = null;
        setMicState(null);
        liveRef.current = false;
        setLive(false);
        setListening(false);
        setSpeakingIdx(null);
      },
    });
    if (!w) return false;
    mic.current = w;
    setMicState('opening');
    micLinked.current = false;
    // no word from the window: it lost its link back to this page
    setTimeout(() => {
      if (mic.current === w && !micLinked.current)
        setError('Cửa sổ micro đã mở nhưng không kết nối được với app. Đóng nó, rồi bấm lại nút bắt đầu. Nếu vẫn lỗi, dùng đọc chính tả như hướng dẫn.');
    }, 6000);
    return true;
  }

  function startConversation() {
    setError(null);
    if (IS_ARTIFACT) {
      liveRef.current = true;
      setLive(true);
      if (mic.current?.isOpen()) {
        mic.current.focus();
        if (mic.current.ready()) resume();
        return;
      }
      if (openMic()) return; // the questions start once the learner allows the microphone there
      // the browser blocked the window: fall back to the system's dictation
      setError('Trình duyệt đã chặn cửa sổ micro. Cho phép cửa sổ bật lên (pop-up) cho claude.ai rồi bấm lại — hoặc dùng đọc chính tả như hướng dẫn bên dưới.');
      void import('../lib/transcribe').then((m) => m.preloadTranscriber());
    }
    liveRef.current = true;
    setLive(true);
    const last = shown[shown.length - 1];
    if (last.role === 'assistant') sayThenListen(last.content, shown.length - 2);
    else startMic();
  }

  /** Stop the AI talking and let the learner answer straight away. */
  function interrupt() {
    if (mic.current) {
      mic.current.listen();
      return;
    }
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
    mic.current?.thinking();
    const ctrl = new AbortController();
    abort.current = ctrl;
    try {
      const reply = (await chatReply({ mode, history: next, apiKey, signal: ctrl.signal, onText: (t) => !ctrl.signal.aborted && setPending(t) })).trim();
      if (ctrl.signal.aborted) return;
      const done: ChatMsg[] = reply ? [...next, { role: 'assistant', content: reply }] : next;
      setHistory(done);
      saveChat(mode, done);
      const ending = mode === 'examiner' && ENDS_TEST.test(content);
      if (ending) {
        mic.current?.say(reply.replace(/\n[\s\S]*/, ''), { listen: false });
        void getScore(done);
      } else if (liveRef.current) {
        if (reply) sayThenListen(reply, done.length - 1);
        else resume();
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

  async function getScore(h = history) {
    if (scoring) return;
    setScoring(true);
    setError(null);
    mic.current?.thinking('Đang chấm điểm…');
    try {
      const c = clarity.current;
      const r = await scoreSpeaking({ mode, history: h, apiKey, clarity: c.length ? c.reduce((a, b) => a + b, 0) / c.length : null });
      setReport(r);
      saveReport(mode, r);
      mic.current?.say(`Your estimated overall band is ${r.overall}. Fluency ${r.bands.fc}, vocabulary ${r.bands.lr}, grammar ${r.bands.gra}, pronunciation ${r.bands.p}. Your full feedback is in the app.`, { listen: false });
      setTimeout(() => document.getElementById('score-card')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' }), 50);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not score this session.');
      mic.current?.stop();
    } finally {
      setScoring(false);
    }
  }
  const answers = history.filter((x) => x.role === 'user').length;
  // the mic window's callbacks outlive the render that set them up: reach the current state through this
  const latest = useRef({ send, onRecording, resume });
  latest.current = { send, onRecording, resume };

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
    setReport(null);
    saveReport(mode, null);
    clarity.current = [];
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
            {!voiceOk ? (
              <p className="muted text-sm">Voice conversation needs Chrome, Edge or Safari. Hội thoại bằng giọng nói cần Chrome, Edge hoặc Safari.</p>
            ) : !live ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <button className="btn-primary px-6 py-3 text-base" onClick={startConversation} disabled={!ai.available || busy}>
                  🎙️ {mode === 'examiner' ? (history.length ? 'Continue the speaking test' : 'Start the speaking test') : history.length ? 'Continue talking' : 'Start talking'}
                </button>
                {IS_ARTIFACT ? (
                  <div className="muted max-w-md text-xs">
                    <p>
                      Bấm nút trên: một <b>cửa sổ micro</b> nhỏ mở ra. Trong đó bấm <b>Bật mic &amp; bắt đầu</b>, cho phép micro — giám khảo đọc câu hỏi, bạn nói, ngừng nói là tự gửi. Câu trả lời và nhận xét hiện ở đây.
                    </p>
                    <p className="mt-1">Nếu cửa sổ không mở (bị chặn pop-up):</p>
                    {IS_PHONE ? (
                      <p className="mt-1">
                        <b>🎙️ Record answer</b> mở ngay {IS_IOS ? 'camera (quay video — app chỉ lấy tiếng)' : 'máy ghi âm'} của điện thoại. Nói xong bấm dùng bản ghi, app tự nhận dạng rồi gửi. Hoặc bấm 🎤 trên bàn phím để đọc chính tả.
                      </p>
                    ) : (
                      <p className="mt-1">
                        <b>Trên máy tính:</b> bật <b>đọc chính tả</b> rồi cứ nói — Mac bấm <kbd>Fn</kbd> 2 lần, Windows <kbd>Win</kbd>+<kbd>H</kbd>. Chữ hiện vào ô, ngừng nói 3 giây là tự gửi. (Nút 📁 chỉ để gửi một file ghi âm có sẵn.)
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="muted max-w-md text-xs">
                    AI đọc câu hỏi thành tiếng, bạn trả lời bằng micro. Ngừng nói khoảng 2 giây là câu trả lời tự gửi. Nên dùng tai nghe để micro không thu tiếng AI.
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2" role="status">
                <span className="flex items-center gap-2 font-medium">
                  {micState === 'opening' ? (
                    <>🪟 Cửa sổ micro đã mở — bấm <b>Bật mic &amp; bắt đầu</b> trong cửa sổ đó và cho phép micro.</>
                  ) : micState === 'paused' ? (
                    <>⏸ Paused in the mic window</>
                  ) : scoring ? (
                    <>📊 Scoring your answers…</>
                  ) : speakingIdx !== null || micState === 'speaking' ? (
                    <>🔊 {mode === 'examiner' ? 'Examiner is speaking…' : 'AI is speaking…'}</>
                  ) : busy ? (
                    <>💭 Thinking…</>
                  ) : listening ? (
                    <>
                      <span className="h-3 w-3 animate-pulse rounded-full bg-rose-600" aria-hidden /> {mic.current ? '🎙️ Listening — speak now' : IS_ARTIFACT ? 'Your turn — speak now' : 'Listening — speak now'}
                      <span className="muted text-xs font-normal">
                        {mic.current
                          ? draft.trim()
                            ? `“${draft.trim().split(/\s+/).slice(-8).join(' ')}”`
                            : '(sends after a short pause)'
                          : heard.words
                            ? `heard ${heard.words} word${heard.words > 1 ? 's' : ''}${heard.sendIn !== null ? ` · sending in ${heard.sendIn}s` : ''}`
                            : '(sends after a short pause)'}
                      </span>
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
                {mic.current && (
                  <button className="btn-secondary" onClick={() => mic.current?.focus()}>
                    🪟 Mic window
                  </button>
                )}
                {!mic.current && (listening || speakingIdx !== null) && draft.trim() && (
                  <button className="btn-primary" onClick={() => void send()}>
                    Send now ➤
                  </button>
                )}
                {IS_ARTIFACT && !mic.current && recordButton()}
                <button className="btn-secondary" onClick={endConversation}>
                  ■ End
                </button>
                {IS_ARTIFACT && !mic.current && listening && heard.idle >= 6 && (
                  <p className="w-full rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
                    Chưa nghe thấy gì. Bấm <b>🎙️ Record answer</b> để ghi âm câu trả lời, hoặc bật <b>đọc chính tả</b> rồi nói: <b>Mac</b> bấm <kbd>Fn</kbd> 2 lần · <b>Windows</b> <kbd>Win</kbd>+<kbd>H</kbd> · <b>điện thoại</b> bấm 🎤 trên bàn phím. Chữ sẽ hiện trong ô bên dưới.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {mode !== 'tutor' && answers >= 2 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700">
            <button className="btn-primary" onClick={() => void getScore()} disabled={scoring || busy || !ai.available}>
              {scoring ? 'Scoring…' : report ? '📊 Score again' : '📊 Chấm điểm & nhận xét'}
            </button>
            <span className="muted text-xs">Band cho 4 tiêu chí, điểm tổng, điểm mạnh/yếu và câu nâng cấp — dựa trên {answers} câu trả lời của bạn.</span>
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
            ref={box}
            aria-label="Your message"
            className="input min-h-[72px] w-full resize-y"
            placeholder={mode === 'tutor' ? 'Ask a question… (tiếng Việt hoặc English)' : listening ? 'Listening… speak now' : 'Type or speak your answer in English…'}
            value={draft}
            onChange={(e) => {
              lastHeard.current = Date.now();
              setDraft(e.target.value);
            }}
            onCompositionStart={() => {
              composing.current = true;
            }}
            onCompositionEnd={() => {
              composing.current = false;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            {IS_ARTIFACT && mode !== 'tutor' && !live && recordButton()}
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
          {stt && (
            <p role="status" className="flex items-center gap-2 text-sm text-brand-700 dark:text-brand-300">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden /> {stt}
            </p>
          )}
          <input
            ref={fileIn}
            type="file"
            // iPhone records audio only as a video; Android opens its sound recorder
            accept={IS_IOS ? 'video/*' : IS_PHONE ? 'audio/*' : 'audio/*,video/*'}
            {...(IS_PHONE ? { capture: 'user' as const } : {})}
            hidden
            aria-label="Recording of your answer"
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = '';
              if (f) void onRecording(f);
            }}
          />
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
      {report && <ScoreCard r={report} />}
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

function ScoreCard({ r }: { r: SpeakingReport }) {
  const keys = Object.keys(CRITERIA) as CriterionKey[];
  return (
    <section id="score-card" className="card mt-4 p-4" aria-label="Your speaking score">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-2xl bg-brand-600 text-white">
          <span className="text-3xl font-bold leading-none">{r.overall.toFixed(1)}</span>
          <span className="text-[10px] uppercase tracking-wider">overall</span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold">Estimated Speaking band</h2>
          <p className="muted text-xs">
            {r.answers} answers · {r.words} words · {new Date(r.at).toLocaleString()}. Ước tính bởi AI, phát âm chỉ ước lượng từ độ rõ khi nhận dạng giọng.
          </p>
          {r.summary && <p className="mt-1 text-sm">{r.summary}</p>}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {keys.map((k) => (
          <div key={k} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold">{CRITERIA[k]}</span>
              <span className="text-xl font-bold text-brand-600 dark:text-brand-300">{r.bands[k].toFixed(1)}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded bg-slate-200 dark:bg-slate-700">
              <div className="h-full bg-brand-600" style={{ width: `${(r.bands[k] / 9) * 100}%` }} />
            </div>
            {r.comments[k] && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.comments[k]}</p>}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {r.strengths.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✅ Strengths</h3>
            <ul className="mt-1 list-disc pl-5 text-sm">{r.strengths.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>
        )}
        {r.weaknesses.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-400">⚠️ To improve</h3>
            <ul className="mt-1 list-disc pl-5 text-sm">{r.weaknesses.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>
        )}
      </div>
      {r.upgrades.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">✏️ Say it better</h3>
          <ul className="mt-1 flex flex-col gap-2 text-sm">
            {r.upgrades.map((u, i) => (
              <li key={i} className="rounded-lg bg-amber-50 px-3 py-2 dark:bg-amber-950/40">
                <span className="text-slate-500 line-through decoration-rose-400">{u.said}</span> → <b>{u.better}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
