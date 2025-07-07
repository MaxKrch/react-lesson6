import NoteItem from './note-item/note-item'
import type { NoteListProps } from './note-list.type'

const NoteList = ({ notes, onDeleteNote, onRefreshNotes }: NoteListProps) => {
  return (
    <>
      <div className="flex gap-3 items-center h-8 my-2">
        <h2 className="text-xl font-bold">{`Notes`}</h2>
        <button
          className="border border-green-500 rounded-full w-6 h-6 shadow cursor-pointer bg-[#FFFFFF80] hover:bg-[#FEFEFE80] text-green-500"
          aria-label="refresh notes"
          onClick={onRefreshNotes}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              stroke="none"
              d="M25 38c-7.2 0-13-5.8-13-13 0-3.2 1.2-6.2 3.3-8.6l1.5 1.3C15 19.7 14 22.3 14 25c0 6.1 4.9 11 11 11 1.6 0 3.1-.3 4.6-1l.8 1.8c-1.7.8-3.5 1.2-5.4 1.2z"
            />
            <path
              fill="currentColor"
              stroke="none"
              d="M34.7 33.7l-1.5-1.3c1.8-2 2.8-4.6 2.8-7.3 0-6.1-4.9-11-11-11-1.6 0-3.1.3-4.6 1l-.8-1.8c1.7-.8 3.5-1.2 5.4-1.2 7.2 0 13 5.8 13 13 0 3.1-1.2 6.2-3.3 8.6z"
            />
            <path fill="currentColor" stroke="none" d="M18 24h-2v-6h-6v-2h8z" />
            <path fill="currentColor" stroke="none" d="M40 34h-8v-8h2v6h6z" />
          </svg>
        </button>
      </div>

      <ul className="flex justify-start flex-wrap gap-4">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteItem note={note} onDeleteNote={onDeleteNote} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default NoteList
