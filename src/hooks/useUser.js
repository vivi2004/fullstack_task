import { useEffect, useState } from 'react'
import { getUserById } from '../api/users'

export function useUser(userId, { enabled } = {}) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled || !userId) return

    const controller = new AbortController()
    let isStale = false

    async function load() {
      setIsLoading(true)
      setError(null)
      setUser(null)

      try {
        const data = await getUserById(userId, { signal: controller.signal })
        if (!isStale) {
          setUser(data)
        }
      } catch (e) {
        if (e?.name !== 'AbortError') {
          if (!isStale) {
            setError(e)
          }
        }
      } finally {
        if (!isStale) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      isStale = true
      controller.abort()
    }
  }, [enabled, userId])

  return { user, isLoading, error }
}
