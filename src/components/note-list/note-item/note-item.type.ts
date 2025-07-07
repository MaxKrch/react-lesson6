import type { Note } from '../../../types'

export type NoteItemProps = {
  note: Note
  onDeleteNote: (id: Note[`id`]) => void
}
