import { CATEGORY_ORDER, TOPICS } from '../data/topics';
import { QUESTIONS } from '../data/questions';
import { CATEGORY_COLORS } from '../lib/theme';
import { masteryForCards } from '../lib/srs';
import { getOrCreateCard } from '../lib/storage';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
  onSelectTopic: (topicId: string) => void;
}

const OFFSET_CLASSES = ['', 'offset-1', '', 'offset-2'];

export default function HomeView({ progress, onSelectTopic }: Props) {
  return (
    <div>
      <div className="app-header">
        <h1>Interview Drills</h1>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const topics = TOPICS.filter((t) => t.category === category);
        const color = CATEGORY_COLORS[category];

        return (
          <div className="unit" key={category}>
            <div className="unit-banner" style={{ background: color }}>
              <h2>{category}</h2>
              <p>{topics.length} topics</p>
            </div>

            <div className="path">
              {topics.map((topic, i) => {
                const cards = QUESTIONS.filter((q) => q.topicId === topic.id).map((q) =>
                  getOrCreateCard(progress, q.id),
                );
                const mastery = masteryForCards(cards);
                const started = cards.some((c) => c.seenCount > 0);

                return (
                  <div className={`path-row ${OFFSET_CLASSES[i % OFFSET_CLASSES.length]}`} key={topic.id}>
                    <div className="path-node-wrap">
                      <button
                        className="path-node"
                        onClick={() => onSelectTopic(topic.id)}
                        aria-label={`Start ${topic.title}`}
                      >
                        <div
                          className="ring"
                          style={{
                            background: started
                              ? `conic-gradient(${color} ${mastery * 3.6}deg, var(--surface-muted) 0deg)`
                              : 'var(--surface-muted)',
                          }}
                        >
                          <div className="inner" style={{ background: started ? color : 'var(--surface)' }}>
                            {topic.icon}
                          </div>
                        </div>
                      </button>
                      <span className="path-node-label">{topic.title}</span>
                      {started && <span className="mastery-badge">{mastery}% mastered</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
