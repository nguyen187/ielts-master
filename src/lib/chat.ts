/**
 * AI conversation partner. Multi-turn chat with Claude: on claude.ai (artifact build) through the
 * viewer's own Claude account, elsewhere with the learner's own API key. Replies stream in.
 */
import Anthropic from '@anthropic-ai/sdk';
import { IS_ARTIFACT, claudeSample, describeSampleError, isSampleError, markClaudeDenied } from './artifact';

export type ChatMode = 'partner' | 'examiner' | 'tutor';
export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

const MODEL = 'claude-opus-5-5';

export const MODES: Record<ChatMode, { label: string; icon: string; hint: string; opener: string; starters: string[] }> = {
  examiner: {
    label: 'Mock test (AI examiner)',
    icon: '🎓',
    hint: 'Thi thử Speaking như phòng thi thật, bằng giọng nói: Part 1 → Part 2 → Part 3, cuối buổi có nhận xét và band ước tính.',
    opener: 'Good morning. My name is Claude and I’ll be your examiner today. This is the Speaking test. Can you tell me your full name, please?',
    starters: ['My full name is …', 'Please start the test.'],
  },
  partner: {
    label: 'Speaking partner',
    icon: '💬',
    hint: 'Trò chuyện tự nhiên bằng tiếng Anh. AI hỏi tiếp, và sửa nhẹ câu của bạn sau mỗi lượt.',
    opener: 'Hi! I’m your English speaking partner. What would you like to talk about today — your work or studies, a hobby, travel, or something you did recently?',
    starters: ['Let’s talk about my hometown.', 'I want to practise talking about technology.', 'Ask me about my favourite food.'],
  },
  tutor: {
    label: 'Ask a tutor',
    icon: '🧑‍🏫',
    hint: 'Hỏi bất cứ điều gì về IELTS: ngữ pháp, từ vựng, chiến thuật, sửa câu — hỏi bằng tiếng Việt cũng được.',
    opener: 'Hello! Ask me anything about IELTS — grammar, vocabulary, a sentence you want checked, or how to tackle a question type. Bạn có thể hỏi bằng tiếng Việt.',
    starters: ['Khi nào dùng present perfect?', 'Check this sentence: "People is more care about health now."', 'How do I write a Task 1 overview?'],
  },
};

const COMMON = `You are part of IELTS Master, a study app for IELTS learners, many of them Vietnamese. Your messages are usually read aloud to the learner and their answers come from speech recognition, so write the way people speak, keep messages short, avoid tables and symbols, and ignore small transcription slips (missing punctuation, misheard words). Never write long lectures.`;

const SYSTEMS: Record<ChatMode, string> = {
  partner: `${COMMON}
You are a friendly, curious English conversation partner. Chat naturally about whatever the learner brings up. Each turn:
1. Respond to what they said in 2–4 natural sentences, sharing a little of your own view, then ask ONE open follow-up question that invites a longer answer (why / how / tell me about a time…).
2. Then, only if their last message had mistakes or could sound more natural, add a new paragraph starting with "✏️ " giving at most two short fixes in the form: "you said" → "better", with a 3–6 word reason. Optionally suggest one band 7+ phrase they could use. Skip the ✏️ part if their English was fine.
Use clear international English. Do not switch to Vietnamese unless they ask.`,
  examiner: `${COMMON}
You are a certified IELTS Speaking examiner running a realistic test, one question per message, like the real exam.
- Part 1: after the name, ask about 6–8 short questions on two everyday topics (home/work/study, then one more topic).
- Part 2: give a cue card ("Describe …" with the four "You should say" bullet points), tell them they have one minute to prepare and should talk for up to two minutes, then wait for their long answer. Ask one short rounding-off question.
- Part 3: ask 4–5 abstract discussion questions linked to the Part 2 topic, with natural follow-ups to what they say.
Stay in role: be neutral and polite, do not teach, correct or praise during the test. If an answer is very short, ask "Why?" or "Can you tell me more?" as an examiner would.
When Part 3 is finished, or whenever the learner writes "end test" / "kết thúc", step out of role and give feedback: an estimated band for each of Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy (Pronunciation cannot be judged from text — say so), an overall estimate, three specific strengths and weaknesses quoting their words, and three upgrades of phrases they actually used. Be honest, not generous.`,
  tutor: `${COMMON}
You are an expert IELTS tutor. Answer the learner's question directly and practically, with a short example or two. Reply in the language they write in (Vietnamese or English); keep IELTS terms and example sentences in English. When they ask you to check a sentence, give the corrected version first, then explain each fix briefly. Point out typical Vietnamese-speaker issues (articles, plural -s, verb forms, word form) when relevant. Use simple Markdown (bold, bullet lists) sparingly.`,
};

/** The conversation as sent to Claude: the canned opener is the assistant's first turn. */
function wire(mode: ChatMode, history: ChatMsg[]): ChatMsg[] {
  const msgs: ChatMsg[] = [{ role: 'user', content: '(The learner opened the chat.)' }, { role: 'assistant', content: MODES[mode].opener }, ...history];
  // keep the conversation within a sensible size: the start (for the examiner's flow) and the latest turns
  if (msgs.length > 42) return [...msgs.slice(0, 2), { role: 'user', content: '(Earlier messages omitted.)' }, { role: 'assistant', content: 'Okay.' }, ...msgs.slice(-38)];
  return msgs;
}

/**
 * Send the conversation and stream Claude's next message. `onText` receives the whole reply so far.
 * `history` must end with the learner's message.
 */
export async function chatReply(opts: { mode: ChatMode; history: ChatMsg[]; apiKey?: string; onText: (text: string) => void; signal?: AbortSignal }): Promise<string> {
  const msgs = wire(opts.mode, opts.history);
  if (IS_ARTIFACT) {
    const sample = claudeSample();
    if (!sample) throw new Error('Claude is not available on this page.');
    // the artifact sample call has no separate system prompt: put the instructions in the first turn
    const input = [{ role: 'user' as const, content: `${SYSTEMS[opts.mode]}\n\nStart the conversation.` }, ...msgs.slice(1)];
    try {
      const res = await sample(input as never, {
        cache: false,
        modelTier: opts.mode === 'tutor' ? 'default' : 'quick',
        signal: opts.signal,
        onText: ({ text }: { text: string }) => opts.onText(text),
      });
      return res.text;
    } catch (e) {
      if (isSampleError(e)) {
        if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(e.code)) markClaudeDenied();
        if (e.code === 'aborted' && e.text) return e.text;
        throw new Error(describeSampleError(e));
      }
      throw e;
    }
  }
  if (!opts.apiKey) throw new Error('Add your Anthropic API key in Settings to chat with the AI.');
  const client = new Anthropic({ apiKey: opts.apiKey, dangerouslyAllowBrowser: true });
  const stream = client.messages.stream(
    {
      model: MODEL,
      max_tokens: 2000,
      system: SYSTEMS[opts.mode],
      output_config: { effort: 'low' },
      messages: msgs,
    } as never,
    { signal: opts.signal },
  );
  let text = '';
  stream.on('text', (d: string) => {
    text += d;
    opts.onText(text);
  });
  const final = await stream.finalMessage();
  if (final.stop_reason === 'refusal') throw new Error('The AI declined to answer that.');
  return text;
}

/* ---------------- saved chats (this device only) ---------------- */

const KEY = 'ielts-master:chat';
export function loadChat(mode: ChatMode): ChatMsg[] {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Record<ChatMode, ChatMsg[]>>;
    return Array.isArray(all[mode]) ? all[mode]!.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') : [];
  } catch {
    return [];
  }
}
export function saveChat(mode: ChatMode, history: ChatMsg[]) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, unknown>;
    all[mode] = history.slice(-60);
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    /* storage blocked: the chat just isn't kept */
  }
}

/** Read a message aloud with the browser's English voice (no network needed). */
// the utterance must stay referenced: Chrome drops `onend` for one that was garbage-collected
let active: { u: SpeechSynthesisUtterance; cancel: () => void } | null = null;

/**
 * Read a message aloud with the browser's English voice (no network needed). `onEnd` is called once,
 * when speech ends — or, since browsers (and sandboxed frames) sometimes never report the end or never
 * start speaking at all, after a time limit — but not when it is stopped with `stopSpeaking`.
 */
export function speak(text: string, onEnd?: () => void): boolean {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return false;
  stopSpeaking();
  const clean = text.replace(/✏️[\s\S]*$/, '').replace(/[*_#`>]/g, '').trim() || text;
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = 'en-GB';
  u.rate = 0.95;
  const voices = synth.getVoices?.() ?? [];
  const voice = voices.find((v) => v.lang === 'en-GB') ?? voices.find((v) => v.lang?.startsWith('en'));
  if (voice) u.voice = voice;
  let done = false;
  let started = false;
  const words = clean.split(/\s+/).length;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const finish = () => {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    if (active?.u === u) active = null;
    onEnd?.();
  };
  // upper bound: ~2.3 words a second plus a margin
  timers.push(setTimeout(finish, (words / 2.3) * 1000 + 2500));
  // nothing is playing (blocked or no voice): don't keep the learner waiting
  timers.push(setTimeout(() => !started && !synth.speaking && finish(), 2000));
  u.onstart = () => {
    started = true;
  };
  u.onend = finish;
  u.onerror = finish;
  active = {
    u,
    cancel: () => {
      done = true;
      timers.forEach(clearTimeout);
    },
  };
  try {
    synth.speak(u);
  } catch {
    finish();
  }
  return true;
}
export function stopSpeaking() {
  active?.cancel();
  active = null;
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
}
