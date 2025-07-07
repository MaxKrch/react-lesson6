import type { Note } from '../../types'

export type NoteFormProps = {
  onAddNote: (content: Note[`content`]) => void
}
