interface Props {
  dueCount: number;
  totalStarted: number;
  onStart: () => void;
}

export default function ReviewView({ dueCount, totalStarted, onStart }: Props) {
  return (
    <div>
      <div className="app-header">
        <h1>Review</h1>
      </div>

      <div className="review-hero">
        <div className="emoji">{dueCount > 0 ? '🔁' : '✅'}</div>
        {dueCount > 0 ? (
          <>
            <h2>{dueCount} question{dueCount === 1 ? '' : 's'} due</h2>
            <p>Spaced repetition resurfaces topics right before you'd forget them.</p>
            <button className="btn btn-blue" onClick={onStart}>
              Start Review
            </button>
          </>
        ) : totalStarted === 0 ? (
          <>
            <h2>Nothing to review yet</h2>
            <p>Start a topic on the Learn tab — questions you answer will come back here for review.</p>
          </>
        ) : (
          <>
            <h2>All caught up</h2>
            <p>No questions are due right now. Check back later, or keep learning new topics.</p>
          </>
        )}
      </div>
    </div>
  );
}
