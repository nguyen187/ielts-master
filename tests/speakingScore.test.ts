import { scoreSpeechAuto } from '../src/lib/speakingScore';

const strong = `Well, to be honest, I have always been fascinated by documentaries, because they let me explore places I would never be able to visit myself.
The one that comes to mind is a series about the deep ocean, which I watched a couple of years ago with my younger brother. What struck me most was how
the scientists managed to film creatures that live in complete darkness, and actually some of them produce their own light. Before watching it, I had assumed
that the seabed was basically empty, but it turned out to be incredibly diverse. On top of that, the presenter explained how plastic pollution is spreading even
to these remote areas, which was quite alarming. Since then I have tried to reduce the amount of single-use plastic I buy, although I admit it is not always
convenient. If I had the chance, I would definitely watch the sequel, and I think everyone should see it at least once.`;

const weak = `um I like watch film um it is good. it is very good um my friend he like it too. um the film is about the sea um it is nice. people is like it.
um I watch it um yesterday I go to home and watch. it is good film um very good um I like it very much um. it is nice thing um.`;

describe('scoreSpeechAuto', () => {
  it('returns null when there is too little speech to judge', () => {
    expect(scoreSpeechAuto('I like it very much.', 5)).toBeNull();
  });

  it('ranks a fluent, varied answer clearly above a hesitant, basic one', () => {
    const a = scoreSpeechAuto(strong, 95, { part: 2, answers: 1, confidence: 0.93 })!;
    const b = scoreSpeechAuto(weak, 70, { part: 2, answers: 1, confidence: 0.72 })!;
    expect(a.band).toBeGreaterThanOrEqual(6.5);
    expect(b.band).toBeLessThanOrEqual(5);
    for (const k of ['fc', 'lr', 'gra', 'p'] as const) expect(a[k].band).toBeGreaterThan(b[k].band);
  });

  it('flags typical grammar slips', () => {
    const b = scoreSpeechAuto(weak, 70, { part: 2 })!;
    expect(b.gra.notes.join(' ')).toMatch(/people|past tense/);
    expect(b.fc.notes.join(' ')).toMatch(/hesitation/i);
  });

  it('uses recogniser confidence for pronunciation only when available', () => {
    const withC = scoreSpeechAuto(strong, 95, { part: 2, confidence: 0.7 })!;
    const without = scoreSpeechAuto(strong, 95, { part: 2 })!;
    expect(withC.pronunciationMeasured).toBe(true);
    expect(withC.p.band).toBe(5);
    expect(without.pronunciationMeasured).toBe(false);
    expect(without.p.band).toBeLessThanOrEqual(6);
  });

  it('keeps every band inside 4–8 and on half-band steps', () => {
    const a = scoreSpeechAuto(strong, 60, { confidence: 0.99 })!;
    for (const k of ['fc', 'lr', 'gra', 'p'] as const) {
      expect(a[k].band).toBeGreaterThanOrEqual(4);
      expect(a[k].band).toBeLessThanOrEqual(8);
      expect((a[k].band * 2) % 1).toBe(0);
    }
  });
});

describe('scoreSpeechAuto grammar checks', () => {
  it('does not flag correct "I was" / "they were" forms', () => {
    const t = 'Actually I was staying with my grandparents for years and they were really kind to me because I was young, so I have many good memories of that time and I would love to go back there one day if I can find the time.';
    const r = scoreSpeechAuto(t, 20)!;
    expect(r.gra.notes.join(' ')).toMatch(/No common errors/);
  });
});
