import { renderHook, act } from '@testing-library/react'
import useNotes from './use-notes'
import { vi } from 'vitest'
import { STATUS_REQUEST } from '../const/api-status'
import type { Note } from '../types'

const mockNotes: Note[] = [
  {
    id: `1`,
    content: `Test note 1`,
  },
  {
    id: `2`,
    content: `Test note 2`,
  },
]

describe(`Hook: UseNotes`, () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  ;(it(`should fetch notes on mount`, async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes,
    } as Response)

    const { result } = renderHook(() => useNotes())

    await act(() => {})

    expect(result.current.notes).toEqual(mockNotes)
    expect(result.current.status).toBe(STATUS_REQUEST.SUCCESS)
  }),
    it(`shoulds et FAILED status on fetch error`, async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error(`Error`))

      const { result } = renderHook(() => useNotes())

      await act(() => {})

      expect(result.current.status).toBe(STATUS_REQUEST.FAILED)
    }))

  it(`should call getNotes after createNote`, async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response)
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response)
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes,
    } as Response)

    const { result } = renderHook(() => useNotes())

    await act(async () => {
      await result.current.createNote(`Hello world`)
    })

    expect(fetch).toHaveBeenCalledTimes(3)
    expect(result.current.notes).toEqual(mockNotes)
  })

  it(`should call getNotes after deleteNote`, async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes,
    } as Response)
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true } as Response)
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes.slice(0, 2),
    } as Response)

    const { result } = renderHook(() => useNotes())

    await act(async () => {
      await result.current.deleteNote(`1`)
    })

    expect(fetch).toHaveBeenCalledTimes(3)
    expect(result.current.notes).toEqual(mockNotes.slice(0, 2))
  })
})
