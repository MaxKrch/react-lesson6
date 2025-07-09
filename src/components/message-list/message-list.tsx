import MessageItem from './message-item/'
import type { MessageListProps } from './message-list.type'

const MessageList = ({
  messages,
  userId,
  lastMessageRef,
}: MessageListProps) => {
  return (
    <>
      <h3 className="font-bold text-xl">Anonymus Chat</h3>
      <ul className="flex-1 overflow-auto rounded bg-white p-3 inset-shadow flex flex-col gap-3">
        {messages.map((message, index) => (
          <li key={`${message.id}${message.serverId ?? 0}`}>
            {
              <MessageItem
                ref={index === messages.length - 1 ? lastMessageRef : undefined}
                message={message}
                userId={userId}
              />
            }
          </li>
        ))}
      </ul>
    </>
  )
}

export default MessageList
