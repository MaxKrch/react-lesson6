import { render, screen } from '@testing-library/react'
import Notes from './notes'
import * as useNotesHook from '../../hooks/use-notes'
import { STATUS_REQUEST } from '../../const/api-status'
import { vi } from 'vitest'

vi.mock('../../hooks/use-notes')

describe(`Component: Notes`, () => {
  const notes = [{ id: '1', content: 'Test Note' }]

  it('should show loading message when status is LOADING', () => {
    const expectedText = /Загрузка.../i
    vi.mocked(useNotesHook.default).mockReturnValue({
      notes: [],
      status: STATUS_REQUEST.LOADING,
      getNotes: vi.fn(),
      createNote: vi.fn(),
      deleteNote: vi.fn(),
    })

    render(<Notes />)
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  it('should show error message when status is FAILED', () => {
    const expectedText = /Что-то пошло не так, обновите страницу/i
    vi.mocked(useNotesHook.default).mockReturnValue({
      notes: [],
      status: STATUS_REQUEST.FAILED,
      getNotes: vi.fn(),
      createNote: vi.fn(),
      deleteNote: vi.fn(),
    })

    render(<Notes />)
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  it('should render NoteList and NoteForm', () => {
    const firstExpectedText = /Notes/i
    const secondExpectedText = /type your text/i
    vi.mocked(useNotesHook.default).mockReturnValue({
      notes: notes,
      status: STATUS_REQUEST.SUCCESS,
      getNotes: vi.fn(),
      createNote: vi.fn(),
      deleteNote: vi.fn(),
    })

    render(<Notes />)

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument()
    expect(screen.getByText(notes[0].content)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(secondExpectedText)).toBeInTheDocument()
  })
})
