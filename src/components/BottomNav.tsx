export type Tab = 'home' | 'review' | 'stats';

interface Props {
  active: Tab;
  dueCount: number;
  onSelect: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Learn', icon: '🏠' },
  { id: 'review', label: 'Review', icon: '🔁' },
  { id: 'stats', label: 'Stats', icon: '📊' },
];

export default function BottomNav({ active, dueCount, onSelect }: Props) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={tab.id === active ? 'active' : ''}
          onClick={() => onSelect(tab.id)}
        >
          <span className={tab.id === 'review' && dueCount > 0 ? 'nav-icon nav-badge' : 'nav-icon'} data-count={dueCount}>
            {tab.icon}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
