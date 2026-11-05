/**
 * Instant, offline feedback on an essay. It is NOT an examiner score — it flags
 * measurable features that strongly correlate with each IELTS criterion.
 */

export interface Issue {
  criterion: 'TR' | 'CC' | 'LR' | 'GRA';
  severity: 'high' | 'medium' | 'low';
  message: string;
  excerpt?: string;
}

export interface Analysis {
  words: number;
  paragraphs: number;
  sentences: number;
  avgSentenceLength: number;
  sentenceVariety: number; // std-dev of sentence length
  lexicalDiversity: number; // MATTR (0–1)
  linkers: { found: string[]; distinct: number; mechanical: string[] };
  complexSentenceRatio: number;
  overused: { word: string; count: number }[];
  issues: Issue[];
  estimate: { tr: number; cc: number; lr: number; gra: number; overall: number };
}

const STOP = new Set(
  'a an the and or but if of to in on at for with by from as is are was were be been being it its this that these those there their they them he she his her we our you your i my me not no do does did have has had will would can could should may might must also than then so such very more most many much some any all each other into about over after before which who whom whose what when where why how one two'.split(
    ' ',
  ),
);

const LINKERS = [
  'however', 'moreover', 'furthermore', 'in addition', 'additionally', 'therefore', 'consequently', 'as a result', 'thus', 'hence', 'nevertheless', 'nonetheless',
  'on the other hand', 'in contrast', 'by contrast', 'whereas', 'while', 'although', 'even though', 'despite', 'in spite of', 'for example', 'for instance', 'such as',
  'in particular', 'notably', 'similarly', 'likewise', 'in conclusion', 'to conclude', 'overall', 'in summary', 'firstly', 'secondly', 'thirdly', 'finally', 'lastly',
  'first of all', 'meanwhile', 'subsequently', 'this means', 'this is because', 'that is why', 'otherwise', 'instead', 'rather', 'admittedly', 'undoubtedly', 'to some extent',
];
const MECHANICAL = ['firstly', 'secondly', 'thirdly', 'lastly', 'first of all', 'moreover', 'furthermore', 'in addition'];

const INFORMAL: [RegExp, string][] = [
  [/\b(gonna|wanna|gotta)\b/gi, 'Very informal — never use in IELTS writing.'],
  [/\b(kids)\b/gi, 'Informal — use "children".'],
  [/\b(stuff|things like that|and so on|etc)\b/gi, 'Vague/informal — give a specific example instead.'],
  [/\b(a lot of|lots of)\b/gi, 'Informal-ish — try "a large number of", "a great deal of", "numerous", "considerable".'],
  [/\b(nowadays,? (?:in|on) the world)\b/gi, 'Unnatural phrasing.'],
  [/\b(get|got)\b/gi, '"get" is vague — consider obtain / become / receive / earn.'],
  [/\b(big|huge)\b/gi, 'Basic adjective — consider substantial / significant / considerable.'],
  [/\b(good|bad)\b/gi, 'Basic adjective — consider beneficial / detrimental / advantageous / harmful.'],
];

const GRAMMAR: [RegExp, string][] = [
  [/\bin nowadays\b/gi, '"in nowadays" ✗ → "nowadays" or "these days".'],
  [/\bpeople (is|was|has)\b/gi, '"people" is plural → "people are / were / have".'],
  [/\b(?:many|most|some|young|older|other) people (thinks|believes|says|wants|needs|likes|prefers|feels|argues|claims|spends|uses)\b/gi, '"people" is plural → no "-s" on the verb (people think, people believe).'],
  [/\b(informations|advices|knowledges|equipments|furnitures|researches|evidences|feedbacks|homeworks|vocabularies)\b/gi, 'Uncountable noun — no plural "-s".'],
  [/\bdiscuss about\b/gi, '"discuss about" ✗ → "discuss" (no preposition).'],
  [/\bemphasi[sz]e on\b/gi, '"emphasise on" ✗ → "emphasise" or "put emphasis on".'],
  [/\bdespite of\b/gi, '"despite of" ✗ → "despite" or "in spite of".'],
  [/\balthough\b[^.!?]{0,80}\bbut\b/gi, '"although … but" ✗ — use only one of them.'],
  [/\bbecause of (?:they|he|she|it is|people are|we)\b/gi, '"because of" + clause ✗ → "because" + clause, or "because of" + noun.'],
  [/\bmore (better|easier|cheaper|faster|bigger|worse)\b/gi, 'Double comparative ✗ — remove "more".'],
  [/\b(a) (?=[aeiou][a-z])(?!(?:uni|use|usu|eu|one|once|euro))\w+/gi, 'Check article: use "an" before a vowel sound.'],
  [/\b(an) (?=[bcdfgjklmnpqrstvwxyz])(?!(?:hour|honest|honour|heir|mba|fbi|nhs))\w+/gi, 'Check article: use "a" before a consonant sound.'],
  [/\bthe (society|nature|people in general)\b/gi, 'Generic meaning usually takes no article: "society", "nature".'],
  [/\b(it|he|she) (have|do|are|were)\b/gi, 'Subject–verb agreement: singular subject needs singular verb.'],
  [/\b(can|could|will|would|should|must|may|might) (to \w+|\w+[^e]ed)\b/gi, 'After a modal verb use the bare infinitive (can go, not can goes/went).'],
  [/\b(don't|doesn't|can't|won't|isn't|aren't|wasn't|weren't|it's|I'm|they're|there's)\b/g, 'Avoid contractions in academic writing.'],
  [/\b(?:I think|I believe)\b(?=[^.]*\bI think\b)/gi, 'Repeated "I think" — vary: "In my view", "I would argue that", "It seems to me that".'],
  [/, (however|therefore|moreover|thus)\b,? /gi, 'Comma splice risk: use a full stop or semicolon before "however/therefore": "…; however, …".'],
];

function sentencesOf(text: string) {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 2);
}

function mattr(tokens: string[], window = 50) {
  if (tokens.length < window) return tokens.length ? new Set(tokens).size / tokens.length : 0;
  let sum = 0;
  let n = 0;
  for (let i = 0; i + window <= tokens.length; i += 5) {
    sum += new Set(tokens.slice(i, i + window)).size / window;
    n++;
  }
  return sum / n;
}

const clamp = (x: number, lo = 4, hi = 8.5) => Math.max(lo, Math.min(hi, Math.round(x * 2) / 2));

export function analyseEssay(text: string, task: 1 | 2, prompt = '', module: 'academic' | 'general' = 'academic'): Analysis {
  const clean = text.trim();
  const tokens = (clean.toLowerCase().match(/[a-z']+/g) ?? []) as string[];
  const words = tokens.length;
  const paragraphs = clean.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const sents = sentencesOf(clean);
  const lens = sents.map((s) => s.split(/\s+/).length);
  const avg = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  const sd = lens.length ? Math.sqrt(lens.reduce((a, b) => a + (b - avg) ** 2, 0) / lens.length) : 0;
  const lower = ' ' + clean.toLowerCase().replace(/\s+/g, ' ') + ' ';
  const found = LINKERS.filter((l) => new RegExp(`\\b${l}\\b`).test(lower));
  const mechanical = MECHANICAL.filter((l) => found.includes(l));
  const complex = sents.filter((s) => /\b(which|who|whose|whom|although|though|whereas|while|because|since|unless|if|when|even though|so that|in order to|despite|not only|having|which means)\b/i.test(s) || /,\s*\w+ing\b/.test(s)).length;
  const complexRatio = sents.length ? complex / sents.length : 0;
  const ld = mattr(tokens.filter((t) => t.length > 1));

  const freq = new Map<string, number>();
  tokens.filter((t) => !STOP.has(t) && t.length > 3).forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1));
  const promptWords = new Set((prompt.toLowerCase().match(/[a-z]+/g) ?? []).filter((t) => !STOP.has(t) && t.length > 3));
  const overused = [...freq.entries()]
    .filter(([w, c]) => c >= Math.max(4, Math.round(words / 70)) && !promptWords.has(w))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => ({ word, count }));

  const issues: Issue[] = [];
  const min = task === 1 ? 150 : 250;
  if (words < min) issues.push({ criterion: 'TR', severity: 'high', message: `Under length: ${words}/${min} words. Under-length answers lose marks in Task Response/Achievement.` });
  if (task === 2 && words > 380) issues.push({ criterion: 'TR', severity: 'low', message: `${words} words — long essays waste time and add errors. Aim for 270–320.` });
  if (paragraphs < (task === 1 ? 3 : 4)) issues.push({ criterion: 'CC', severity: 'high', message: `Only ${paragraphs} paragraph(s). Use ${task === 1 ? '3–4 (intro, overview, 1–2 detail paragraphs)' : '4–5 (intro, 2–3 body, conclusion)'} separated by blank lines.` });

  if (task === 1 && module === 'academic' && !/\b(overall|in general|it is clear|it is evident|generally|the most striking|in summary)\b/i.test(clean))
    issues.push({ criterion: 'TR', severity: 'high', message: 'No clear overview found. Without an overview, Task Achievement is usually capped at band 5. Start a paragraph with "Overall, …" summarising the main trends.' });
  if (task === 1 && module === 'academic' && !/\d/.test(clean)) issues.push({ criterion: 'TR', severity: 'high', message: 'No figures quoted. Support key features with data from the chart.' });
  if (task === 1 && module === 'academic' && /\b(i think|i believe|in my opinion)\b/i.test(clean)) issues.push({ criterion: 'TR', severity: 'medium', message: 'Academic Task 1 must not contain opinions — report the data only.' });
  if (task === 1 && module === 'general' && !/^\s*dear\b/i.test(clean)) issues.push({ criterion: 'TR', severity: 'medium', message: 'A letter should begin with "Dear …,".' });
  if (task === 1 && module === 'general' && !/(yours (sincerely|faithfully)|best (wishes|regards)|kind regards|regards|love|cheers|all the best)/i.test(clean)) issues.push({ criterion: 'CC', severity: 'medium', message: 'Add an appropriate sign-off (Yours faithfully / Yours sincerely / Best wishes).' });

  if (task === 2) {
    const intro = clean.split(/\n\s*\n/)[0] ?? '';
    const outro = clean.split(/\n\s*\n/).at(-1) ?? '';
    const pos = /\b(i (strongly |completely |partly |largely )?(agree|disagree|believe|would argue|maintain|contend)|in my (view|opinion)|from my perspective|this essay (will )?(argue|contend)|i am convinced|it seems to me|outweigh)/i;
    if (/\b(agree|disagree|opinion|view|outweigh|positive or negative)\b/i.test(prompt) && !pos.test(intro))
      issues.push({ criterion: 'TR', severity: 'high', message: 'Your position is not stated in the introduction. State a clear opinion in the first paragraph and keep it consistent.' });
    if (!/\b(in conclusion|to conclude|to sum up|in summary|overall|all things considered|on balance)\b/i.test(outro))
      issues.push({ criterion: 'CC', severity: 'medium', message: 'No clear conclusion found. End with a short paragraph that restates your position.' });
    if (!/\b(for example|for instance|such as|a case in point|to illustrate|e\.g\.)\b/i.test(clean))
      issues.push({ criterion: 'TR', severity: 'medium', message: 'No examples found. Develop each main idea with a specific example or result.' });
    const keywords = [...promptWords].filter((w) => !/^(some|people|think|believe|others|discuss|both|views|give|your|opinion|extent|agree|disagree|reasons|answer|include|relevant|examples|knowledge|experience|write|least|words)$/.test(w));
    const missing = keywords.filter((w) => !lower.includes(w.slice(0, Math.max(4, w.length - 2))));
    if (keywords.length >= 3 && missing.length / keywords.length > 0.6)
      issues.push({ criterion: 'TR', severity: 'high', message: `Your essay may be off-topic: few key ideas from the question appear (${missing.slice(0, 5).join(', ')}). Address every part of the prompt.` });
  }

  if (found.length < 4) issues.push({ criterion: 'CC', severity: 'medium', message: `Few linking devices (${found.length}). Use a range: however, as a result, for instance, whereas, this means that…` });
  if (mechanical.length >= 4) issues.push({ criterion: 'CC', severity: 'low', message: `Mechanical linking (${mechanical.join(', ')}). Band 7 needs linking that flows naturally, e.g. referencing ("This trend…", "Such policies…").` });
  if (avg > 32) issues.push({ criterion: 'GRA', severity: 'medium', message: `Very long sentences (avg ${avg.toFixed(0)} words) — risk of run-ons. Split some sentences.` });
  if (avg < 11 && sents.length > 4) issues.push({ criterion: 'GRA', severity: 'medium', message: `Short simple sentences (avg ${avg.toFixed(0)} words). Combine ideas with relative clauses, although/whereas, participle clauses.` });
  if (complexRatio < 0.35 && sents.length > 4) issues.push({ criterion: 'GRA', severity: 'medium', message: `Only ${Math.round(complexRatio * 100)}% of sentences are complex. Band 7 needs a frequent mix of complex structures.` });
  if (overused.length) issues.push({ criterion: 'LR', severity: overused[0].count > 7 ? 'medium' : 'low', message: `Repeated words: ${overused.map((o) => `${o.word} ×${o.count}`).join(', ')}. Use synonyms or pronouns.` });
  if (ld < 0.62 && words > 120) issues.push({ criterion: 'LR', severity: 'medium', message: 'Limited vocabulary range. Use topic collocations from the Vocabulary section.' });

  for (const [re, msg] of INFORMAL) {
    const m = clean.match(re);
    if (m && (task === 2 || module === 'academic')) issues.push({ criterion: 'LR', severity: 'low', message: msg, excerpt: [...new Set(m.map((x) => x.toLowerCase()))].slice(0, 3).join(', ') });
  }
  for (const [re, msg] of GRAMMAR) {
    if (task === 1 && module === 'general' && /contractions/.test(msg)) continue;
    const m = clean.match(re);
    if (m) issues.push({ criterion: 'GRA', severity: 'medium', message: msg, excerpt: [...new Set(m.map((x) => x.trim()))].slice(0, 3).join(' · ') });
  }

  // Heuristic estimate — deliberately conservative, range 4–8.5
  const penalties = (c: Issue['criterion']) => issues.filter((i) => i.criterion === c).reduce((a, i) => a + (i.severity === 'high' ? 1 : i.severity === 'medium' ? 0.5 : 0.25), 0);
  const base = words < min * 0.6 ? 4.5 : 7;
  const tr = clamp(base - penalties('TR'));
  const cc = clamp(base + (found.length >= 7 && mechanical.length < 3 ? 0.5 : 0) - penalties('CC'));
  const lr = clamp(base + (ld > 0.72 ? 0.5 : 0) - penalties('LR'));
  const gra = clamp(base + (complexRatio > 0.55 ? 0.5 : 0) - penalties('GRA') * 0.8);
  const overall = Math.floor(((tr + cc + lr + gra) / 4) * 2) / 2;

  return {
    words,
    paragraphs,
    sentences: sents.length,
    avgSentenceLength: Math.round(avg * 10) / 10,
    sentenceVariety: Math.round(sd * 10) / 10,
    lexicalDiversity: Math.round(ld * 100) / 100,
    linkers: { found, distinct: found.length, mechanical },
    complexSentenceRatio: Math.round(complexRatio * 100) / 100,
    overused,
    issues,
    estimate: { tr, cc, lr, gra, overall },
  };
}

/** Speaking transcript metrics (from speech recognition). */
export function analyseSpeech(transcript: string, seconds: number) {
  const tokens = (transcript.toLowerCase().match(/[a-z']+/g) ?? []) as string[];
  const fillers = tokens.filter((t) => ['um', 'uh', 'er', 'erm', 'ah', 'hmm', 'like'].includes(t)).length;
  const wpm = seconds > 0 ? Math.round((tokens.length / seconds) * 60) : 0;
  const ld = mattr(tokens, 40);
  const found = LINKERS.filter((l) => new RegExp(`\\b${l}\\b`).test(transcript.toLowerCase()));
  const tips: string[] = [];
  if (wpm && wpm < 100) tips.push(`Speaking rate ${wpm} words/min is slow — band 7 speakers usually manage 120–160 without long pauses. Practise shadowing.`);
  if (wpm > 190) tips.push(`Very fast (${wpm} wpm) — slow down slightly so pronunciation stays clear.`);
  if (tokens.length && fillers / tokens.length > 0.05) tips.push(`Many fillers (${fillers}). Replace "um/uh" with natural fillers: "Well, …", "Let me think…", "That's an interesting question".`);
  if (ld < 0.6 && tokens.length > 60) tips.push('Vocabulary range seems narrow — use the topic phrases listed with the cue card.');
  if (found.length < 2 && tokens.length > 60) tips.push('Use more discourse markers: "Actually", "What I mean is", "On the other hand", "The thing is".');
  return { words: tokens.length, wpm, fillers, lexicalDiversity: Math.round(ld * 100) / 100, linkers: found, tips };
}
