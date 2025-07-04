import NoteItem from "./note-item/note-item"
import type { NoteListProps } from "./note-list.type"

const NoteList = ({notes, onDeleteNote}: NoteListProps) => {
    return(
        <ul>
            {notes.map(note => (
                <li key={note.id}>
                    <NoteItem note={note} onDeleteNote={onDeleteNote} />
                </li>
            ))}
        </ul>
    )
}

export default NoteList