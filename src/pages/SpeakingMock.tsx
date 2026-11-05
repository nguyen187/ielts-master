import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { cueCards, speakingPart1 } from '../content';
import { PageHeader, TimerBadge, useTimer } from '../components/ui';
import { RecorderPanel, SpeakingAssessment, SpeechStats, useRecorder } from '../components/Speaking';
import { CueCardView } from './SpeakingCard';
import { speak } from '../lib/speech';
import { addSpeaking, updateSpeaking, useStore } from '../lib/store';

interface Step {
  part: 1 | 2 | 3;
  q: string;
  limit: number;
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export default function SpeakingMock() {
  const rate = useStore((s) => s.settings.speechRate);
  const { t1, card } = useMemo(() => ({ t1: pick(speakingPart1), card: pick(cueCards) }), []);
  const steps: Step[] = useMemo(
    () =>
      !t1 || !card
        ? []
        : [
            ...t1.questions.slice(0, 4).map((q) => ({ part: 1 as const, q, limit: 45 })),
            { part: 2 as const, q: card.prompt, limit: 120 },
            ...card.part3.slice(0, 3).map((q) => ({ part: 3 as const, q, limit: 90 })),
          ],
    [t1, card],
  );
  const [i, setI] = useState(-1);
  const [prepping, setPrepping] = useState(false);
  const [answers, setAnswers] = useState<{ step: Step; text: string; seconds: number }[]>([]);
  const [subId, setSubId] = useState<string | null>(null);
  const r = useRecorder();
  const prep = useTimer(60, prepping, () => {
    setPrepping(false);
    void r.start();
  });

  if (!steps.length) return <PageHeader title="Speaking mock" subtitle="Speaking content is not available." />;

  const step = steps[i];
  const done = i >= steps.length;
  const transcript = answers.map((a) => a.text).join(' ');
  const seconds = answers.reduce((a, x) => a + x.seconds, 0);

  function go(n: number) {
    setI(n);
    r.setTranscript('');
    const s = steps[n];
    if (!s) return;
    if (s.part === 2) {
      speak('Now I am going to give you a topic, and I would like you to talk about it for one to two minutes. You have one minute to think about what you are going to say.', rate);
      setPrepping(true);
    } else speak(s.q, rate);
  }

  function next() {
    const list = [...answers, { step, text: r.transcript, seconds: r.seconds }];
    setAnswers(list);
    if (i + 1 >= steps.length) {
      const sub = addSpeaking({ itemId: `mock-${t1.id}-${card.id}`, part: 2, transcript: list.map((a) => `[Part ${a.step.part}] ${a.step.q}\n${a.text}`).join('\n\n'), seconds: list.reduce((a, x) => a + x.seconds, 0) });
      setSubId(sub.id);
      setI(steps.length);
    } else go(i + 1);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Speaking mock test" subtitle="A full 11–14 minute speaking test: Part 1 (4 questions), Part 2 (cue card), Part 3 (3 questions). Questions are read aloud like a real examiner." back={{ to: '/speaking', label: 'Speaking' }} />

      {i === -1 && (
        <div className="card space-y-3 p-6 text-sm">
          <p>
            Part 1 topic: <b>{t1.topic}</b> · Part 2: <b>{card.topic}</b>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Find a quiet room and allow microphone access.</li>
            <li>Each answer is recorded and transcribed. Press Next when you finish speaking.</li>
            <li>Your result is saved and used for your speaking band estimate.</li>
          </ul>
          <button className="btn-primary w-full" onClick={() => go(0)}>
            Start the test
          </button>
        </div>
      )}

      {step && (
        <div className="card space-y-4 p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="chip bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200">Part {step.part}</span>
            <span className="muted">
              Step {i + 1} of {steps.length}
            </span>
          </div>
          {step.part === 2 ? <CueCardView card={card} /> : <div className="text-lg font-semibold">{step.q}</div>}
          {step.part !== 2 && (
            <button className="btn-ghost" onClick={() => speak(step.q, rate)}>
              🔊 Repeat question
            </button>
          )}
          {prepping ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold">Preparation time</span>
              <TimerBadge remaining={prep.remaining} elapsed={prep.elapsed} warnAt={15} />
              <button className="btn-secondary" onClick={() => { setPrepping(false); void r.start(); }}>
                Start speaking now
              </button>
            </div>
          ) : (
            <RecorderPanel r={r} limit={step.limit} />
          )}
          <div className="flex justify-end">
            <button className="btn-primary" disabled={prepping || r.recording || !r.transcript.trim()} onClick={next}>
              {i + 1 >= steps.length ? 'Finish test' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className="space-y-4">
          <div className="card space-y-3 p-6">
            <h2 className="h2">Your test</h2>
            {answers.map((a, k) => (
              <div key={k} className="border-l-4 border-brand-200 pl-3 text-sm dark:border-brand-800">
                <div className="font-medium">
                  Part {a.step.part}: {a.step.q} <span className="muted">({a.seconds}s)</span>
                </div>
                <p>{a.text}</p>
              </div>
            ))}
            <SpeechStats transcript={transcript} seconds={seconds} />
          </div>
          <SpeakingAssessment
            part={2}
            questions={steps.map((s) => s.q)}
            transcript={transcript}
            seconds={seconds}
            onSave={(criteria, band, source, feedback) => {
              if (subId) updateSpeaking(subId, { criteria, band, source, feedback });
            }}
          />
          <Link to="/" className="btn-secondary">
            Back to today&apos;s plan
          </Link>
        </div>
      )}
    </div>
  );
}
