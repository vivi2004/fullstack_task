export function StatusBadge({ status }) {
  const tone = status === 'Active' ? 'success' : 'neutral'
  return (
    <span className={['badge', `badge--${tone}`].join(' ')}>
      {status}
    </span>
  )
}
