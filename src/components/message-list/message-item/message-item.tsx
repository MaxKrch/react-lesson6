import clsx from 'clsx'
import type { MessageItemProps } from './message-item.type'
import { STATUS_SAVING } from '../../../const/api-status'
import { forwardRef } from 'react'

const MessageItem = forwardRef<HTMLElement, MessageItemProps>(
  ({ message, userId }, ref) => {
    const isOwn = message.userId === userId

    return (
      <article ref={ref}>
        <div
          className={clsx(
            `min-w-[250px] max-w-[750px] w-fit min-h-[50px] p-3 rounded-xl shadow text-semibold`,
            isOwn ? `ml-auto bg-green-500/50` : `mr-auto bg-yellow-300/50`
          )}
        >
          {message.content}
        </div>

        {message.saving && (
          <div
            className={clsx('p-1 flex justify-end font-bold text-xs', {
              'text-red-500 text-xs': message.saving === STATUS_SAVING.FAILED,
            })}
          >
            {message.saving === STATUS_SAVING.SAVING && `Сохраняю...`}
            {message.saving === STATUS_SAVING.FAILED && `Ошибка отправки`}
          </div>
        )}
      </article>
    )
  }
)

MessageItem.displayName = `MessageItem`

export default MessageItem
