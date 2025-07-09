import { useEffect, useRef } from 'react'

const USER_ID = `userId`

const useUserId = () => {
  const userId = useRef<string | null>(null)

  useEffect(() => {
    const savedId = localStorage.getItem(USER_ID)

    if (savedId) {
      userId.current = savedId
    } else {
      userId.current = crypto.randomUUID()
      localStorage.setItem(USER_ID, userId.current)
    }
  }, [])

  return userId
}

export default useUserId
