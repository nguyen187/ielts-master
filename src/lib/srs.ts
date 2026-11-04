import type { SrsCard } from './store';

/** Grades: 0 = again (forgot), 1 = hard, 2 = good, 3 = easy. SM-2 variant tuned for vocabulary. */
export type SrsGrade = 0 | 1 | 2 | 3;

const addDays = (from: string, days: number) => {
  const d = new Date(from + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export function newCard(todayStr: string): SrsCard {
  return { ease: 2.5, interval: 0, reps: 0, due: todayStr, lapses: 0 };
}

export function review(card: SrsCard, grade: SrsGrade, todayStr: string): SrsCard {
  let { ease, interval, reps, lapses } = card;
  if (grade === 0) {
    reps = 0;
    lapses += 1;
    interval = 1;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    reps += 1;
    if (reps === 1) interval = grade === 3 ? 4 : grade === 2 ? 1 : 1;
    else if (reps === 2) interval = grade === 1 ? 3 : grade === 2 ? 6 : 8;
    else interval = Math.round(interval * (grade === 1 ? 1.2 : grade === 2 ? ease : ease * 1.3));
    ease = Math.max(1.3, ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
  }
  interval = Math.min(interval, 180);
  return { ease, interval, reps, lapses, due: addDays(todayStr, interval) };
}

export function isDue(card: SrsCard | undefined, todayStr: string) {
  return !card || card.due <= todayStr;
}

/** A word is "learned" once its interval reaches 21 days. */
export const isMature = (c?: SrsCard) => !!c && c.interval >= 21;
