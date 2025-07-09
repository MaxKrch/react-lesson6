import type { RefObject } from 'react'
import type { Message } from '../../types'

export type MessageListProps = {
  lastMessageRef: RefObject<HTMLElement | null>
  messages: Message[]
  userId: Message[`userId`] | null
}
