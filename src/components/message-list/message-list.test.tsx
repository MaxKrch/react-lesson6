import { render, screen } from '@testing-library/react'
import MessageList from './message-list'
import type { Message } from '../../types'
import { STATUS_SAVING } from '../../const/api-status'

describe('Component: MessageList', () => {
  const messages: Message[] = [
    {
      id: 1,
      userId: 'Me',
      content: 'Hi',
      serverId: 1,
      saving: STATUS_SAVING.IDLE,
    },
    {
      id: 2,
      userId: 'You',
      content: 'Yo',
      serverId: 2,
      saving: STATUS_SAVING.IDLE,
    },
  ]

  it('renders title and all messages', () => {
    const expectedText = /Anonymus Chat/i

    render(
      <MessageList
        messages={messages}
        userId={messages[0].userId}
        lastMessageRef={{ current: null }}
      />
    )

    const renderedMessages = screen.getAllByRole(`listitem`)
    expect(renderedMessages.length).toBe(messages.length)
    expect(screen.getByText(expectedText)).toBeInTheDocument()
    expect(screen.getByText(messages[0].content)).toBeInTheDocument()
  })
})
