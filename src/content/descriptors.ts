/**
 * Plain-language band descriptors (bands 4–9) for IELTS Writing and Speaking.
 *
 * These are ORIGINAL paraphrases written for IELTS Master to help learners
 * self-assess. They are NOT the official IELTS band descriptor wording — for the
 * authoritative text, see the public descriptors published by the test owners.
 */

export type WritingCriterion = 'tr' | 'cc' | 'lr' | 'gra';
export type SpeakingCriterion = 'fc' | 'lr' | 'gra' | 'p';
export type DescriptorSkill = 'writing' | 'speaking';

export interface DescriptorBand {
  band: 4 | 5 | 6 | 7 | 8 | 9;
  /** What a response at this band typically looks like */
  text: string;
  /** Writing TR only: the Task 1 (Task Achievement) version, if different */
  task1?: string;
  /** One concrete action to reach the next band */
  moveUp: string;
  /** Vietnamese one-line summary (bands 5–8 only) */
  vi?: string;
}

export interface CriterionDescriptor<K extends string = string> {
  key: K;
  /** Short code shown in the UI, e.g. "TR", "FC" */
  code: string;
  name: string;
  /** Alternative name for Writing Task 1 (Task Achievement) */
  task1Name?: string;
  /** One-line explanation of what the criterion measures */
  focus: string;
  /** Ordered from band 9 down to band 4 */
  bands: DescriptorBand[];
}

/** Selectable bands for self-assessment: 4, 4.5 … 9 */
export const BAND_OPTIONS: number[] = Array.from({ length: 11 }, (_, i) => 4 + i * 0.5);

export const writingDescriptors: CriterionDescriptor<WritingCriterion>[] = [
  {
    key: 'tr',
    code: 'TR',
    name: 'Task Response',
    task1Name: 'Task Achievement',
    focus: 'Did you answer exactly what was asked, with a clear position (Task 2) or a clear overview of the key features (Task 1), and support your points?',
    bands: [
      {
        band: 9,
        text: 'Every part of the question is answered in depth. Your position is unmistakable from start to finish, and each idea is developed with precise, relevant support.',
        task1: 'Every requirement is met in full. The overview is sharp and well chosen, and the key features are picked out and illustrated with exactly the right data (or, in a letter, the purpose and tone are spot on throughout).',
        moveUp: 'You are at the top. Keep this consistency under exam time pressure.',
      },
      {
        band: 8,
        text: 'All parts of the question are covered thoroughly. Your view is clear, and ideas are well extended and supported, with only an occasional small lapse in focus.',
        task1: 'All requirements are covered well. Key features are clearly presented and backed by accurate, well-selected figures (letters: purpose fully clear, tone consistent).',
        moveUp: 'Make every supporting point precise. Replace any remaining broad generalisation with a specific, explained consequence or example.',
        vi: 'Trả lời đầy đủ, sâu mọi phần đề; quan điểm rõ, ý được phát triển tốt, chỉ đôi chỗ hơi lệch nhẹ.',
      },
      {
        band: 7,
        text: 'All parts of the question are addressed and a clear position runs through the essay. Main ideas are extended and supported, but some may be over-general or lose focus.',
        task1: 'The requirements are covered and there is a clear overview of the main trends, differences or stages. Key features are highlighted but could be developed or illustrated more fully.',
        moveUp: 'Push each main idea one step further: claim, then why, then a concrete example and its result. Cut any sentence that drifts from the question.',
        vi: 'Trả lời mọi phần đề với quan điểm xuyên suốt; ý chính có phát triển nhưng đôi khi còn chung chung.',
      },
      {
        band: 6,
        text: 'All parts of the question are addressed, but some more fully than others. There is a relevant position, though the conclusion may be unclear or repetitive, and some ideas are not developed enough.',
        task1: 'The requirements are addressed and an overview is attempted, but data may be poorly selected. Key features are covered, though some details are irrelevant, missing or inaccurate.',
        moveUp: 'Give every part of the prompt similar weight, state the same opinion in your introduction and conclusion, and support each body paragraph with one developed example.',
        vi: 'Có trả lời đủ các phần nhưng không đều; quan điểm có nhưng kết luận có thể mờ, một số ý chưa được triển khai.',
      },
      {
        band: 5,
        text: 'The question is only partly answered. A position is present but not always clear, there may be no real conclusion, and ideas are limited, thin or mixed with irrelevant detail.',
        task1: 'The task is generally addressed, but details are listed mechanically with no clear overview, and there may be too little data to support the description (letters: purpose not always clear).',
        moveUp: 'Spend 5 minutes planning: list every part the question asks, then note one reason and one example for each before you start writing.',
        vi: 'Chỉ trả lời một phần đề; quan điểm chưa rõ, ý ít và chưa phát triển, có chi tiết lạc đề.',
      },
      {
        band: 4,
        text: 'The response touches the question only minimally or goes off on a tangent. The position is hard to find, and ideas are few, repetitive or unsupported.',
        task1: 'The task is attempted but key features are missed or confused with minor details; the format may be wrong (e.g. a story instead of a report, or no clear letter purpose).',
        moveUp: 'Read the question twice, underline the key task words, and make sure every paragraph clearly answers one of them.',
      },
    ],
  },
  {
    key: 'cc',
    code: 'CC',
    name: 'Coherence and Cohesion',
    focus: 'Is the writing logically organised, with clear paragraphs, and are ideas linked smoothly (linkers, pronouns, referencing)?',
    bands: [
      {
        band: 9,
        text: 'Ideas flow so naturally that the reader never notices the linking. Paragraphing is skilful and every sentence connects effortlessly to the next.',
        moveUp: 'You are at the top. Keep linking invisible and natural.',
      },
      {
        band: 8,
        text: 'Information is sequenced logically and all aspects of linking are handled well. Paragraphs are used sensibly and appropriately.',
        moveUp: 'Reduce explicit linkers further — let pronouns, synonyms and "this/such + noun" referencing carry the flow.',
        vi: 'Bố cục logic, liên kết tốt ở mọi mặt, chia đoạn hợp lý.',
      },
      {
        band: 7,
        text: 'The writing is logically organised with clear progression. A range of linking devices is used, though some are slightly over- or under-used. Each paragraph has a clear central topic.',
        moveUp: 'Replace mechanical "Firstly / Moreover / Furthermore" chains with referencing ("This trend…", "Such a policy…") and make each paragraph open with a clear topic sentence.',
        vi: 'Tổ chức logic, ý tiến triển rõ; dùng nhiều từ nối nhưng đôi khi lạm dụng; mỗi đoạn có ý chính rõ.',
      },
      {
        band: 6,
        text: 'The writing hangs together overall and linkers work, but connections within or between sentences can be faulty or mechanical. References like "it" or "this" are not always clear, and paragraphing is not always logical.',
        moveUp: 'Give each paragraph one job, start it with a topic sentence, and check that every "it/this/they" points clearly to one noun.',
        vi: 'Mạch lạc tổng thể, có từ nối nhưng đôi khi máy móc hoặc sai; quy chiếu (it, this) chưa luôn rõ.',
      },
      {
        band: 5,
        text: 'There is some organisation, but the writing lacks overall progression. Linkers are limited, inaccurate or overused, ideas repeat because of weak referencing, and paragraphs may be missing or poorly divided.',
        moveUp: 'Use a fixed paragraph plan (intro – body – body – conclusion) separated by blank lines, and learn 8–10 linkers with their correct punctuation.',
        vi: 'Có tổ chức nhưng ý không tiến triển; từ nối ít, sai hoặc lặp; chia đoạn chưa hợp lý.',
      },
      {
        band: 4,
        text: 'Information is presented without a clear order. Only basic linkers appear, often repeated or used wrongly, and there may be no paragraphing.',
        moveUp: 'Write in separate paragraphs and connect sentences with simple, correct linkers: because, so, but, however, for example.',
      },
    ],
  },
  {
    key: 'lr',
    code: 'LR',
    name: 'Lexical Resource',
    focus: 'How wide, precise and natural is your vocabulary — word choice, collocation, word form and spelling?',
    bands: [
      {
        band: 9,
        text: 'Vocabulary is wide, natural and sophisticated, used with full control. Any slips are extremely rare and tiny.',
        moveUp: 'You are at the top. Keep choosing the most precise word, not the most impressive one.',
      },
      {
        band: 8,
        text: 'A wide range of words is used fluently and flexibly to express precise meaning. Less common words are handled skilfully, with only occasional mistakes in word choice or collocation, and rare spelling or word-form errors.',
        moveUp: 'Polish collocations: check that each less common word sits with its natural partner (e.g. "pose a threat", not "make a threat").',
        vi: 'Từ vựng rộng, dùng linh hoạt và chính xác; từ ít phổ biến dùng khéo, hiếm khi sai.',
      },
      {
        band: 7,
        text: 'There is enough range for some flexibility and precision. Less common vocabulary is used with awareness of style and collocation, though occasional errors in word choice, spelling or word form appear.',
        moveUp: 'Learn topic words as collocations (verb + noun, adjective + noun) and paraphrase the question instead of copying it.',
        vi: 'Đủ vốn từ để diễn đạt khá linh hoạt; có dùng từ ít phổ biến, có ý thức về kết hợp từ, đôi khi sai.',
      },
      {
        band: 6,
        text: 'The vocabulary is adequate for the task. Less common words are attempted but sometimes used inaccurately, and there are spelling or word-form errors that do not stop the reader understanding.',
        moveUp: 'Replace basic words (good, bad, big, get, a lot of) with precise alternatives, and proofread for word form (economy / economic / economical).',
        vi: 'Từ vựng đủ dùng; có thử từ khó nhưng đôi khi sai; lỗi chính tả/dạng từ chưa gây khó hiểu.',
      },
      {
        band: 5,
        text: 'The range is limited and only just adequate. Noticeable errors in spelling and word formation appear and may make the reader work harder.',
        moveUp: 'Build a personal list of 15–20 words per common topic with an example sentence each, and learn their noun/verb/adjective forms.',
        vi: 'Vốn từ hạn chế, vừa đủ; lỗi chính tả và cấu tạo từ khá rõ, đôi khi gây khó hiểu.',
      },
      {
        band: 4,
        text: 'Only basic vocabulary is used, often repetitively or inappropriately. Control of spelling and word formation is weak, and errors can strain the reader.',
        moveUp: 'Focus on spelling the 500 most common academic words correctly and avoid repeating the same noun — use pronouns or a simple synonym.',
      },
    ],
  },
  {
    key: 'gra',
    code: 'GRA',
    name: 'Grammatical Range and Accuracy',
    focus: 'Do you use a variety of sentence structures, and how accurate are your grammar and punctuation?',
    bands: [
      {
        band: 9,
        text: 'A wide range of structures is used with complete flexibility and accuracy. Only the rarest minor slip appears.',
        moveUp: 'You are at the top. Maintain accuracy even in your most complex sentences.',
      },
      {
        band: 8,
        text: 'A wide range of structures is used, and most sentences are completely error-free. Errors or awkward choices are very occasional.',
        moveUp: 'Hunt the last small errors: articles, plural -s and comma use in long sentences. Re-read every complex sentence once.',
        vi: 'Đa dạng cấu trúc; phần lớn câu không lỗi, chỉ rất thỉnh thoảng sai nhỏ.',
      },
      {
        band: 7,
        text: 'A variety of complex structures is used, many sentences are error-free, and grammar and punctuation are generally well controlled, though a few errors remain.',
        moveUp: 'Raise the share of error-free sentences: limit yourself to complex structures you control (relative, conditional, concessive clauses) and check articles and tense consistency.',
        vi: 'Dùng nhiều câu phức; nhiều câu không lỗi, kiểm soát ngữ pháp và dấu câu tốt, còn vài lỗi.',
      },
      {
        band: 6,
        text: 'A mix of simple and complex sentences is used. There are some grammar and punctuation errors, but they rarely make the meaning unclear.',
        moveUp: 'Use at least one relative clause, one conditional and one concessive clause (although / whereas) per essay, and fix recurring errors from your error log.',
        vi: 'Kết hợp câu đơn và câu phức; có lỗi ngữ pháp/dấu câu nhưng hiếm khi gây hiểu sai.',
      },
      {
        band: 5,
        text: 'The range of structures is limited. Complex sentences are attempted but are less accurate than simple ones, errors are frequent, and punctuation may be faulty, sometimes causing difficulty.',
        moveUp: 'Master the basics first — subject–verb agreement, past vs present tense, articles — then add one complex structure at a time.',
        vi: 'Cấu trúc hạn chế; câu phức hay sai hơn câu đơn, lỗi thường xuyên, dấu câu có thể sai.',
      },
      {
        band: 4,
        text: 'Only a very limited range of structures is used and subordinate clauses are rare. Some simple sentences are correct, but errors dominate and punctuation is often wrong.',
        moveUp: 'Write short, correct sentences first, then join pairs of them with because, when or which.',
      },
    ],
  },
];

export const speakingDescriptors: CriterionDescriptor<SpeakingCriterion>[] = [
  {
    key: 'fc',
    code: 'FC',
    name: 'Fluency and Coherence',
    focus: 'Can you keep talking at length without long pauses, and are your answers logically connected and easy to follow?',
    bands: [
      {
        band: 9,
        text: 'Speech flows freely with only rare repetition or self-correction. Any pauses are for thinking about ideas, not searching for language, and topics are developed fully and coherently.',
        moveUp: 'You are at the top. Keep answers natural rather than rehearsed.',
      },
      {
        band: 8,
        text: 'Speech is fluent with only occasional repetition or self-correction. Hesitation is usually about content rather than language, and topics are developed coherently and appropriately.',
        moveUp: 'Remove the last language-related hesitations by practising follow-up Part 3 questions on unfamiliar topics.',
        vi: 'Nói trôi chảy, hiếm khi lặp hay tự sửa; ngập ngừng chủ yếu vì suy nghĩ ý, phát triển chủ đề mạch lạc.',
      },
      {
        band: 7,
        text: 'You can speak at length without obvious effort or losing the thread. Some hesitation, repetition or self-correction linked to language is noticeable, and connectives and discourse markers are used flexibly.',
        moveUp: 'Extend every answer with a reason and an example, and use natural discourse markers ("Actually…", "The thing is…", "Having said that…").',
        vi: 'Nói dài không quá gắng sức, vẫn mạch lạc; đôi khi ngập ngừng vì tìm từ; dùng từ nối linh hoạt.',
      },
      {
        band: 6,
        text: 'You are willing to speak at length, but coherence slips at times because of repetition, self-correction or hesitation. A range of connectives is used, though not always appropriately.',
        moveUp: 'Use a simple answer shape — direct answer, reason, example — so you never lose your thread, and replace "um" with natural fillers.',
        vi: 'Sẵn sàng nói dài nhưng đôi khi mất mạch vì lặp, tự sửa, ngập ngừng; từ nối chưa luôn phù hợp.',
      },
      {
        band: 5,
        text: 'You usually keep going, but rely on repetition, self-correction or slow speech to do so. Certain connectives are overused, and simple speech is fluent while more complex ideas cause problems.',
        moveUp: 'Practise 1-minute talks on everyday topics daily, recording yourself, aiming for no pauses longer than 2–3 seconds.',
        vi: 'Duy trì được lời nói nhưng phải lặp, tự sửa hoặc nói chậm; lạm dụng vài từ nối; ý phức tạp gây khó khăn.',
      },
      {
        band: 4,
        text: 'You cannot answer without noticeable pauses, may speak slowly with frequent repetition, and link simple sentences with the same few connectives. Coherence sometimes breaks down.',
        moveUp: 'Learn ready answer starters ("I would say…", "To be honest…") and practise linking two sentences with because, so and but.',
      },
    ],
  },
  {
    key: 'lr',
    code: 'LR',
    name: 'Lexical Resource',
    focus: 'How wide and precise is your spoken vocabulary, including idiomatic language, and can you paraphrase when you lack a word?',
    bands: [
      {
        band: 9,
        text: 'Vocabulary is used with full flexibility and precision on every topic, and idiomatic language sounds natural and accurate.',
        moveUp: 'You are at the top. Keep vocabulary natural rather than showy.',
      },
      {
        band: 8,
        text: 'A wide vocabulary is used readily and flexibly to convey precise meaning. Less common and idiomatic expressions are used skilfully with occasional slips, and paraphrase is effective.',
        moveUp: 'Fine-tune idioms: use fewer, but more precise and natural, ones that fit the exact situation.',
        vi: 'Vốn từ rộng, dùng linh hoạt, chính xác; dùng thành ngữ khéo léo, thỉnh thoảng chưa chuẩn; diễn đạt lại tốt.',
      },
      {
        band: 7,
        text: 'Vocabulary is flexible enough to discuss a variety of topics. Some less common and idiomatic words are used with awareness of style and collocation, with some inappropriate choices, and paraphrase is effective.',
        moveUp: 'Learn 8–10 topic collocations per cue-card theme and use them naturally; avoid forced idioms.',
        vi: 'Đủ từ để bàn nhiều chủ đề; có dùng từ ít phổ biến và thành ngữ, đôi khi chưa phù hợp; diễn đạt lại hiệu quả.',
      },
      {
        band: 6,
        text: 'Vocabulary is wide enough to talk at length and make meaning clear, despite some inappropriate choices. Paraphrase is generally successful.',
        moveUp: 'Replace general words (good, nice, thing, very) with precise adjectives and collocations from the topic vocabulary lists.',
        vi: 'Đủ từ để nói dài và rõ ý dù đôi chỗ dùng chưa đúng; nhìn chung diễn đạt lại được.',
      },
      {
        band: 5,
        text: 'You can talk about familiar and unfamiliar topics but with limited flexibility. Paraphrase is attempted with mixed success.',
        moveUp: 'When you lack a word, describe it ("the thing you use to…") instead of stopping, and learn core words for 20 common topics.',
        vi: 'Nói được về chủ đề quen và lạ nhưng thiếu linh hoạt; diễn đạt lại lúc được lúc không.',
      },
      {
        band: 4,
        text: 'You can talk about familiar topics but only convey basic meaning on unfamiliar ones. Word-choice errors are frequent and paraphrase is rare.',
        moveUp: 'Build basic topic vocabulary (family, work, hometown, hobbies) and practise describing things you do not know the word for.',
      },
    ],
  },
  {
    key: 'gra',
    code: 'GRA',
    name: 'Grammatical Range and Accuracy',
    focus: 'Do you use a range of spoken structures, and how accurate are they?',
    bands: [
      {
        band: 9,
        text: 'A full range of structures is used naturally and appropriately, consistently accurate apart from the kind of slips native speakers make.',
        moveUp: 'You are at the top. Keep structures natural for speech, not written-style.',
      },
      {
        band: 8,
        text: 'A wide range of structures is used flexibly. Most sentences are error-free, with only occasional inappropriate forms or basic slips.',
        moveUp: 'Listen back for persistent small errors (articles, third-person -s, past tense) and drill them out.',
        vi: 'Dùng đa dạng cấu trúc linh hoạt; phần lớn câu không lỗi, thỉnh thoảng sai nhỏ.',
      },
      {
        band: 7,
        text: 'A range of complex structures is used with some flexibility. Many sentences are error-free, though some errors persist.',
        moveUp: 'Use more varied complex forms naturally — conditionals for hypothetical Part 3 questions, relative clauses, and past perfect for stories — and check accuracy on recordings.',
        vi: 'Dùng nhiều cấu trúc phức khá linh hoạt; nhiều câu không lỗi nhưng vẫn còn lỗi lặp lại.',
      },
      {
        band: 6,
        text: 'A mix of simple and complex structures is used but with limited flexibility. Complex sentences often contain errors, though these rarely cause misunderstanding.',
        moveUp: 'Pick three structures (relative clause, second conditional, present perfect) and use each deliberately in every practice answer until they are accurate.',
        vi: 'Kết hợp câu đơn và phức nhưng chưa linh hoạt; câu phức hay sai nhưng hiếm khi gây hiểu nhầm.',
      },
      {
        band: 5,
        text: 'Basic sentence forms are reasonably accurate. Complex structures are limited, usually contain errors and may cause comprehension problems.',
        moveUp: 'Make simple tenses accurate first (present simple, past simple, future), then add "because / when / if" clauses.',
        vi: 'Câu cơ bản khá chính xác; ít câu phức và thường sai, có thể gây khó hiểu.',
      },
      {
        band: 4,
        text: 'Basic sentence forms appear with some correct simple sentences, but subordinate structures are rare. Errors are frequent and may lead to misunderstanding.',
        moveUp: 'Practise speaking in full, simple sentences with correct verb forms before trying longer structures.',
      },
    ],
  },
  {
    key: 'p',
    code: 'P',
    name: 'Pronunciation',
    focus: 'How easy are you to understand — individual sounds, word and sentence stress, rhythm, intonation and connected speech?',
    bands: [
      {
        band: 9,
        text: 'A full range of pronunciation features is used precisely and subtly. You are effortless to understand from start to finish.',
        moveUp: 'You are at the top. Accent is never the issue — keep it clear.',
      },
      {
        band: 8,
        text: 'A wide range of pronunciation features is used flexibly, with only occasional lapses. You are easy to understand throughout and your first-language accent has very little effect.',
        moveUp: 'Work on subtle features: sentence stress for emphasis and intonation that signals attitude or contrast.',
        vi: 'Dùng tốt nhiều đặc điểm phát âm, thỉnh thoảng sai; rất dễ hiểu, giọng mẹ đẻ ảnh hưởng ít.',
      },
      {
        band: 7,
        text: 'You show everything at band 6 and some of the features of band 8 — generally clear, with good control of stress and intonation much of the time.',
        moveUp: 'Shadow short native recordings daily to make rhythm, linking ("turn_it_off") and word stress consistent.',
        vi: 'Đạt mọi điểm của band 6 và một số điểm của band 8: nói rõ, ngữ điệu và trọng âm khá tốt.',
      },
      {
        band: 6,
        text: 'A range of pronunciation features is used with mixed control. Some stress and intonation are effective but not sustained; you are generally understood, though some words or sounds are unclear at times.',
        moveUp: 'Fix final consonants (-s, -ed, -t, -k), which Vietnamese speakers often drop, and practise word stress on multi-syllable words.',
        vi: 'Phát âm có kiểm soát nhưng chưa đều; nhìn chung dễ hiểu, đôi khi phát âm sai làm giảm độ rõ.',
      },
      {
        band: 5,
        text: 'You show everything at band 4 and some of the features of band 6 — understandable most of the time, but mispronunciations are noticeable.',
        moveUp: 'Record yourself and compare with a model: focus on ending sounds and on stressing the right syllable in key words.',
        vi: 'Đạt mọi điểm của band 4 và một số điểm của band 6: phần lớn hiểu được nhưng lỗi phát âm khá rõ.',
      },
      {
        band: 4,
        text: 'Only a limited range of pronunciation features is used. Control is attempted but lapses are frequent, and mispronunciations cause some difficulty for the listener.',
        moveUp: 'Practise the core English sounds missing in your first language, and slow down slightly so each word is clear.',
      },
    ],
  },
];

export function descriptorsFor(skill: DescriptorSkill): CriterionDescriptor[] {
  return skill === 'writing' ? writingDescriptors : speakingDescriptors;
}

export function findCriterion(skill: DescriptorSkill, key: string): CriterionDescriptor | undefined {
  return descriptorsFor(skill).find((c) => c.key === key);
}

/** Display name of a criterion (TR becomes "Task Achievement" for Writing Task 1). */
export function criterionName(skill: DescriptorSkill, key: string, task?: 1 | 2): string {
  const c = findCriterion(skill, key);
  if (!c) return key.toUpperCase();
  return task === 1 && c.task1Name ? c.task1Name : c.name;
}

/**
 * Descriptor lookup for a (possibly half) band. A half band such as 6.5 means
 * "all of band 6 and some of band 7", so we return the lower band plus the one above.
 */
export function descriptorFor(
  skill: DescriptorSkill,
  key: string,
  band: number,
  task?: 1 | 2,
): { lower: DescriptorBand; upper?: DescriptorBand; text: string; moveUp: string; isHalf: boolean } | undefined {
  const c = findCriterion(skill, key);
  if (!c) return undefined;
  const b = Math.max(4, Math.min(9, band));
  const floor = Math.floor(b);
  const isHalf = b - floor >= 0.5 && floor < 9;
  const lower = c.bands.find((x) => x.band === floor);
  if (!lower) return undefined;
  const upper = isHalf ? c.bands.find((x) => x.band === floor + 1) : undefined;
  const textOf = (d: DescriptorBand) => (task === 1 && d.task1 ? d.task1 : d.text);
  return { lower, upper, text: textOf(lower), moveUp: lower.moveUp, isHalf };
}

/** Text helper used by both the table and the self-assessment UIs. */
export function bandText(d: DescriptorBand, task?: 1 | 2): string {
  return task === 1 && d.task1 ? d.task1 : d.text;
}
