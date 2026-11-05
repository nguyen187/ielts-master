import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findCueCard } from '../content';
import type { CueCard } from '../content/types';
import { Empty, PageHeader, TimerBadge, useTimer } from '../components/ui';
import { RecorderPanel, SpeakingAssessment, SpeechStats, useRecorder } from '../components/Speaking';
import { speak } from '../lib/speech';
import { addSpeaking, updateSpeaking, useStore } from '../lib/store';

export function CueCardView({ card }: { card: CueCard }) {
  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 font-serif dark:border-slate-600 dark:bg-slate-900">
      <div className="text-lg font-semibold">{card.prompt}</div>
      <div className="mt-3 text-sm">You should say:</div>
      <ul className="mt-1 space-y-1 pl-4 text-[15px]">
        {card.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

type Stage = 'card' | 'prep' | 'talk' | 'part3' | 'results';

export default function SpeakingCard() {
  const { id = '' } = useParams();
  return <CardInner key={id} id={id} />;
}

function CardInner({ id }: { id: string }) {
  const card = findCueCard(id);
  const rate = useStore((s) => s.settings.speechRate);
  const [stage, setStage] = useState<Stage>('card');
  const [notes, setNotes] = useState('');
  const [p2, setP2] = useState<{ text: string; seconds: number; audio: string | null } | null>(null);
  const [p3i, setP3i] = useState(0);
  const [p3, setP3] = useState<{ q: string; text: string; seconds: number; audio?: string | null }[]>([]);
  const [subId, setSubId] = useState<string | null>(null);
  const r = useRecorder();
  const prep = useTimer(60, stage === 'prep', () => setStage('talk'));

  useEffect(() => {
    if (stage === 'talk' && !r.recording && !r.transcript && !r.audioUrl) void r.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  if (!card)
    return (
      <Empty title="Cue card not found">
        <Link to="/speaking" className="text-brand-600 underline">
          Back to speaking
        </Link>
      </Empty>
    );

  const part3Qs = card.part3.slice(0, 4);

  function finishPart2() {
    setP2({ text: r.transcript, seconds: r.seconds, audio: r.audioUrl });
    r.reset();
    setStage('part3');
    speak(part3Qs[0], rate);
  }

  function finishAll(list = p3) {
    const t2 = p2?.text ?? '';
    const sub = addSpeaking({
      itemId: card!.id,
      part: 2,
      transcript: `PART 2: ${t2}\n\n${list.map((a) => `Q: ${a.q}\nA: ${a.text}`).join('\n\n')}`,
      seconds: (p2?.seconds ?? 0) + list.reduce((a, x) => a + x.seconds, 0),
    });
    setSubId(sub.id);
    setStage('results');
  }

  function nextP3() {
    const list = [...p3, { q: part3Qs[p3i], text: r.transcript, seconds: r.seconds, audio: r.audioUrl }];
    setP3(list);
    r.reset();
    if (p3i < part3Qs.length - 1) {
      setP3i(p3i + 1);
      speak(part3Qs[p3i + 1], rate);
    } else finishAll(list);
  }

  const allText = [p2?.text ?? '', ...p3.map((a) => a.text)].join(' ');
  const allSec = (p2?.seconds ?? 0) + p3.reduce((a, x) => a + x.seconds, 0);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={card.topic} subtitle="Part 2: 1 minute to prepare, then speak for 1–2 minutes. Part 3: discuss related abstract questions." back={{ to: '/speaking', label: 'Speaking' }} />

      {(stage === 'card' || stage === 'prep' || stage === 'talk') && <CueCardView card={card} />}

      {stage === 'card' && (
        <div className="card mt-4 space-y-3 p-5 text-sm">
          <ul className="list-disc space-y-1 pl-5">
            <li>Use the minute to write keywords, not sentences — one line per bullet.</li>
            <li>Tell it as a story: set the scene, what happened, how you felt, why it matters.</li>
            <li>Aim for the full 2 minutes. Speaking under 1 minute lowers Fluency.</li>
          </ul>
          <button className="btn-primary w-full" onClick={() => setStage('prep')}>
            Start 1-minute preparation
          </button>
        </div>
      )}

      {stage === 'prep' && (
        <div className="card mt-4 space-y-3 p-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Preparation</span>
            <TimerBadge remaining={prep.remaining} elapsed={prep.elapsed} warnAt={15} />
          </div>
          <textarea className="input min-h-32" aria-label="Preparation notes" placeholder="Keywords…" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <button className="btn-secondary" onClick={() => setStage('talk')}>
            I&apos;m ready — start speaking
          </button>
        </div>
      )}

      {stage === 'talk' && (
        <div className="card mt-4 space-y-3 p-5">
          {notes && <div className="muted whitespace-pre-line rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800/60">{notes}</div>}
          <p className="text-sm font-semibold">Speak now — recording stops automatically at 2:00.</p>
          <RecorderPanel r={r} limit={120} label="Start speaking" />
          <button className="btn-primary" disabled={r.recording || !r.hasAnswer} onClick={finishPart2}>
            Continue to Part 3 →
          </button>
        </div>
      )}

      {stage === 'part3' && (
        <div className="card mt-4 space-y-4 p-5">
          <div className="muted text-sm">
            Part 3 · Question {p3i + 1} of {part3Qs.length}
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-1 text-lg font-semibold">{part3Qs[p3i]}</div>
            <button className="btn-secondary" onClick={() => speak(part3Qs[p3i], rate)} aria-label="Hear the question">
              🔊
            </button>
          </div>
          <RecorderPanel r={r} limit={90} />
          <div className="flex justify-between">
            <button className="btn-ghost" onClick={() => finishAll()}>
              Skip remaining Part 3
            </button>
            <button className="btn-primary" disabled={r.recording || !r.hasAnswer} onClick={nextP3}>
              {p3i < part3Qs.length - 1 ? 'Next question →' : 'Finish'}
            </button>
          </div>
        </div>
      )}

      {stage === 'results' && (
        <div className="space-y-4">
          <div className="card space-y-3 p-6">
            <h2 className="h2">Your Part 2 talk</h2>
            <div className="muted text-sm">
              {p2?.seconds ?? 0} seconds {p2 && p2.seconds < 90 && '· aim for 1:45–2:00'}
            </div>
            {p2?.audio && <audio controls src={p2.audio} className="w-full" aria-label="Your Part 2 recording" />}
            <p className="text-sm leading-7">{p2?.text || <i className="muted">(no transcript)</i>}</p>
            {p2?.audio && <audio controls src={p2.audio} className="h-9 max-w-full" aria-label="Your Part 2 talk" />}
            {p3.length > 0 && (
              <>
                <h3 className="font-semibold">Part 3</h3>
                {p3.map((a) => (
                  <div key={a.q} className="border-l-4 border-brand-200 pl-3 text-sm dark:border-brand-800">
                    <div className="font-medium">{a.q}</div>
                    <p>{a.text || <i className="muted">(no transcript)</i>}</p>
                    {a.audio && <audio controls src={a.audio} className="mt-1 h-9 max-w-full" aria-label="Your answer" />}
                  </div>
                ))}
              </>
            )}
            <SpeechStats transcript={allText} seconds={allSec} />
          </div>
          <details className="card p-6" open>
            <summary className="h2 cursor-pointer">Band 8 sample answer</summary>
            <p className="mt-3 text-sm leading-7 whitespace-pre-line">{card.sample}</p>
            <h3 className="mt-4 font-semibold">Part 3 sample — {card.part3[0]}</h3>
            <p className="mt-1 text-sm leading-7">{card.part3Sample}</p>
            <h3 className="mt-4 font-semibold">Useful vocabulary</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {card.vocabulary.map((v) => (
                <span key={v} className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                  {v}
                </span>
              ))}
            </div>
          </details>
          <SpeakingAssessment part={2} questions={[card.prompt, ...card.bullets, ...p3.map((a) => a.q)]} transcript={allText} seconds={allSec} confidence={r.confidence} answers={1 + p3.length} onSave={(criteria, band, source, feedback) => subId && updateSpeaking(subId, { criteria, band, source, feedback })} />
        </div>
      )}
    </div>
  );
}
