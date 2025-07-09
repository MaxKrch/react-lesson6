import { useCallback, useEffect, useRef, useState } from 'react'
import type { Message } from '../types'
import { STATUS_REQUEST, type STATUS_REQUEST_TYPE } from '../const/api-status'
import { BASE_URL, MESSAGES_API } from '../const/messages-api'

type useMessagesPollingArgs = {
  delay?: number
  onNewMessage?: () => void
}

const useMessagesPolling = ({
  delay = 3,
  onNewMessage,
}: useMessagesPollingArgs) => {
  const messages = useRef<Message[]>([])
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [status, setStatus] = useState<STATUS_REQUEST_TYPE>(STATUS_REQUEST.IDLE)
  const isFetching = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
  }, [])

  const getNewMessages = useCallback(async () => {
    if (isFetching.current) return

    isFetching.current = true

    try {
      setStatus(STATUS_REQUEST.LOADING)

      const lastMessage = messages.current.at(-1)
      const id = lastMessage ? (lastMessage.serverId ?? -1) : -1

      const getNewMessageAPI = MESSAGES_API.getNew(id)
      const response = await fetch(`${BASE_URL}${getNewMessageAPI.url}`, {
        method: getNewMessageAPI.method,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error(`Bad Response`)

      const newMessages: Message[] = await response.json()
      const filteredMessages = newMessages.filter(
        (message) =>
          messages.current.findIndex(
            (item) => item.serverId === message.serverId
          ) < 0
      )

      messages.current = [...messages.current, ...filteredMessages]
      setStatus(STATUS_REQUEST.SUCCESS)

      if (onNewMessage && newMessages.length > 0) {
        onNewMessage()
      }
    } catch {
      setStatus(STATUS_REQUEST.FAILED)
    } finally {
      isFetching.current = false
    }
  }, [onNewMessage])

  const messagesPolling = useCallback(() => {
    getNewMessages()
  }, [getNewMessages])

  const setTimer = useCallback(() => {
    clearTimer()
    timerId.current = setTimeout(() => {
      messagesPolling()
      setTimer() // снова запустить
    }, delay * 1000)
  }, [clearTimer, delay, messagesPolling])

  const saveMessage = (message: Message) => {
    messages.current = [...messages.current, message]
  }

  useEffect(() => {
    messagesPolling()
    setTimer()

    return () => clearTimer()
  }, [messagesPolling, setTimer, clearTimer])

  return {
    messages,
    status,
    getNewMessages,
    saveMessage,
  }
}

export default useMessagesPolling
