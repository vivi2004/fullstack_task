const API_BASE = 'https://jsonplaceholder.typicode.com'

export async function getUsers({ signal } = {}) {
  const response = await fetch(`${API_BASE}/users`, { signal })
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export async function getUserById(id, { signal } = {}) {
  const response = await fetch(`${API_BASE}/users/${id}`, { signal })
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

export function getUserStatus(user) {
  // JSONPlaceholder users don't include a status, so we derive one deterministically.
  return user?.id % 2 === 0 ? 'Inactive' : 'Active'
}
