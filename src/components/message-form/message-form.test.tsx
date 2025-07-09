import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import MessageForm from './message-form'
import { vi } from 'vitest'

describe('MessageForm', async () => {
  const onSendMessage = vi.fn()
  const textAreaPlaceHolder = /type your text/i
  const sendButtonLabel = /send message/i
  const shortMessageText = /Слишком короткое сообщение/i

  beforeEach(() => {
    onSendMessage.mockClear()
  })

  it('calls onSendMessage with valid input', async () => {
    const expectedTest = `My message`
    render(<MessageForm onSendMessage={onSendMessage} isActiveForm={true} />)

    const textarea = screen.getByPlaceholderText(textAreaPlaceHolder)
    await userEvent.type(textarea, expectedTest)

    const button = screen.getByRole('button', { name: sendButtonLabel })
    await userEvent.click(button)

    expect(onSendMessage).toHaveBeenCalledWith(expectedTest)
  })

  it('shows validation error on short message', async () => {
    render(<MessageForm onSendMessage={onSendMessage} isActiveForm={true} />)

    const textarea = screen.getByPlaceholderText(textAreaPlaceHolder)
    await userEvent.type(textarea, `I`)

    const button = screen.getByRole('button', { name: sendButtonLabel })
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(shortMessageText)).toBeInTheDocument()
    })
  })

  it('disables submit button when inactive', () => {
    render(<MessageForm onSendMessage={onSendMessage} isActiveForm={false} />)

    const button = screen.getByRole('button', { name: sendButtonLabel })
    expect(button).toBeDisabled()
  })
})
