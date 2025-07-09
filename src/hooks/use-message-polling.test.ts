import { renderHook, act, waitFor } from '@testing-library/react'
import useMessagesPolling from './use-messages-polling'
import type { Message } from '../types'
import { STATUS_REQUEST } from '../const/api-status'
import { vi } from 'vitest'

describe('Hook: useMessagesPolling', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should set status to LOADING after initialization', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    } as Response)

    const { result } = renderHook(() => useMessagesPolling({ delay: 10 }))

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS_REQUEST.LOADING)
    })
  })

  it('should successfully fetch new messages and update messages array', async () => {
    const newMessages: Message[] = [
      {
        id: 1,
        userId: 'u1',
        content: 'hello',
        serverId: 10,
        saving: `success`,
      },
      {
        id: 2,
        userId: 'u2',
        content: 'world',
        serverId: 11,
        saving: `success`,
      },
    ]

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(newMessages),
    } as Response)

    const { result } = renderHook(() => useMessagesPolling({ delay: 10 }))

    act(() => {
      result.current.getNewMessages()
    })

    expect(result.current.status).toBe(STATUS_REQUEST.LOADING)

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS_REQUEST.SUCCESS)
      expect(result.current.messages.current).toEqual(newMessages)
    })
  })

  it('should handle fetch error', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
    } as Response)

    const { result } = renderHook(() => useMessagesPolling({ delay: 10 }))

    act(() => {
      result.current.getNewMessages()
    })

    await waitFor(() =>
      expect(result.current.status).toBe(STATUS_REQUEST.FAILED)
    )
  })
})
