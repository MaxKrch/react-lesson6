import { useCallback } from "react";
import NoteForm from "../note-form";
import type { Note } from "../../types";
import useNotes from "../../hooks/use-notes/use-notes";
import { STATUS_REQUEST } from "../../const/api-status";
import NoteList from "../note-list";

const Notes = () => {
    const {
        status, 
        notes,
        createNote,
        deleteNote
    } = useNotes()

    const handleAddNote = useCallback((content: Note[`content`]) => {

    }, [])

    const handleDeleteNote = useCallback((id: Note[`id`]) => {

    }, [])

    return(
        <div>            
            <NoteList
                notes={notes}
                onDeleteNote={handleDeleteNote} 
            />
            <div>
                {status === STATUS_REQUEST.FAILED && `Что-то пошло не так, обновите страницу`}
                {status === STATUS_REQUEST.LOADING && `Загрузка...`}
            </div>
            <NoteForm onAddNote={handleAddNote} />
        </div>
    )
}

export default Notes;