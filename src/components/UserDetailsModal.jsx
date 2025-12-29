import { useMemo } from 'react'
import { useUser } from '../hooks/useUser'
import { getUserStatus } from '../api/users'
import { Modal } from './Modal'
import { StateMessage } from './StateMessage'
import { StatusBadge } from './StatusBadge'

function Row({ label, value }) {
  return (
    <div className="detail-row">
      <div className="detail-row__label">{label}</div>
      <div className="detail-row__value">{value || '—'}</div>
    </div>
  )
}

export function UserDetailsModal({ userId, isOpen, onClose }) {
  const { user, isLoading, error } = useUser(userId, { enabled: isOpen })

  const status = useMemo(() => getUserStatus(user), [user])

  return (
    <Modal title="User" isOpen={isOpen} onClose={onClose}>
      {isLoading ? <div className="details-loading">Loading…</div> : null}

      {error ? (
        <StateMessage
          title="Couldn’t load details"
          description="Try again in a moment."
          actionLabel="Close"
          onAction={onClose}
        />
      ) : null}

      {!isLoading && !error && user ? (
        <div className="details">
          <div className="details__title">
            <div>
              <div className="details__name">{user.name}</div>
              <div className="details__email">{user.email}</div>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="details__grid">
            <Row label="Phone" value={user.phone} />
            <Row label="Website" value={user.website} />
            <Row label="Company" value={user.company?.name} />
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
