import { useRef } from 'react'
import { STATUS_REQUEST, STATUS_SAVING } from '../../const/api-status'
import scrollToElement from '../../helpers/scroll-to-element'
import useMessagesPolling from '../../hooks/use-messages-polling'
import useSendMessage from '../../hooks/use-send-message'
import useUserId from '../../hooks/use-user-id'
import type { Message } from '../../types'
import MessageForm from '../message-form/message-form'
import MessageList from '../message-list/message-list'

const Chat = () => {
  const userId = useUserId()
  const lastMessageContainer = useRef<HTMLElement | null>(null)

  const { messages, status: statusPolling } = useMessagesPolling({
    onNewMessage: () =>
      setTimeout(() => scrollToElement(lastMessageContainer), 50),
  })

  const { sendMessage, isFetching: isSaving } = useSendMessage(messages)

  const handleSendMessage = (content: string) => {
    if (!userId.current) return
    const lastMessage = messages.current.at(-1)
    const nextId = (lastMessage?.serverId ?? lastMessage?.id ?? -1) + 1
    const newMessage: Message = {
      id: nextId,
      userId: userId.current,
      content: content,
      serverId: null,
      saving: STATUS_SAVING.SAVING,
    }

    sendMessage(newMessage)
    setTimeout(() => scrollToElement(lastMessageContainer), 50)
  }

  return (
    <div className="min-w-[300px] max-w-[900px] w-[90%] p-4 bg-[#FAFAFA] min-h-[350px] h-screen m-auto flex flex-col gap-3">
      <MessageList
        lastMessageRef={lastMessageContainer}
        messages={messages.current}
        userId={userId.current}
      />
      {statusPolling === STATUS_REQUEST.FAILED && (
        <div className="text-red-500 font-semibold text-sm">
          Сервер временно недоступен
        </div>
      )}
      <MessageForm
        onSendMessage={handleSendMessage}
        isActiveForm={!isSaving.current}
      />
    </div>
  )
}

export default Chat
