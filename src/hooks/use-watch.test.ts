import { renderHook, act } from '@testing-library/react'
import useWatch from './use-watch'
import getClockAngles from '../helpers/get-clock-angles'
import { vi } from 'vitest'

const fakeDate = new Date('2023-01-01T12:00:00Z')

describe('Hook: useWatch', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(fakeDate)
  })

  afterAll(() => {
    vi.useRealTimers()
    vi.setSystemTime(undefined as unknown as number)
  })

  it('should return correctly default value', () => {
    const { result } = renderHook(() => useWatch(0))

    const expected = getClockAngles(fakeDate)
    expect(result.current).toEqual(expected)
  })

  it('sjhould return correctly value every seconds', () => {
    const { result } = renderHook(() => useWatch(0))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    const updated = getClockAngles(new Date(fakeDate.getTime() + 1000))
    expect(result.current).toEqual(updated)
  })
})
