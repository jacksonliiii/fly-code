import type { CardState, ProgressState } from '../types';
import { newCard } from './srs';

const STORAGE_KEY = 'interview-drill-progress-v1';

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cards: {} };
    const parsed = JSON.parse(raw) as ProgressState;
    return parsed.cards ? parsed : { cards: {} };
  } catch {
    return { cards: {} };
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist.
  }
}

export function getOrCreateCard(state: ProgressState, questionId: string): CardState {
  return state.cards[questionId] ?? newCard(questionId);
}

export function upsertCard(state: ProgressState, card: CardState): ProgressState {
  return { cards: { ...state.cards, [card.questionId]: card } };
}
