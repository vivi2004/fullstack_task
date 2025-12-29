function SkeletonLine({ width = '100%' }) {
  return <div className="skeleton" style={{ width }} />
}

export function SkeletonCards({ count = 6 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, idx) => (
        <div className="card" key={idx}>
          <div className="card__header">
            <SkeletonLine width="60%" />
            <SkeletonLine width="28%" />
          </div>
          <div className="card__meta">
            <SkeletonLine width="85%" />
          </div>
          <div className="card__footer">
            <SkeletonLine width="90px" />
          </div>
        </div>
      ))}
    </div>
  )
}
