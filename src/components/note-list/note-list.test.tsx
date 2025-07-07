import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteList from './note-list'
import { vi } from 'vitest'

describe(`Component: NoteList`, () => {
  const refreshButtonName = /refresh notes/i
  const notes = [
    { id: '1', content: 'Test note 1' },
    { id: '2', content: 'Test note 2' },
  ]

  const handleDeleetNote = vi.fn()
  const handleRefreshNotes = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all notes', () => {
    const expectedText = /Notes/i
    render(
      <NoteList
        notes={notes}
        onDeleteNote={handleDeleetNote}
        onRefreshNotes={handleRefreshNotes}
      />
    )

    expect(screen.getAllByRole(`article`).length).toBe(notes.length)
    expect(screen.getByText(expectedText)).toBeInTheDocument()
    expect(screen.getByText(notes[0].content)).toBeInTheDocument()
    expect(screen.getByText(notes[0].content)).toBeInTheDocument()
  })

  it('should call onRefreshNotes when refresh button is clicked', async () => {
    render(
      <NoteList
        notes={notes}
        onDeleteNote={handleDeleetNote}
        onRefreshNotes={handleRefreshNotes}
      />
    )

    const refreshButton = screen.getByRole('button', {
      name: refreshButtonName,
    })
    await userEvent.click(refreshButton)

    expect(handleRefreshNotes).toHaveBeenCalledTimes(1)
  })
})
