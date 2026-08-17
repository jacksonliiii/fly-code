import { TOPICS } from '../data/topics';
import { QUESTIONS } from '../data/questions';
import { CATEGORY_COLORS } from '../lib/theme';
import { masteryForCards } from '../lib/srs';
import { getOrCreateCard } from '../lib/storage';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
}

export default function StatsView({ progress }: Props) {
  const allCards = Object.values(progress.cards);
  const seenCards = allCards.filter((c) => c.seenCount > 0);
  const totalSeen = seenCards.reduce((s, c) => s + c.seenCount, 0);
  const totalCorrect = seenCards.reduce((s, c) => s + c.correctCount, 0);
  const accuracy = totalSeen === 0 ? 0 : Math.round((totalCorrect / totalSeen) * 100);

  const topicStats = TOPICS.map((topic) => {
    const cards = QUESTIONS.filter((q) => q.topicId === topic.id).map((q) => getOrCreateCard(progress, q.id));
    const mastery = masteryForCards(cards);
    return { topic, mastery, started: cards.some((c) => c.seenCount > 0) };
  });

  const topicsMastered = topicStats.filter((t) => t.mastery >= 80).length;
  const topicsStarted = topicStats.filter((t) => t.started).length;

  return (
    <div>
      <div className="app-header">
        <h1>Stats</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="value">{topicsMastered}/{TOPICS.length}</div>
          <div className="label">Topics mastered</div>
        </div>
        <div className="stat-card">
          <div className="value">{topicsStarted}/{TOPICS.length}</div>
          <div className="label">Topics started</div>
        </div>
        <div className="stat-card">
          <div className="value">{totalSeen}</div>
          <div className="label">Questions answered</div>
        </div>
        <div className="stat-card">
          <div className="value">{accuracy}%</div>
          <div className="label">Overall accuracy</div>
        </div>
      </div>

      <div className="section-title">Mastery by topic</div>
      <div className="topic-mastery-list">
        {topicStats
          .filter((t) => t.started)
          .sort((a, b) => b.mastery - a.mastery)
          .map(({ topic, mastery }) => (
            <div className="topic-mastery-row" key={topic.id}>
              <span className="icon">{topic.icon}</span>
              <span className="title">{topic.title}</span>
              <span className="bar-track">
                <span
                  className="bar-fill"
                  style={{ width: `${mastery}%`, background: CATEGORY_COLORS[topic.category] }}
                />
              </span>
              <span className="pct">{mastery}%</span>
            </div>
          ))}
        {topicsStarted === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Start a topic on the Learn tab to see your mastery breakdown here.
          </p>
        )}
      </div>
    </div>
  );
}
