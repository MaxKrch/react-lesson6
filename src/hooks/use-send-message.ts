import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import type { Message } from '../types'
import { STATUS_SAVING, type STATUS_SAVING_TYPE } from '../const/api-status'
import { BASE_URL, MESSAGES_API } from '../const/messages-api'

const useSendMessage = (messages: RefObject<Message[]>) => {
  const [status, setStatus] = useState<STATUS_SAVING_TYPE>(STATUS_SAVING.IDLE)
  const savingMessage = useRef<Message | null>(null)
  const isFetching = useRef(false)

  const clear = useCallback(() => {
    setStatus(STATUS_SAVING.IDLE)
    savingMessage.current = null
  }, [])

  useEffect(() => {
    if (status === STATUS_SAVING.SUCCESS || status === STATUS_SAVING.FAILED) {
      const message = savingMessage.current
      if (!message) return

      const newMessages = messages.current.map((item) => {
        return item.id !== message?.id
          ? item
          : {
              ...message,
              saving: status,
            }
      })

      messages.current = newMessages
    }
  }, [status, messages])

  const sendMessage = useCallback(
    async (message: Message) => {
      if (isFetching.current) return

      isFetching.current = true
      try {
        savingMessage.current = message
        const allMessages = [...messages.current, message]
        messages.current = allMessages

        setStatus(STATUS_SAVING.SAVING)

        const response = await fetch(`${BASE_URL}${MESSAGES_API.create.url}`, {
          method: MESSAGES_API.create.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })

        if (!response.ok) throw new Error(`Bad Response`)

        const reponseMessage = await response.json()

        savingMessage.current = reponseMessage
        setStatus(STATUS_SAVING.SUCCESS)
      } catch {
        setStatus(STATUS_SAVING.FAILED)
      } finally {
        isFetching.current = false
      }
    },
    [messages]
  )

  return {
    savingMessage,
    sendMessage,
    status,
    clear,
    isFetching,
  }
}

export default useSendMessage
