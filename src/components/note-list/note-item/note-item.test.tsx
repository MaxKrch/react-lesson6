import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteItem from './note-item'
import { vi } from 'vitest'
import type { Note } from '../../../types'

describe(`Component: NoteItem`, () => {
  const handleDeleteNote = vi.fn()
  const note: Note = {
    id: `1`,
    content: `Im test Note`,
  }

  beforeEach(() => {
    handleDeleteNote.mockClear()
  })

  it(`should render note content`, () => {
    render(<NoteItem note={note} onDeleteNote={handleDeleteNote} />)
    expect(screen.getByText(note.content)).toBeInTheDocument()
    expect(screen.getByRole(`button`)).toBeInTheDocument()
  })

  it(`should call onDeleteNote when delete button is clicked'`, async () => {
    render(<NoteItem note={note} onDeleteNote={handleDeleteNote} />)

    await userEvent.click(screen.getByRole(`button`))

    expect(handleDeleteNote).toHaveBeenCalledTimes(1)
    expect(handleDeleteNote).toHaveBeenCalledWith(note.id)
  })
})
