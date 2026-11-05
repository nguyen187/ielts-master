/**
 * Automatic, offline speaking estimate (no API key). Works on the speech-to-text transcript,
 * speaking time and — when the browser provides it — recogniser confidence as a proxy for
 * how clearly the learner was understood. Indicative only: an examiner hears things a
 * transcript cannot show (intonation, word stress, hesitation inside words).
 */
import { allWords } from '../content';
import { criteriaBand } from './scoring';
import { mattr } from './writingAnalysis';

export interface CriterionScore {
  band: number;
  notes: string[];
}
export interface AutoSpeakingScore {
  fc: CriterionScore;
  lr: CriterionScore;
  gra: CriterionScore;
  p: CriterionScore;
  band: number;
  words: number;
  wpm: number;
  /** pronunciation is only measured when the recogniser reported confidence */
  pronunciationMeasured: boolean;
}

const FILLERS = new Set(['um', 'uh', 'er', 'erm', 'ah', 'hmm', 'mm']);
const MARKERS = [
  'actually', 'well', 'i mean', 'the thing is', 'to be honest', 'on the other hand', 'for example', 'for instance', 'such as', 'because', 'so', 'however',
  'although', 'but', 'what i mean is', 'in my opinion', 'personally', 'as far as i know', 'i guess', 'i suppose', 'in fact', 'apart from that', 'besides',
  'anyway', 'as a result', 'that is why', "that's why", 'on top of that', 'not only', 'whereas', 'while', 'in contrast', 'overall', 'basically',
];
const SUBORDINATORS = /\b(because|although|though|which|who|whose|whom|if|unless|when|whenever|while|whereas|since|so that|even though|as soon as|until|where|that's why|the reason (?:why|is that))\b/g;
const BASIC = new Set(['good', 'bad', 'nice', 'very', 'really', 'thing', 'things', 'stuff', 'big', 'a lot', 'lot', 'like', 'get', 'got']);
const COMMON = new Set(
  'about after again against also always another around because before being between both business child children company could country different during every family friend friends going government group house important people place problem public really right school something sometimes student system thinking through together usually without working actually probably especially everything interesting definitely different education something someone anything everyone nowadays remember yourself themselves understand'.split(' '),
);

/** grammar slips that are still visible in a speech transcript (no punctuation / contraction rules) */
const SPEECH_GRAMMAR: [RegExp, string][] = [
  [/\bpeople (is|was|has|doesn't|does)\b/g, '"people" is plural → people are / were / have / don\'t'],
  [/\b(he|she|it) (have|do|don't|are|were|go|want|like|make|think)\b/g, 'he / she / it + verb-s (she has, he doesn\'t, it goes)'],
  [/\b(you|we|they) (has|does|doesn't|is|was|goes|wants|likes|makes)\b/g, 'subject–verb agreement (they have, we were, you do)'],
  [/\bi (has|does|doesn't|is|goes|wants|likes|makes|are)\b/g, 'subject–verb agreement with "I" (I have, I do, I am, I go)'],
  [/\b(can|could|will|would|should|must|may|might) (to \w+|\w+ed|\w+s)\b/g, 'after can / will / should use the bare verb (can go, will be)'],
  [/\b(informations|advices|knowledges|equipments|furnitures|homeworks|stuffs)\b/g, 'uncountable noun — no plural -s'],
  [/\bmore (better|easier|cheaper|faster|bigger|worse)\b/g, 'double comparative — drop "more"'],
  [/\bdiscuss about\b/g, '"discuss about" → "discuss"'],
  [/\bin nowadays\b/g, '"in nowadays" → "nowadays"'],
  [/\bdespite of\b/g, '"despite of" → "despite"'],
  [/\b(yesterday|last (?:week|year|month|night|summer)|when i was (?:a )?(?:child|kid|young)|years ago)\b[^.?!]{0,40}\b(go|have|do|see|take|make|eat|buy|visit|come)\b/g, 'past time → past tense (went, had, did, visited)'],
  [/\bi am agree\b/g, '"I am agree" → "I agree"'],
  [/\bhow it is\b(?= (?:look|like))/g, 'question word order'],
];

const TOPIC_PHRASES = [...new Set(allWords.map((w) => w.word.toLowerCase()).filter((w) => w.length >= 6))];

const r2 = (x: number) => Math.max(4, Math.min(8, Math.round(x * 2) / 2));
const count = (text: string, re: RegExp) => (text.match(re) ?? []).length;

export function scoreSpeechAuto(
  transcript: string,
  seconds: number,
  opts: { part?: 1 | 2 | 3; answers?: number; confidence?: number | null } = {},
): AutoSpeakingScore | null {
  const text = ` ${transcript.toLowerCase().replace(/\[part \d\][^\n]*\n/g, ' ').replace(/[^a-z' \n]/g, ' ').replace(/\s+/g, ' ')} `;
  const tokens = text.trim().split(' ').filter(Boolean);
  const words = tokens.filter((t) => !FILLERS.has(t));
  if (words.length < 25 || seconds < 10) return null;
  const n = words.length;
  const per100 = (k: number) => (k / n) * 100;
  const wpm = Math.round((n / seconds) * 60);
  const answers = Math.max(1, opts.answers ?? 1);

  /* ---- Fluency & Coherence ---- */
  const fc: string[] = [];
  let f = wpm < 60 ? 4.5 : wpm < 80 ? 5 : wpm < 100 ? 5.5 : wpm < 115 ? 6 : wpm < 135 ? 6.5 : 7;
  fc.push(`${wpm} words per minute (band 7 speakers usually manage 120–160 with few pauses).`);
  const fillerRate = (tokens.length - n) / tokens.length;
  if (fillerRate > 0.08) (f -= 1), fc.push(`Many hesitation sounds (${Math.round(fillerRate * 100)}% of words were um/uh).`);
  else if (fillerRate > 0.04) (f -= 0.5), fc.push('Some hesitation (um/uh) — use natural fillers like "Well, let me think…".');
  const markers = MARKERS.filter((m) => text.includes(` ${m} `)).length;
  if (markers >= 6) (f += 0.5), fc.push(`Good range of discourse markers (${markers} different ones).`);
  else if (markers <= 2) (f -= 0.5), fc.push('Few linking words — connect ideas with because, so, actually, for example, on the other hand.');
  const repeats = count(text, /\b(\w+) \1\b/g);
  if (per100(repeats) > 3) (f -= 0.5), fc.push('Frequent self-repetition ("I I", "the the") — slow down a little.');
  const avgLen = n / answers;
  const part = opts.part ?? 1;
  if (part === 2 && answers === 1 && n < 120) (f -= 1), fc.push(`Part 2 talk was short (${n} words) — aim for 1.5–2 minutes, about 200+ words.`);
  else if (part !== 2 && avgLen < 20) (f -= 0.5), fc.push(`Answers are short (about ${Math.round(avgLen)} words each) — add a reason and an example.`);
  else if (avgLen >= 35) fc.push('Answers are well developed in length.');

  /* ---- Lexical Resource ---- */
  const lr: string[] = [];
  const ld = mattr(words, 40);
  let l = ld < 0.6 ? 5 : ld < 0.68 ? 5.5 : ld < 0.75 ? 6 : ld < 0.82 ? 6.5 : 7;
  lr.push(`Vocabulary variety ${Math.round(ld * 100)}% (different words in each stretch of 40).`);
  const rare = new Set(words.filter((w) => w.length >= 8 && !COMMON.has(w)));
  if (per100(rare.size) >= 7) (l += 0.5), lr.push(`Good use of less common words (e.g. ${[...rare].slice(0, 4).join(', ')}).`);
  else if (per100(rare.size) < 3) (l -= 0.5), lr.push('Mostly everyday words — try more precise ones (e.g. "fascinating", "convenient", "overwhelming").');
  const topic = TOPIC_PHRASES.filter((p) => text.includes(` ${p} `));
  if (topic.length >= 3) (l += 0.5), lr.push(`Topic vocabulary / collocations used: ${topic.slice(0, 4).join(', ')}.`);
  const basic = words.filter((w) => BASIC.has(w)).length;
  if (per100(basic) > 6) (l -= 0.5), lr.push('Heavy use of basic words (good, nice, very, really, thing) — paraphrase them.');

  /* ---- Grammatical Range & Accuracy ---- */
  const gra: string[] = [];
  const errs: string[] = [];
  let errCount = 0;
  for (const [re, msg] of SPEECH_GRAMMAR) {
    const k = count(text, re);
    if (k) (errCount += k), errs.push(msg);
  }
  const errRate = per100(errCount);
  let g = errRate === 0 ? 7 : errRate < 1 ? 6.5 : errRate < 2 ? 6 : errRate < 3.5 ? 5.5 : 5;
  if (errs.length) gra.push(`Possible errors: ${errs.slice(0, 3).join('; ')}.`);
  else gra.push('No common errors detected in the transcript.');
  const complex = per100(count(text, SUBORDINATORS));
  if (complex >= 4) (g += 0.5), gra.push('Good mix of complex sentences (because / which / if / although…).');
  else if (complex < 1.5) (g -= 0.5), gra.push('Mostly simple sentences — add clauses with which, although, if, when.');
  const tenses = [
    /\b(was|were|did|went|had|\w{3,}ed)\b/.test(text),
    /\b(will|going to)\b/.test(text),
    /\b(have|has) (been|\w+ed|done|seen|gone|made|had)\b/.test(text),
    /\b(would|could) (\w+)\b/.test(text),
    /\b(am|is|are) \w+ing\b/.test(text),
  ].filter(Boolean).length;
  if (tenses >= 4) (g += 0.5), gra.push('Good range of tenses and forms (past, future, perfect, conditional).');
  else if (tenses <= 2) (g -= 0.5), gra.push('Limited tense range — show past, perfect and "would" forms where natural.');

  /* ---- Pronunciation (proxy) ---- */
  const pr: string[] = [];
  const c = opts.confidence;
  const measured = c != null && c > 0;
  let p: number;
  if (measured) {
    p = c >= 0.92 ? 7 : c >= 0.87 ? 6.5 : c >= 0.82 ? 6 : c >= 0.75 ? 5.5 : 5;
    pr.push(`Speech recogniser understood you with ${Math.round(c * 100)}% confidence — a rough guide to how clear your speech is.`);
    if (p >= 6.5) pr.push('Clear enough to be understood easily. Work on word stress and intonation to go higher.');
    else pr.push('Some words were hard to recognise — practise final sounds (-s, -ed, -t) and word stress by shadowing.');
  } else {
    p = Math.min(6, r2((f + l) / 2));
    pr.push('This browser did not report recognition confidence, so pronunciation is estimated from fluency only. Listen to your recording and compare with the band 8 sample.');
  }

  const fcB = r2(f);
  const lrB = r2(l);
  const graB = r2(g);
  const pB = Math.min(r2(p), 7.5);
  let band = criteriaBand([fcB, lrB, graB, pB]);
  if (n < 60) band = Math.min(band, 5.5);
  return { fc: { band: fcB, notes: fc }, lr: { band: lrB, notes: lr }, gra: { band: graB, notes: gra }, p: { band: pB, notes: pr }, band, words: n, wpm, pronunciationMeasured: measured };
}
