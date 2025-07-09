import { renderHook } from '@testing-library/react'
import useUserId from './use-user-id'

describe('useUserId', () => {
  const userId = `userId`

  beforeEach(() => {
    localStorage.clear()
  })

  it('should return userId from localStorage if present', () => {
    const expectedValue = 'stored-id-123'
    localStorage.setItem(userId, expectedValue)

    const { result } = renderHook(() => useUserId())

    expect(result.current.current).toBe(expectedValue)
  })

  it('should generate a new userId if none is stored', () => {
    const { result } = renderHook(() => useUserId())

    const generatedId = result.current.current

    expect(typeof generatedId).toBe('string')
    expect(generatedId?.length).toBeGreaterThan(0)
    expect(localStorage.getItem('userId')).toBe(generatedId)
  })
})
