import { useCallback, useEffect, useMemo, useState } from 'react'
import { getUserStatus, getUsers } from '../api/users'

export function useUsers() {
  const [rawUsers, setRawUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let isStale = false

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const users = await getUsers({ signal: controller.signal })
        if (!isStale) {
          setRawUsers(users)
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
  }, [reloadKey])

  const users = useMemo(() => {
    return rawUsers.map((u) => ({ ...u, status: getUserStatus(u) }))
  }, [rawUsers])

  return { users, isLoading, error, refetch }
}
