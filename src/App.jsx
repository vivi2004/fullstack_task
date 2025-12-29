import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { useUsers } from './hooks/useUsers'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { SkeletonCards } from './components/SkeletonCards'
import { StateMessage } from './components/StateMessage'
import { UserCardGrid } from './components/UserCardGrid'
import { UserDetailsModal } from './components/UserDetailsModal'
import { AddUserForm } from './components/AddUserForm'

function App() {
  const { users, isLoading, error, refetch } = useUsers()
  const [query, setQuery] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 6
  const [showAddForm, setShowAddForm] = useState(false)
  const [mockUsers, setMockUsers] = useState([])

  const onSelectUser = useCallback((user) => {
    setSelectedUserId(user?.id ?? null)
  }, [])

  const onCloseDetails = useCallback(() => {
    setSelectedUserId(null)
  }, [])

  const handleAddUser = useCallback((user) => {
    setMockUsers((prev) => [...prev, user])
    setShowAddForm(false)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredUsers = useMemo(() => {
    const all = [...users, ...mockUsers]
    if (!normalizedQuery) return all
    return all.filter((u) => {
      const haystack = `${u.name} ${u.email}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [normalizedQuery, users, mockUsers])

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return filteredUsers.slice(start, end)
  }, [filteredUsers, page])

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE)

  const goToPage = useCallback((p) => {
    if (p >= 1 && p <= totalPages) setPage(p)
  }, [totalPages])

  const prevPage = useCallback(() => goToPage(page - 1), [page, goToPage])
  const nextPage = useCallback(() => goToPage(page + 1), [page, goToPage])

  // Reset to page 1 when search changes
  useMemo(() => {
    setPage(1)
  }, [normalizedQuery])

  const stats = useMemo(() => {
    let active = 0
    let inactive = 0
    for (const u of [...users, ...mockUsers]) {
      if (u.status === 'Active') active += 1
      else inactive += 1
    }
    return { total: users.length + mockUsers.length, active, inactive }
  }, [users, mockUsers])

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1 className="header__title">Users</h1>
          <p className="header__subtitle">Quick overview of customers in one place</p>
        </div>

        <div className="header__stats" aria-label="User stats">
          <div className="stat">
            <div className="stat__label">Total</div>
            <div className="stat__value">{stats.total}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Active</div>
            <div className="stat__value">{stats.active}</div>
          </div>
          <div className="stat">
            <div className="stat__label">Inactive</div>
            <div className="stat__value">{stats.inactive}</div>
          </div>
        </div>
      </header>

      <section className="toolbar" aria-label="Controls">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          aria-label="Search users"
        />
        <Button variant="secondary" onClick={refetch} disabled={isLoading}>
          Refresh
        </Button>
        <Button variant="secondary" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? 'Cancel' : 'Add User'}
        </Button>
      </section>

      <main className="content">
        {isLoading ? <SkeletonCards /> : null}

        {!isLoading && error ? (
          <StateMessage
            title="Couldn’t load users"
            description="Please check your connection and try again."
            actionLabel="Retry"
            onAction={refetch}
          />
        ) : null}

        {!isLoading && !error && users.length === 0 ? (
          <StateMessage title="No users yet" description="Nothing to show right now." />
        ) : null}

        {!isLoading && !error && users.length > 0 && filteredUsers.length === 0 ? (
          <StateMessage
            title="No matches"
            description="Try searching with a different name or email."
            actionLabel="Clear search"
            onAction={() => setQuery('')}
          />
        ) : null}

        {!isLoading && !error && filteredUsers.length > 0 ? (
          <UserCardGrid users={paginatedUsers} onSelectUser={onSelectUser} />
        ) : null}
      </main>

      {showAddForm && <AddUserForm onAdd={handleAddUser} />}

      {!isLoading && !error && filteredUsers.length > PAGE_SIZE && (
        <div className="pagination">
          <Button variant="secondary" size="sm" onClick={prevPage} disabled={page === 1}>
            ←
          </Button>
          <span className="pagination__info">
            Page {page} of {totalPages}
          </span>
          <Button variant="secondary" size="sm" onClick={nextPage} disabled={page === totalPages}>
            →
          </Button>
        </div>
      )}

      <UserDetailsModal userId={selectedUserId} isOpen={Boolean(selectedUserId)} onClose={onCloseDetails} mockUsers={mockUsers} />
    </div>
  )
}

export default App
