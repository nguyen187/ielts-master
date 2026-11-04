import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findReading, readingPassages } from '../content';
import type { ReadingPassage } from '../content/types';
import { Empty, PageHeader, TimerBadge, useTimer, DifficultyChip } from '../components/ui';
import { QuestionGroups, ResultSummary } from '../components/Questions';
import { gradeGroups, rawToBand, type GradeResult } from '../lib/scoring';
import { addAttempt, addError } from '../lib/store';

export function PassageText({ passage }: { passage: ReadingPassage }) {
  return (
    <article className="passage font-serif text-[17px] text-slate-800 dark:text-slate-200">
      <h2 className="mb-1 font-sans text-xl font-bold text-slate-900 dark:text-white">{passage.title}</h2>
      {passage.subtitle && <p className="muted mb-4 font-sans text-sm italic">{passage.subtitle}</p>}
      {passage.paragraphs.map((p, i) => (
        <p key={i}>
          {p.label && <span className="mr-2 font-sans font-bold text-brand-700 dark:text-brand-300">{p.label}</span>}
          {p.text}
        </p>
      ))}
    </article>
  );
}

export default function ReadingTest() {
  const { id = '' } = useParams();
  return <ReadingTestInner key={id} id={id} />;
}

function ReadingTestInner({ id }: { id: string }) {
  const passage = findReading(id);
  const [mode, setMode] = useState<'intro' | 'test' | 'review'>('intro');
  const [timed, setTimed] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradeResult | null>(null);
  const [band, setBand] = useState(0);
  const [logged, setLogged] = useState(false);
  const [mobileTab, setMobileTab] = useState<'passage' | 'questions'>('passage');
  const limit = passage ? passage.minutes * 60 : 1200;
  const timer = useTimer(timed ? limit : null, mode === 'test', () => submit());

  if (!passage)
    return (
      <Empty title="Passage not found">
        <Link to="/reading" className="text-brand-600 underline">
          Back to reading
        </Link>
      </Empty>
    );

  function submit() {
    if (!passage) return;
    const r = gradeGroups(passage.groups, answers);
    const b = rawToBand('reading', r.correct, r.total, passage.module);
    setResult(r);
    setBand(b);
    setMode('review');
    addAttempt({ kind: 'reading', itemId: passage.id, title: passage.title, score: r.correct, total: r.total, band: b, byType: r.byType, minutes: Math.round(timer.elapsed / 60) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restart() {
    setAnswers({});
    setResult(null);
    setLogged(false);
    timer.reset();
    setMode('test');
  }

  function logMistakes() {
    if (!result || !passage) return;
    result.items
      .filter((i) => !i.correct)
      .forEach((i) => addError({ skill: 'reading', source: `${passage.title} · Q${i.question.number}`, note: `${i.question.prompt.replace('____', '___')} → ${i.question.answer[0]} (I wrote "${i.given || '—'}"). ${i.question.explanation}` }));
    setLogged(true);
  }

  const idx = readingPassages.findIndex((p) => p.id === passage.id);
  const next = readingPassages[idx + 1];
  const answered = Object.values(answers).filter((v) => v.trim()).length;
  const total = passage.groups.reduce((a, g) => a + g.questions.length, 0);

  if (mode === 'intro')
    return (
      <div className="mx-auto max-w-2xl">
        <PageHeader title={passage.title} back={{ to: '/reading', label: 'Reading' }} subtitle={`${passage.module === 'general' ? 'General Training' : 'Academic'} · ${total} questions · ${passage.minutes} minutes`} />
        <div className="card space-y-4 p-6">
          <div className="flex flex-wrap gap-2">
            <DifficultyChip d={passage.difficulty} />
          </div>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>Read the questions first, then skim the passage for its structure.</li>
            <li>Answers to most question types appear in passage order — completion and TRUE/FALSE especially.</li>
            <li>Spelling counts. Respect the word limit in the instructions.</li>
            <li className="muted">Mẹo: Đừng dành quá 1.5 phút cho một câu — đánh dấu và quay lại sau.</li>
          </ul>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} /> Timed ({passage.minutes} minutes, auto-submit) — untick for untimed study mode
          </label>
          <button className="btn-primary w-full" onClick={() => setMode('test')}>
            Start
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 mb-4 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur lg:top-0 dark:border-slate-800 dark:bg-slate-950/95">
        <Link to="/reading" className="text-sm text-brand-600 hover:underline">
          ← Reading
        </Link>
        <span className="truncate font-semibold">{passage.title}</span>
        <span className="flex-1" />
        {mode === 'test' && (
          <>
            <span className="muted text-sm">
              {answered}/{total} answered
            </span>
            <TimerBadge remaining={timer.remaining} elapsed={timer.elapsed} />
            <button className="btn-primary" onClick={submit}>
              Submit
            </button>
          </>
        )}
      </div>

      {mode === 'review' && result && (
        <div className="mb-6">
          <ResultSummary
            result={result}
            band={band}
            onRetry={restart}
            extra={
              <div className="mt-4 flex flex-wrap gap-2">
                {result.correct < result.total && (
                  <button className="btn-secondary" onClick={logMistakes} disabled={logged}>
                    {logged ? '✓ Added to error log' : `Add ${result.total - result.correct} mistakes to error log`}
                  </button>
                )}
                {next && (
                  <Link to={`/reading/${next.id}`} className="btn-primary" onClick={() => setMode('intro')}>
                    Next passage →
                  </Link>
                )}
              </div>
            }
          />
        </div>
      )}

      <div className="mb-3 flex gap-2 lg:hidden">
        <button className={mobileTab === 'passage' ? 'btn-primary flex-1' : 'btn-secondary flex-1'} onClick={() => setMobileTab('passage')}>
          Passage
        </button>
        <button className={mobileTab === 'questions' ? 'btn-primary flex-1' : 'btn-secondary flex-1'} onClick={() => setMobileTab('questions')}>
          Questions
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`card p-6 lg:sticky lg:top-16 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto ${mobileTab === 'passage' ? '' : 'hidden lg:block'}`}>
          <PassageText passage={passage} />
        </div>
        <div className={mobileTab === 'questions' ? '' : 'hidden lg:block'}>
          <QuestionGroups groups={passage.groups} answers={answers} onChange={(qid, v) => setAnswers((a) => ({ ...a, [qid]: v }))} result={result} />
          {mode === 'test' && (
            <button className="btn-primary mt-6 w-full" onClick={submit}>
              Submit answers
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
