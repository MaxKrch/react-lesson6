import NoteForm from '../note-form'
import useNotes from '../../hooks/use-notes'
import { STATUS_REQUEST } from '../../const/api-status'
import NoteList from '../note-list'

const Notes = () => {
  const { status, notes, createNote, deleteNote, getNotes } = useNotes()

  return (
    <div className="p-3 min-w-[300px] max-w-[1200px] my-3 mx-auto w-[90%] min-h-[100vh] bg-[#EFEFEF]">
      <NoteList
        notes={notes}
        onRefreshNotes={getNotes}
        onDeleteNote={deleteNote}
      />
      <div>
        {status === STATUS_REQUEST.FAILED &&
          `Что-то пошло не так, обновите страницу`}
        {status === STATUS_REQUEST.LOADING && `Загрузка...`}
      </div>
      <NoteForm onAddNote={createNote} />
    </div>
  )
}

export default Notes
