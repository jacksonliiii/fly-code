import type { CardState } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

export function newCard(questionId: string): CardState {
  return {
    questionId,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: new Date().toISOString(),
    lastResult: null,
    seenCount: 0,
    correctCount: 0,
  };
}

/**
 * Lightweight SM-2: correct answers grow the interval (capped), wrong
 * answers reset it and drop the ease factor so the card resurfaces soon.
 */
export function reviewCard(card: CardState, correct: boolean): CardState {
  const next = { ...card, seenCount: card.seenCount + 1 };

  if (correct) {
    next.correctCount += 1;
    next.repetitions += 1;
    next.ease = Math.min(3.0, card.ease + 0.1);

    if (next.repetitions === 1) next.interval = 1;
    else if (next.repetitions === 2) next.interval = 3;
    else next.interval = Math.round(card.interval * next.ease);

    next.interval = Math.min(next.interval, 120);
    next.lastResult = 'correct';
  } else {
    next.repetitions = 0;
    next.ease = Math.max(1.3, card.ease - 0.3);
    next.interval = 1;
    next.lastResult = 'wrong';
  }

  next.dueDate = new Date(Date.now() + next.interval * DAY_MS).toISOString();
  return next;
}

export function isDue(card: CardState): boolean {
  return new Date(card.dueDate).getTime() <= Date.now();
}

export function masteryForCards(cards: CardState[]): number {
  if (cards.length === 0) return 0;
  const score = cards.reduce((sum, c) => {
    if (c.seenCount === 0) return sum;
    const acc = c.correctCount / c.seenCount;
    const strength = Math.min(1, c.repetitions / 3);
    return sum + acc * 0.4 + strength * 0.6;
  }, 0);
  return Math.round((score / cards.length) * 100);
}
