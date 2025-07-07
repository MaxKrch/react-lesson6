import { useCallback, useEffect, useState } from 'react'
import { STATUS_REQUEST, type STATUS_REQUEST_TYPE } from '../const/api-status'
import type { Note } from '../types'
import { BASE_URL, NOTE_API } from '../const/notes-api'

const useNotes = () => {
  const [status, setStatus] = useState<STATUS_REQUEST_TYPE>(STATUS_REQUEST.IDLE)
  const [notes, setNotes] = useState<Note[]>([])

  const getNotes = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}${NOTE_API.getAll.url}`, {
        method: NOTE_API.getAll.method,
      })

      if (!response.ok) throw `Not Ok Response`

      const notes = await response.json()

      setNotes(notes)
      setStatus(STATUS_REQUEST.SUCCESS)
    } catch {
      setStatus(STATUS_REQUEST.FAILED)
    }
  }, [])

  const createNote = useCallback(
    async (content: Note['content']) => {
      try {
        const note = {
          id: crypto.randomUUID(),
          content,
        }

        const response = await fetch(`${BASE_URL}${NOTE_API.create.url}`, {
          method: NOTE_API.create.method,
          body: JSON.stringify(note),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw `Not Ok Response`

        await getNotes()
      } catch {
        setStatus(STATUS_REQUEST.FAILED)
      }
    },
    [getNotes]
  )

  const deleteNote = useCallback(
    async (id: Note['id']) => {
      try {
        const deleteConfig = NOTE_API.delete(id)

        const response = await fetch(`${BASE_URL}${deleteConfig.url}`, {
          method: deleteConfig.method,
        })

        if (!response.ok) throw `Not Ok Response`

        await getNotes()
      } catch {
        setStatus(STATUS_REQUEST.FAILED)
      }
    },
    [getNotes]
  )

  useEffect(() => {
    getNotes()
  }, [getNotes])

  return {
    status,
    notes,
    getNotes,
    createNote,
    deleteNote,
  }
}

export default useNotes
