import { memo } from "react"
import type { NoteItemProps } from "./note-item.type"

const NoteItem = ({note, onDeleteNote}: NoteItemProps) => {
    return(
        <article>
            {note.content}
        </article>
    )
}

export default memo(NoteItem)