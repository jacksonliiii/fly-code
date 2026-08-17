export type Category =
  | 'Patterns'
  | 'Data Structures'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Complexity & Bits'
  | 'System Design'
  | 'Behavioral';

export interface Topic {
  id: string;
  title: string;
  category: Category;
  description: string;
  icon: string;
}

export interface Question {
  id: string;
  topicId: string;
  prompt: string;
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
