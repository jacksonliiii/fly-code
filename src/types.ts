export type Category =
  | 'Patterns'
  | 'Data Structures'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'System Design'
  | 'Complexity Analysis'
  | 'Behavioral';

export interface Topic {
  id: string;
  title: string;
  category: Category;
  description: string;
  icon: string;
}

/**
 * concept: traditional "which technique/why" multiple choice.
 * output: predict what a given code snippet returns/prints.
 * bug: spot what's wrong with the given code.
 * fill-blank: code has a blank marker; pick the option that completes it.
 */
export type QuestionKind = 'concept' | 'output' | 'bug' | 'fill-blank';

export type Company = 'Amazon' | 'Microsoft' | 'Stripe';

export interface Question {
  id: string;
  topicId: string;
  prompt: string;
  /** Optional code snippet shown above the prompt/options, monospaced. */
  code?: string;
  /** Defaults to 'concept' when omitted. */
  kind?: QuestionKind;
  /** Tags this as modeled on a real question style from that company's interviews. */
  company?: Company;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CardState {
  questionId: string;
  ease: number;
  interval: number;
  repetitions: number;
  dueDate: string;
  lastResult: 'correct' | 'wrong' | null;
  seenCount: number;
  correctCount: number;
}

export interface ProgressState {
  cards: Record<string, CardState>;
}
