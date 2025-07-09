import { renderHook, act, waitFor } from '@testing-library/react'
import useSendMessage from './use-send-message'
import type { Message } from '../types'
import { STATUS_SAVING } from '../const/api-status'
import { vi } from 'vitest'

describe('Hook: useSendMessage', () => {
  const mockMessagesRef = { current: [] as Message[] }

  beforeEach(() => {
    mockMessagesRef.current = []
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should initialize with correct status', () => {
    const { result } = renderHook(() => useSendMessage(mockMessagesRef))

    expect(result.current.status).toBe(STATUS_SAVING.IDLE)
    expect(result.current.savingMessage.current).toBe(null)
  })

  it('should successfully send message and update status', async () => {
    const message: Message = {
      id: 1,
      userId: '123',
      content: 'Hi',
      serverId: null,
      saving: STATUS_SAVING.SAVING,
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ ...message, saving: `success`, serverId: 101 }),
    } as Response)

    const { result } = renderHook(() => useSendMessage(mockMessagesRef))

    act(() => {
      result.current.sendMessage(message)
    })

    expect(result.current.status).toBe(STATUS_SAVING.SAVING)
    expect(mockMessagesRef.current).toContain(message)

    await waitFor(() => {
      expect(result.current.status).toBe(STATUS_SAVING.SUCCESS)
      expect(result.current.savingMessage.current?.serverId).toBe(101)
    })
  })

  it('should handle request failure', async () => {
    const message: Message = {
      id: 1,
      userId: '123',
      content: 'Hi',
      serverId: null,
      saving: STATUS_SAVING.SAVING,
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
    } as Response)

    const { result } = renderHook(() => useSendMessage(mockMessagesRef))

    act(() => {
      result.current.sendMessage(message)
    })

    await waitFor(() =>
      expect(result.current.status).toBe(STATUS_SAVING.FAILED)
    )
  })
})
