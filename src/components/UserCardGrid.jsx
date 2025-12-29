import { Button } from './Button'
import { StatusBadge } from './StatusBadge'

export function UserCardGrid({ users, onSelectUser }) {
  return (
    <div className="grid">
      {users.map((user) => (
        <article className="card" key={user.id}>
          <div className="card__header">
            <div className="card__title">{user.name}</div>
            <StatusBadge status={user.status} />
          </div>

          <div className="card__meta">{user.email}</div>

          <div className="card__footer">
            <Button variant="secondary" size="sm" onClick={() => onSelectUser(user)}>
              View details
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
