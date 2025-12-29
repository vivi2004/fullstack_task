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

export function UserDetailsModal({ userId, isOpen, onClose, mockUsers = [] }) {
  const mockUser = useMemo(() => mockUsers.find((u) => u.id === userId), [userId, mockUsers])
  const { user, isLoading, error } = useUser(userId, { enabled: isOpen && !mockUser })

  const displayUser = mockUser || user
  const status = useMemo(() => getUserStatus(displayUser), [displayUser])

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

      {!isLoading && !error && displayUser ? (
        <div className="details">
          <div className="details__title">
            <div>
              <div className="details__name">{displayUser.name}</div>
              <div className="details__email">{displayUser.email}</div>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="details__grid">
            <Row label="Phone" value={displayUser.phone} />
            <Row label="Website" value={displayUser.website} />
            <Row label="Company" value={displayUser.company?.name} />
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
