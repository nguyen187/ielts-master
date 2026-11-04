/**
 * Content contract for IELTS Master.
 * Every content file in src/content/data/ must export data typed with these interfaces.
 * All content is ORIGINAL (written for this project) — never copy Cambridge / British Council / IDP material.
 */

export type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
export type Module = 'academic' | 'general';
/** 1 = band 5–6 level, 2 = band 6–7, 3 = band 7–9 */
export type Difficulty = 1 | 2 | 3;

/* ------------------------------------------------------------------ */
/* Objective questions (Reading + Listening)                           */
/* ------------------------------------------------------------------ */

export type QuestionType =
  | 'mcq' // single answer, options A–D (or more)
  | 'tfng' // TRUE / FALSE / NOT GIVEN (facts)
  | 'ynng' // YES / NO / NOT GIVEN (writer's views)
  | 'gap' // sentence / summary / note / form / table / flow-chart / short-answer completion — typed answer
  | 'matching'; // matching headings / information / features / sentence endings — shared option list

export interface Question {
  /** Unique within the whole content set, e.g. "r01-q5" */
  id: string;
  /** Number shown to the candidate (1–40 within a test, or within a practice set) */
  number: number;
  /**
   * The question text.
   * - mcq: the stem
   * - tfng/ynng: the statement
   * - gap: text containing exactly one "____" (4 underscores) where the answer goes
   * - matching: the item to be matched (e.g. "Paragraph B" or a statement)
   */
  prompt: string;
  /** mcq only: option texts in order; letters A, B, C… are derived from position */
  options?: string[];
  /**
   * Accepted answers. Matching is case-insensitive and whitespace-normalised.
   * - mcq: ["B"]
   * - tfng: ["TRUE"] | ["FALSE"] | ["NOT GIVEN"]
   * - ynng: ["YES"] | ["NO"] | ["NOT GIVEN"]
   * - gap: every acceptable spelling/variant, e.g. ["market research", "research"]; numbers as ["25", "twenty-five"]
   * - matching: the key of the correct option, e.g. ["iv"] or ["C"]
   */
  answer: string[];
  /** Why this is the answer: quote/paraphrase the exact evidence and explain the trap. 1–3 sentences. */
  explanation: string;
}

export interface QuestionGroup {
  id: string;
  type: QuestionType;
  /** Exam-style instruction, e.g. "Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer." */
  instructions: string;
  /** Optional heading such as "Notes on the museum visit" (for note/table/summary completion) */
  title?: string;
  /** matching only: the shared list of options, e.g. headings i–viii or people A–E */
  options?: { key: string; text: string }[];
  questions: Question[];
}

/* ------------------------------------------------------------------ */
/* Reading                                                             */
/* ------------------------------------------------------------------ */

export interface ReadingParagraph {
  /** Paragraph letter if the questions refer to paragraphs (A, B, C…) */
  label?: string;
  text: string;
}

export interface ReadingPassage {
  id: string; // "r01"
  module: Module;
  difficulty: Difficulty;
  title: string;
  /** Optional sub-title / source line, e.g. "The history of glass-making" */
  subtitle?: string;
  topic: string; // "science", "history", "environment"…
  paragraphs: ReadingParagraph[];
  /** 12–14 questions total, numbered from 1 */
  groups: QuestionGroup[];
  /** Recommended minutes (normally 20) */
  minutes: number;
}

/* ------------------------------------------------------------------ */
/* Listening                                                           */
/* ------------------------------------------------------------------ */

export interface Speaker {
  /** Name used in script lines */
  name: string;
  /** Used to pick a text-to-speech voice */
  voice: 'female' | 'male';
  /** Preferred accent for TTS: "en-GB" | "en-AU" | "en-US" | "en-IE" | "en-CA" | "en-NZ" */
  accent: string;
}

export interface ScriptLine {
  speaker: string; // must match Speaker.name
  text: string;
}

export interface ListeningSection {
  id: string; // "l1-p1"
  /** Part 1: everyday conversation (form/notes). Part 2: monologue, everyday. Part 3: academic discussion. Part 4: academic lecture. */
  part: 1 | 2 | 3 | 4;
  difficulty: Difficulty;
  title: string;
  /** One-line situation shown before listening, e.g. "A man is calling a sports centre to book a course." */
  context: string;
  speakers: Speaker[];
  script: ScriptLine[];
  /** 10 questions, numbered 1–10 within the section (the app renumbers in full tests) */
  groups: QuestionGroup[];
}

export interface ListeningTest {
  id: string; // "l1"
  title: string;
  sections: [ListeningSection, ListeningSection, ListeningSection, ListeningSection];
}

/* ------------------------------------------------------------------ */
/* Writing                                                             */
/* ------------------------------------------------------------------ */

export type Task1Visual =
  | { kind: 'line'; title: string; xLabel: string; yLabel: string; categories: string[]; series: { name: string; values: number[] }[] }
  | { kind: 'bar'; title: string; xLabel: string; yLabel: string; categories: string[]; series: { name: string; values: number[] }[] }
  | { kind: 'pie'; title: string; charts: { label: string; slices: { name: string; value: number }[] }[] }
  | { kind: 'table'; title: string; headers: string[]; rows: (string | number)[][] }
  | { kind: 'process'; title: string; steps: string[] }
  | { kind: 'map'; title: string; before: { label: string; features: string[] }; after: { label: string; features: string[] } };

export interface ModelAnswer {
  band: number; // e.g. 6, 7.5, 9
  text: string; // paragraphs separated by "\n\n"
  /** Examiner-style commentary on the four criteria */
  commentary: { tr: string; cc: string; lr: string; gra: string };
}

export interface WritingTask {
  id: string; // "w1-01" (Task 1) or "w2-01" (Task 2)
  task: 1 | 2;
  module: Module;
  /**
   * Task 1 academic: 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map' | 'mixed'
   * Task 1 general: 'letter-formal' | 'letter-semi-formal' | 'letter-informal'
   * Task 2: 'opinion' | 'discussion' | 'problem-solution' | 'advantages-disadvantages' | 'two-part'
   */
  type: string;
  topic: string;
  prompt: string;
  visual?: Task1Visual; // academic Task 1 only (for 'mixed', give the main visual)
  /** Step-by-step plan for this exact question */
  plan: string[];
  /** 8–12 phrases/collocations useful for THIS question */
  usefulLanguage: string[];
  /** At least one band 7+ answer; ideally also a band 5.5–6 answer to compare */
  models: ModelAnswer[];
}

/* ------------------------------------------------------------------ */
/* Speaking                                                            */
/* ------------------------------------------------------------------ */

export interface SpeakingPart1Topic {
  id: string; // "s1-01"
  topic: string; // "Hometown"
  questions: string[]; // 4–6
  /** One sample band-8 answer for the first question */
  sample: string;
  tips: string[];
}

export interface CueCard {
  id: string; // "s2-01"
  topic: string; // "A person who helped you"
  prompt: string; // "Describe a person who has helped you recently."
  bullets: string[]; // "You should say: who…, when…, how…, and explain…"
  /** Part 3 discussion questions linked to the card (4–6) */
  part3: string[];
  /** Band 8 sample 2-minute answer (~250–320 words) */
  sample: string;
  /** Sample band-8 answer to the first Part 3 question */
  part3Sample: string;
  vocabulary: string[]; // 8–12 topic phrases
}

/* ------------------------------------------------------------------ */
/* Vocabulary + Grammar                                                */
/* ------------------------------------------------------------------ */

export interface VocabWord {
  word: string;
  pos: string; // "n", "v", "adj", "adv", "phr"
  meaning: string; // simple English definition
  vi: string; // Vietnamese meaning
  example: string; // IELTS-style sentence
  collocations: string[];
  /** Band at which this word typically starts to impress: 6, 7 or 8 */
  level: 6 | 7 | 8;
}

export interface VocabTopic {
  id: string; // "v-education"
  topic: string; // "Education"
  words: VocabWord[]; // 20–30
}

export interface GrammarExercise {
  prompt: string; // sentence with "____" or an instruction such as "Correct the error: …"
  answer: string[]; // accepted answers
  explanation: string;
}

export interface GrammarLesson {
  id: string; // "g01"
  title: string;
  /** Band this structure helps unlock */
  targetBand: number;
  /** Short explanation (markdown-lite: paragraphs separated by \n\n, lines starting "- " are bullets, **bold** allowed) */
  explanation: string;
  examples: string[];
  commonMistakes: { wrong: string; right: string; why: string }[];
  exercises: GrammarExercise[]; // 6–10
}

/* ------------------------------------------------------------------ */
/* Guides                                                              */
/* ------------------------------------------------------------------ */

export interface Guide {
  id: string; // "guide-reading-tfng"
  skill: Skill | 'general';
  title: string;
  summary: string;
  /** markdown-lite body: "## Heading", paragraphs, "- " bullets, "1. " numbered, **bold** */
  body: string;
  /** Vietnamese summary for Vietnamese learners (2–4 sentences) */
  vi: string;
}

/* ------------------------------------------------------------------ */
/* Diagnostic                                                          */
/* ------------------------------------------------------------------ */

export interface DiagnosticItem {
  id: string;
  skill: 'grammar' | 'vocabulary' | 'reading';
  /** Difficulty mapped to the band it discriminates: 4.5, 5.5, 6.5, 7.5, 8.5 */
  band: number;
  prompt: string;
  /** Optional short passage the question refers to */
  passage?: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
}
