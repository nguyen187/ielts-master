import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { speakingPart1 } from '../content';
import { Empty, PageHeader } from '../components/ui';
import { RecorderPanel, SpeakingAssessment, SpeechStats, useRecorder } from '../components/Speaking';
import { speak } from '../lib/speech';
import { addSpeaking, updateSpeaking, useStore } from '../lib/store';

export default function SpeakingPart1() {
  const { id = '' } = useParams();
  return <Part1Inner key={id} id={id} />;
}

function Part1Inner({ id }: { id: string }) {
  const topic = speakingPart1.find((t) => t.id === id);
  const rate = useStore((s) => s.settings.speechRate);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<{ q: string; text: string; seconds: number; audio: string | null }[]>([]);
  const [done, setDone] = useState(false);
  const [subId, setSubId] = useState<string | null>(null);
  const r = useRecorder();

  if (!topic)
    return (
      <Empty title="Topic not found">
        <Link to="/speaking" className="text-brand-600 underline">
          Back to speaking
        </Link>
      </Empty>
    );

  const q = topic.questions[qi];
  const transcript = answers.map((a) => a.text).join(' ');
  const seconds = answers.reduce((a, x) => a + x.seconds, 0);

  function nextQuestion() {
    const entry = { q, text: r.transcript, seconds: r.seconds, audio: r.audioUrl };
    const all = [...answers, entry];
    setAnswers(all);
    r.setTranscript('');
    if (qi < topic!.questions.length - 1) setQi(qi + 1);
    else {
      setDone(true);
      const sub = addSpeaking({ itemId: topic!.id, part: 1, transcript: all.map((a) => `Q: ${a.q}\nA: ${a.text}`).join('\n\n'), seconds: all.reduce((a, x) => a + x.seconds, 0) });
      setSubId(sub.id);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={`Part 1: ${topic.topic}`} subtitle="Answer each question in 2–3 sentences (about 20–30 seconds): a direct answer, a reason, and a detail or example." back={{ to: '/speaking', label: 'Speaking' }} />
      {!done ? (
        <div className="card space-y-4 p-6">
          <div className="muted text-sm">
            Question {qi + 1} of {topic.questions.length}
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-1 text-lg font-semibold">{q}</div>
            <button className="btn-secondary" onClick={() => speak(q, rate)} aria-label="Hear the examiner ask this question">
              🔊 Hear
            </button>
          </div>
          <RecorderPanel r={r} limit={60} />
          <div className="flex justify-end">
            <button className="btn-primary" disabled={r.recording || !r.hasAnswer} onClick={nextQuestion}>
              {qi < topic.questions.length - 1 ? 'Next question →' : 'Finish'}
            </button>
          </div>
          <details className="text-sm">
            <summary className="cursor-pointer text-brand-600">Tips for this topic</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {topic.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </details>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card space-y-4 p-6">
            <h2 className="h2">Your answers</h2>
            {answers.map((a, i) => (
              <div key={i} className="border-l-4 border-brand-200 pl-3 text-sm dark:border-brand-800">
                <div className="font-semibold">{a.q}</div>
                <p className="mt-1">{a.text || <i className="muted">(no transcript)</i>}</p>
                <div className="muted mt-1 flex items-center gap-2 text-xs">
                  {a.seconds}s {a.seconds < 12 && '· too short — extend with a reason or example'}
                  {a.audio && <audio controls src={a.audio} className="h-8" aria-label={`Recording for question ${i + 1}`} />}
                </div>
              </div>
            ))}
            <SpeechStats transcript={transcript} seconds={seconds} />
          </div>
          <div className="card p-6">
            <h2 className="h2">Band 8 sample — &ldquo;{topic.questions[0]}&rdquo;</h2>
            <p className="mt-2 text-sm leading-7">{topic.sample}</p>
          </div>
          <SpeakingAssessment part={1} questions={topic.questions} transcript={transcript} seconds={seconds} onSave={(criteria, band, source, feedback) => subId && updateSpeaking(subId, { criteria, band, source, feedback })} />
          <Link to="/speaking" className="btn-secondary">
            ← More topics
          </Link>
        </div>
      )}
    </div>
  );
}
