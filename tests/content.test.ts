/**
 * Content QA gate — every content file must pass these checks before release.
 * Run: npx vitest run tests/content.test.ts
 */
import { describe, it, expect } from 'vitest';
import type { QuestionGroup, ReadingPassage, ListeningTest, WritingTask, VocabTopic, GrammarLesson, CueCard, SpeakingPart1Topic, Guide, DiagnosticItem } from '../src/content/types';

const modules = import.meta.glob('../src/content/data/*.ts', { eager: true }) as Record<string, Record<string, unknown>>;
const all = (name: string) => Object.values(modules).flatMap((m) => (Array.isArray(m[name]) ? (m[name] as unknown[]) : []));

const reading = [...all('readingA'), ...all('readingB')] as ReadingPassage[];
const listening = [...all('listeningA'), ...all('listeningB')] as ListeningTest[];
const writing = [...all('writingTask1'), ...all('writingTask2')] as WritingTask[];
const vocab = all('vocabTopics') as VocabTopic[];
const grammar = all('grammarLessons') as GrammarLesson[];
const cards = all('cueCards') as CueCard[];
const part1 = all('speakingPart1') as SpeakingPart1Topic[];
const guides = all('guides') as Guide[];
const diag = all('diagnosticItems') as DiagnosticItem[];

const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' -]/g, ' ').replace(/\s+/g, ' ').trim();

function checkGroups(owner: string, groups: QuestionGroup[], expectedCount: number | [number, number], sourceText: string, ids: Set<string>) {
  const qs = groups.flatMap((g) => g.questions);
  const [min, max] = Array.isArray(expectedCount) ? expectedCount : [expectedCount, expectedCount];
  expect(qs.length, `${owner}: question count`).toBeGreaterThanOrEqual(min);
  expect(qs.length, `${owner}: question count`).toBeLessThanOrEqual(max);
  qs.forEach((q, i) => expect(q.number, `${owner}: question numbering at index ${i}`).toBe(i + 1));
  const src = norm(sourceText);
  for (const g of groups) {
    expect(ids.has(g.id), `duplicate group id ${g.id}`).toBe(false);
    ids.add(g.id);
    expect(g.instructions.length, `${g.id} instructions`).toBeGreaterThan(10);
    if (g.type === 'matching') expect(g.options?.length ?? 0, `${g.id} needs options`).toBeGreaterThanOrEqual(2);
    for (const q of g.questions) {
      expect(ids.has(q.id), `duplicate question id ${q.id}`).toBe(false);
      ids.add(q.id);
      expect(q.answer.length, `${q.id} has no answer`).toBeGreaterThan(0);
      expect(q.explanation.length, `${q.id} explanation`).toBeGreaterThan(10);
      if (g.type === 'mcq') {
        expect(q.options && q.options.length >= 3, `${q.id} mcq options`).toBe(true);
        const letters = (q.options ?? []).map((_, i) => String.fromCharCode(65 + i));
        q.answer.forEach((a) => expect(letters, `${q.id} answer letter`).toContain(a.toUpperCase()));
      }
      if (g.type === 'tfng') q.answer.forEach((a) => expect(['TRUE', 'FALSE', 'NOT GIVEN'], q.id).toContain(a.toUpperCase()));
      if (g.type === 'ynng') q.answer.forEach((a) => expect(['YES', 'NO', 'NOT GIVEN'], q.id).toContain(a.toUpperCase()));
      if (g.type === 'matching') {
        const keys = (g.options ?? []).map((o) => o.key.toLowerCase());
        q.answer.forEach((a) => expect(keys, `${q.id} matching key`).toContain(a.toLowerCase()));
      }
      if (g.type === 'gap') {
        // at least one accepted variant must appear verbatim in the source (passage or script)
        const found = q.answer.some((a) => src.includes(norm(a)));
        expect(found, `${q.id}: none of [${q.answer.join(' | ')}] appears in source text`).toBe(true);
      }
    }
  }
}

describe('content inventory', () => {
  it('has content loaded (non-fatal counts)', () => {
    console.info(`reading=${reading.length} listening=${listening.length} writing=${writing.length} vocabTopics=${vocab.length} grammar=${grammar.length} cueCards=${cards.length} part1=${part1.length} guides=${guides.length} diagnostic=${diag.length}`);
    expect(true).toBe(true);
  });
});

describe('reading passages', () => {
  const ids = new Set<string>();
  const pids = new Set<string>();
  for (const p of reading) {
    it(`${p.id} is valid`, () => {
      expect(pids.has(p.id), `duplicate passage ${p.id}`).toBe(false);
      pids.add(p.id);
      const text = p.paragraphs.map((x) => x.text).join(' ');
      const words = text.split(/\s+/).length;
      expect(words, `${p.id} word count`).toBeGreaterThan(550);
      checkGroups(p.id, p.groups, [11, 15], text, ids);
    });
  }
});

describe('listening tests', () => {
  const ids = new Set<string>();
  for (const t of listening) {
    it(`${t.id} is valid`, () => {
      expect(t.sections.length).toBe(4);
      t.sections.forEach((s, i) => {
        expect(s.part).toBe(i + 1);
        const names = new Set(s.speakers.map((sp) => sp.name));
        s.script.forEach((l) => expect(names.has(l.speaker), `${s.id}: unknown speaker ${l.speaker}`).toBe(true));
        checkGroups(s.id, s.groups, 10, s.script.map((l) => l.text).join(' '), ids);
      });
    });
  }
});

describe('writing tasks', () => {
  const ids = new Set<string>();
  for (const w of writing) {
    it(`${w.id} is valid`, () => {
      expect(ids.has(w.id)).toBe(false);
      ids.add(w.id);
      expect(w.models.length).toBeGreaterThan(0);
      expect(w.models.some((m) => m.band >= 7)).toBe(true);
      if (w.task === 1 && w.module === 'academic') expect(w.visual, `${w.id} visual`).toBeDefined();
      if (w.visual && (w.visual.kind === 'line' || w.visual.kind === 'bar'))
        w.visual.series.forEach((s) => expect(s.values.length, `${w.id} series length`).toBe((w.visual as { categories: string[] }).categories.length));
      for (const m of w.models) {
        const n = m.text.split(/\s+/).filter(Boolean).length;
        expect(n, `${w.id} band ${m.band} model length`).toBeGreaterThanOrEqual(w.task === 1 ? 140 : 240);
      }
    });
  }
});

describe('vocabulary, grammar, speaking, guides, diagnostic', () => {
  it('vocab words unique', () => {
    const seen = new Set<string>();
    for (const t of vocab)
      for (const w of t.words) {
        const k = w.word.toLowerCase();
        expect(seen.has(k), `duplicate vocab word "${w.word}"`).toBe(false);
        seen.add(k);
        expect(w.vi.length).toBeGreaterThan(0);
      }
  });
  it('grammar lessons have exercises', () => {
    grammar.forEach((g) => {
      expect(g.exercises.length, g.id).toBeGreaterThanOrEqual(5);
      g.exercises.forEach((e) => expect(e.answer.length, g.id).toBeGreaterThan(0));
    });
  });
  it('speaking items complete', () => {
    cards.forEach((c) => {
      expect(c.bullets.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.part3.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.sample.split(/\s+/).length, c.id).toBeGreaterThan(180);
    });
    part1.forEach((p) => expect(p.questions.length, p.id).toBeGreaterThanOrEqual(3));
  });
  it('guides have bodies', () => guides.forEach((g) => expect(g.body.length, g.id).toBeGreaterThan(800)));
  it('diagnostic answers in range', () =>
    diag.forEach((d) => {
      expect(d.answer, d.id).toBeGreaterThanOrEqual(0);
      expect(d.answer, d.id).toBeLessThan(d.options.length);
    }));
});
