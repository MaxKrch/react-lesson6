import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './note-form'
import { vi } from 'vitest'

describe(`Component: NoteForm`, () => {
  const handleAddNote = vi.fn()
  const textAreaPlaceholder = /type your text/i
  const submitButtonName = /create note/i
  const textAreaError = {
    short: /Слишком короткий текст/i,
    long: /Слишком длиный текст/i,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render textarea and submit button', () => {
    render(<NoteForm onAddNote={handleAddNote} />)

    expect(screen.getByPlaceholderText(textAreaPlaceholder)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: submitButtonName })
    ).toBeInTheDocument()
  })

  it('should show error if input is too short', async () => {
    render(<NoteForm onAddNote={handleAddNote} />)

    const button = screen.getByRole('button', { name: submitButtonName })
    await userEvent.click(button)

    expect(await screen.findByText(textAreaError.short)).toBeInTheDocument()
  })

  it('should show error if input is too long', async () => {
    const invalidContent = 'long string'.repeat(25)
    render(<NoteForm onAddNote={handleAddNote} />)

    const textarea = screen.getByPlaceholderText(textAreaPlaceholder)
    const button = screen.getByRole('button', { name: submitButtonName })

    await userEvent.type(textarea, invalidContent, { delay: 1 })
    await userEvent.click(button)

    expect(await screen.findByText(textAreaError.long)).toBeInTheDocument()
  })

  it('should call onAddNote and reset textarea', async () => {
    const expectedText = 'My valid note'
    render(<NoteForm onAddNote={handleAddNote} />)

    const textarea = screen.getByPlaceholderText(textAreaPlaceholder)
    const button = screen.getByRole('button', { name: submitButtonName })

    await userEvent.type(textarea, expectedText)
    await userEvent.click(button)

    expect(handleAddNote).toHaveBeenCalledWith(expectedText)
    expect(textarea).toHaveDisplayValue('')
  })
})
