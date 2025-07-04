import { useEffect, useRef, useState } from "react";
import { STATUS_REQUEST, type STATUS_REQUEST_TYPE } from "../../const/api-status";
import type { Note } from "../../types";
import { BASE_URL, NOTE_API } from "../../const/notes-api";

const useNotes = () => {
    const [status, setStatus] = useState<STATUS_REQUEST_TYPE>(STATUS_REQUEST.IDLE);
    const [notes, setNotes] = useState<Note[]>([]);

    const getNotes = async () => {
        try {
            if(status !== STATUS_REQUEST.LOADING) setStatus(STATUS_REQUEST.LOADING);

            const response = await fetch(`${BASE_URL}${NOTE_API.getAll.url}`, {
                method: NOTE_API.getAll.method
            });

            if(!response.ok) throw `Not Ok Response`

            const notes = await response.json();

            setNotes(notes);
            setStatus(STATUS_REQUEST.SUCCESS);
        } catch {
            setStatus(STATUS_REQUEST.FAILED);
        }
    }

    const createNote = async (content: Note[`content`]) => {
        try {
            if(status !== STATUS_REQUEST.LOADING) setStatus(STATUS_REQUEST.LOADING);

            const note = {
                id: crypto.randomUUID(),
                content,
            }

            const response = await fetch(`${BASE_URL}${NOTE_API.create.url}`, {
                method: NOTE_API.create.method,
                body: JSON.stringify(note),
                headers: {
                  "Content-Type": "application/json"
                }
            });

            if(!response.ok) throw `Not Ok Response`

            getNotes()
        } catch {
            setStatus(STATUS_REQUEST.FAILED);
        }
    }

        const deleteNote = async (id: Note[`id`]) => {
        try {
            if(status !== STATUS_REQUEST.LOADING) setStatus(STATUS_REQUEST.LOADING);

            const deleteConfig =NOTE_API.delete(id)

            const response = await fetch(`${BASE_URL}${deleteConfig.url}`, {
                method: deleteConfig.method,
            });

            if(!response.ok) throw `Not Ok Response`

            getNotes()
        } catch {
            setStatus(STATUS_REQUEST.FAILED);
        }
    }

    useEffect (() => {
      getNotes()
    }, [])

    return {
        status,
        notes,
        getNotes,
        createNote,
        deleteNote,
    }
}

export default useNotes