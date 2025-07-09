import type { Message } from '../../../types'

export type MessageItemProps = {
  message: Message
  userId: Message[`userId`] | null
}
