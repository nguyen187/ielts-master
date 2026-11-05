import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findListeningSection, listeningSections } from '../content';
import { Empty, PageHeader } from '../components/ui';
import { QuestionGroups, ResultSummary } from '../components/Questions';
import { ListeningPlayer, Transcript } from '../components/ListeningPlayer';
import { gradeGroups, rawToBand, type GradeResult } from '../lib/scoring';
import { addAttempt, addError } from '../lib/store';

export default function ListeningTest() {
  const { id = '' } = useParams();
  return <ListeningTestInner key={id} id={id} />;
}

function ListeningTestInner({ id }: { id: string }) {
  const section = findListeningSection(id);
  const [examMode, setExamMode] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradeResult | null>(null);
  const [band, setBand] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [logged, setLogged] = useState(false);
  const [audioDone, setAudioDone] = useState(false);

  if (!section)
    return (
      <Empty title="Section not found">
        <Link to="/listening" className="text-brand-600 underline">
          Back to listening
        </Link>
      </Empty>
    );

  const submit = () => {
    const r = gradeGroups(section.groups, answers);
    const b = rawToBand('listening', r.correct, r.total);
    setResult(r);
    setBand(b);
    if (Object.values(answers).some((v) => v.trim())) addAttempt({ kind: 'listening', itemId: section.id, title: `Part ${section.part}: ${section.title}`, score: r.correct, total: r.total, band: b, byType: r.byType });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const retry = () => {
    setAnswers({});
    setResult(null);
    setShowScript(false);
    setLogged(false);
    setAudioDone(false);
  };
  const idx = listeningSections.findIndex((s) => s.id === section.id);
  const next = listeningSections[idx + 1];

  return (
    <div>
      <PageHeader title={`Part ${section.part}: ${section.title}`} subtitle={section.context} back={{ to: '/listening', label: 'Listening' }} />

      {!result && (
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={examMode} onChange={(e) => setExamMode(e.target.checked)} /> Exam mode (play once, 30 s to read questions first)
          </label>
        </div>
      )}

      {result ? (
        <div className="mb-6">
          <ResultSummary
            result={result}
            band={band}
            onRetry={retry}
            extra={
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn-secondary" onClick={() => setShowScript((s) => !s)}>
                  {showScript ? 'Hide transcript' : '📄 Show transcript with answers'}
                </button>
                {result.correct < result.total && (
                  <button
                    className="btn-secondary"
                    disabled={logged}
                    onClick={() => {
                      result.items.filter((i) => !i.correct).forEach((i) => addError({ skill: 'listening', source: `${section.title} · Q${i.question.number}`, note: `${i.question.prompt} → ${i.question.answer[0]} (I wrote "${i.given || '—'}"). ${i.question.explanation}` }));
                      setLogged(true);
                    }}
                  >
                    {logged ? '✓ Added to error log' : 'Add mistakes to error log'}
                  </button>
                )}
                {next && (
                  <Link to={`/listening/${next.id}`} className="btn-primary" onClick={retry}>
                    Next part →
                  </Link>
                )}
              </div>
            }
          />
          <div className="mt-4">
            <ListeningPlayer section={section} examMode={false} />
          </div>
          {showScript && (
            <div className="card mt-4 p-5">
              <h2 className="h2 mb-3">Transcript</h2>
              <Transcript section={section} highlight={section.groups.flatMap((g) => (g.type === 'gap' ? g.questions.map((q) => q.answer[0]) : []))} />
            </div>
          )}
        </div>
      ) : (
        <div className="sticky top-14 z-20 mb-4 lg:top-2">
          <ListeningPlayer section={section} examMode={examMode} prepSeconds={examMode ? 30 : 0} onEnded={() => setAudioDone(true)} />
        </div>
      )}

      <QuestionGroups groups={section.groups} answers={answers} onChange={(qid, v) => setAnswers((a) => ({ ...a, [qid]: v }))} result={result} />
      {!result && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="btn-primary" onClick={submit}>
            Check answers
          </button>
          {audioDone && <span className="muted text-sm">Recording finished — check your spelling, then submit.</span>}
        </div>
      )}
    </div>
  );
}
