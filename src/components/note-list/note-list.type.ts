import type { Note } from "../../types"

export type NoteListProps = {
    notes: Note[],
    onDeleteNote: (id: Note[`id`]) => void
}