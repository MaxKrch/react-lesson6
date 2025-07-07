import { memo } from 'react'
import type { NoteItemProps } from './note-item.type'

const NoteItem = ({ note, onDeleteNote }: NoteItemProps) => {
  return (
    <article className="min-w-[250px] max-w-[350px] w-[25%] h-[150px] p-0 relative">
      <div className="bg-white h-[100%] px-4 py-2">{note.content}</div>
      <button
        className="absolute right-[-8px] top-[-8px] w-[24px] h-[24px] rounded-full border border-red-500 cursor-pointer shadow-lg hover:bg-[#99999910]"
        aria-label="delete note"
        onClick={() => onDeleteNote(note.id)}
      >
        <span className="text-red-500">✘</span>
      </button>
    </article>
  )
}

export default memo(NoteItem)
