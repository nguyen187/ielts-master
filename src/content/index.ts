import type { CueCard, DiagnosticItem, GrammarLesson, Guide, ListeningSection, ListeningTest, ReadingPassage, SpeakingPart1Topic, VocabTopic, VocabWord, WritingTask } from './types';

// Content files are discovered at build time so each workstream can ship independently.
const modules = import.meta.glob('./data/*.ts', { eager: true }) as Record<string, Record<string, unknown>>;
function collect<T>(...names: string[]): T[] {
  const out: T[] = [];
  for (const m of Object.values(modules)) for (const n of names) if (Array.isArray(m[n])) out.push(...(m[n] as T[]));
  return out;
}
const byId = <T extends { id: string }>(arr: T[]) => [...arr].sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));

export const readingPassages: ReadingPassage[] = byId(collect<ReadingPassage>('readingA', 'readingB'));
export const listeningTests: ListeningTest[] = byId(collect<ListeningTest>('listeningA', 'listeningB'));
export const listeningSections: ListeningSection[] = listeningTests.flatMap((t) => t.sections);
export const writingTasks: WritingTask[] = byId(collect<WritingTask>('writingTask1', 'writingTask2'));
export const speakingPart1: SpeakingPart1Topic[] = byId(collect<SpeakingPart1Topic>('speakingPart1'));
export const cueCards: CueCard[] = byId(collect<CueCard>('cueCards'));
export const vocabTopics: VocabTopic[] = collect<VocabTopic>('vocabTopics');
export const grammarLessons: GrammarLesson[] = byId(collect<GrammarLesson>('grammarLessons'));
export const guides: Guide[] = collect<Guide>('guides');
export const diagnosticItems: DiagnosticItem[] = byId(collect<DiagnosticItem>('diagnosticItems'));

export const allWords: (VocabWord & { topicId: string; topic: string; key: string })[] = vocabTopics.flatMap((t) =>
  t.words.map((w) => ({ ...w, topicId: t.id, topic: t.topic, key: `${t.id}:${w.word.toLowerCase()}` })),
);

export const findReading = (id: string) => readingPassages.find((p) => p.id === id);
export const findListeningSection = (id: string) => listeningSections.find((s) => s.id === id);
export const findListeningTest = (id: string) => listeningTests.find((t) => t.id === id);
export const findWriting = (id: string) => writingTasks.find((w) => w.id === id);
export const findCueCard = (id: string) => cueCards.find((c) => c.id === id);
export const findGuide = (id: string) => guides.find((g) => g.id === id);
export const findGrammar = (id: string) => grammarLessons.find((g) => g.id === id);
