import { useState } from 'react';
import type { Question } from '../types';

interface Props {
  title: string;
  questions: Question[];
  onAnswer: (questionId: string, correct: boolean) => void;
  onExit: () => void;
}

export default function LessonSession({ title, questions, onAnswer, onExit }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const total = questions.length;
  const done = index >= total;
  const current = !done ? questions[index] : null;

  function selectOption(optionIndex: number) {
    if (selected !== null || !current) return;
    const correct = optionIndex === current.correctIndex;
    setSelected(optionIndex);
    if (correct) setCorrectCount((c) => c + 1);
    onAnswer(current.id, correct);
  }

  function continueNext() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  if (done) {
    const pct = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚';
    return (
      <div className="screen">
        <div className="summary-screen">
          <div className="summary-emoji">{emoji}</div>
          <h2>{title} complete!</h2>
          <div className="summary-stats">
            <div className="summary-stat">
              <div className="value">{correctCount}/{total}</div>
              <div className="label">Correct</div>
            </div>
            <div className="summary-stat">
              <div className="value">{pct}%</div>
              <div className="label">Score</div>
            </div>
          </div>
          <div className="summary-actions">
            <button className="btn btn-primary" onClick={onExit}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const progressPct = Math.round((index / total) * 100);

  return (
    <div className="screen">
      <div className="lesson-session">
        <div className="lesson-header">
          <button className="lesson-close" onClick={onExit} aria-label="Exit lesson">
            ✕
          </button>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <p className="question-prompt">{current.prompt}</p>

        <div className="options">
          {current.options.map((option, i) => {
            let cls = 'option-btn';
            if (selected !== null) {
              if (i === current.correctIndex) cls += ' correct';
              else if (i === selected) cls += ' wrong';
            }
            return (
              <button key={i} className={cls} onClick={() => selectOption(i)} disabled={selected !== null}>
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`feedback-panel ${selected === current.correctIndex ? 'correct' : 'wrong'}`}>
            <strong>{selected === current.correctIndex ? 'Correct' : 'Not quite'}</strong>
            {current.explanation}
          </div>
        )}

        <div className="lesson-footer">
          {selected !== null && (
            <button className="btn btn-primary" onClick={continueNext}>
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
