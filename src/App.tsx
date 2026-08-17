import { useEffect, useMemo, useState } from 'react';
import './App.css';
import BottomNav, { type Tab } from './components/BottomNav';
import HomeView from './components/HomeView';
import ReviewView from './components/ReviewView';
import StatsView from './components/StatsView';
import LessonSession from './components/LessonSession';
import { QUESTIONS } from './data/questions';
import { TOPICS } from './data/topics';
import { getOrCreateCard, loadProgress, saveProgress, upsertCard } from './lib/storage';
import { isDue, reviewCard } from './lib/srs';
import type { ProgressState } from './types';

type Screen = { kind: 'tab'; tab: Tab } | { kind: 'lesson'; topicId: string } | { kind: 'reviewSession' };

function shuffled<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [screen, setScreen] = useState<Screen>({ kind: 'tab', tab: 'home' });
  const [sessionQuestions, setSessionQuestions] = useState<typeof QUESTIONS>([]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const dueCount = useMemo(
    () => QUESTIONS.filter((q) => {
      const card = progress.cards[q.id];
      return card && isDue(card);
    }).length,
    [progress],
  );

  const totalStarted = useMemo(
    () => Object.values(progress.cards).some((c) => c.seenCount > 0) ? 1 : 0,
    [progress],
  );

  function handleAnswer(questionId: string, correct: boolean) {
    setProgress((prev) => {
      const card = getOrCreateCard(prev, questionId);
      const updated = reviewCard(card, correct);
      return upsertCard(prev, updated);
    });
  }

  function startTopic(topicId: string) {
    setSessionQuestions(shuffled(QUESTIONS.filter((q) => q.topicId === topicId)));
    setScreen({ kind: 'lesson', topicId });
  }

  function startReview() {
    const due = QUESTIONS.filter((q) => {
      const card = progress.cards[q.id];
      return card && isDue(card);
    });
    setSessionQuestions(shuffled(due));
    setScreen({ kind: 'reviewSession' });
  }

  function exitSession() {
    setScreen({ kind: 'tab', tab: screen.kind === 'reviewSession' ? 'review' : 'home' });
  }

  if (screen.kind === 'lesson') {
    const topic = TOPICS.find((t) => t.id === screen.topicId);
    return (
      <div className="app-shell">
        <LessonSession
          title={topic?.title ?? 'Lesson'}
          questions={sessionQuestions}
          onAnswer={handleAnswer}
          onExit={exitSession}
        />
      </div>
    );
  }

  if (screen.kind === 'reviewSession') {
    return (
      <div className="app-shell">
        <LessonSession
          title="Review"
          questions={sessionQuestions}
          onAnswer={handleAnswer}
          onExit={exitSession}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="screen">
        {screen.tab === 'home' && (
          <HomeView progress={progress} dueCount={dueCount} onSelectTopic={startTopic} />
        )}
        {screen.tab === 'review' && (
          <ReviewView dueCount={dueCount} totalStarted={totalStarted} onStart={startReview} />
        )}
        {screen.tab === 'stats' && <StatsView progress={progress} />}
      </div>
      <BottomNav active={screen.tab} dueCount={dueCount} onSelect={(tab) => setScreen({ kind: 'tab', tab })} />
    </div>
  );
}
