import { render, screen } from '@testing-library/react'
import MessageItem from './message-item'
import { STATUS_SAVING } from '../../../const/api-status'
import type { Message } from '../../../types'

const baseMessage: Message = {
  id: 1,
  userId: 'user-1',
  content: 'Hello there!',
  serverId: 10,
  saving: STATUS_SAVING.IDLE,
}

describe('Component: MessageItem', () => {
  it('showld render own message with correct styles', () => {
    const expectedClass = /ml-auto/

    render(<MessageItem message={baseMessage} userId={baseMessage.userId} />)

    expect(screen.getByText(baseMessage.content)).toBeInTheDocument()
    expect(screen.getByText(baseMessage.content).className).toMatch(
      expectedClass
    )
  })

  it('should render foreign message with correct styles', () => {
    const expectedClass = /mr-auto/

    render(<MessageItem message={baseMessage} userId="another-user" />)

    expect(screen.getByText(baseMessage.content).className).toMatch(
      expectedClass
    )
  })

  it('renders "Сохраняю..." if saving', () => {
    const expectedText = /Сохраняю.../i
    const savingMsg = { ...baseMessage, saving: STATUS_SAVING.SAVING }

    render(<MessageItem message={savingMsg} userId={baseMessage.userId} />)

    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  it('renders "Ошибка отправки" if failed', () => {
    const expectedText = /Ошибка отправки/i
    const failedMsg = { ...baseMessage, saving: STATUS_SAVING.FAILED }

    render(<MessageItem message={failedMsg} userId={baseMessage.userId} />)

    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
