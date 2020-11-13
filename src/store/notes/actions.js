import * as FileSystem from 'expo-file-system';

import {
  NOTES_SET_NOTES,
  NOTES_TOOGLE_BOOKED,
  NOTES_DELETE_NOTE,
  NOTES_ADD_NOTE,
  NOTES_SET_LOADING,
  NOTES_CHANGE_FILTER,
  NOTES_EDIT_NOTE
} from '../consts'
import { DB } from '../../db'


// FUNCS
async function saveFile(oldPath, newPath) {
  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: oldPath
    })

    return newPath
  } catch (err) {
    throw err
  }
}

async function deleteFile(path) {
  try {
    await FileSystem.deleteAsync(path)
    return true
  } catch (err) {
    throw err
  }
}
// FUNCS \\


export function setNotes(notes) {
  return {
    type: NOTES_SET_NOTES,
    notes
  }
}

export function editAndUpdateNotes(noteEdited) {
  return {
    type: NOTES_EDIT_NOTE,
    noteId,
    note: noteEdited
  }
}

export function setFilter(filter) {
  return {
    type: NOTES_CHANGE_FILTER,
    filter
  }
}

export function setLoading(loading) {
  return {
    type: NOTES_SET_LOADING,
    loading
  }
}

export function toogleBooked(note) {
  return async dispatch => {
    try {
      DB.updateNote(note)
    } catch (err) {
      console.log('toggle note error •', err);
    }

    dispatch({
      type: NOTES_TOOGLE_BOOKED,
      id: note.id
    })
  }
}

export function deleteNote(id, imgPath) {
  return async dispatch => {

    try {
      await DB.removeNote(id)
    } catch (err) {
      console.log('delete note error •', err);
    }

    if (imgPath) {
      try {
        await deleteFile(imgPath)
      } catch (err) {
        console.log('delete note error •', err);
      }
    }

    dispatch({
      type: NOTES_DELETE_NOTE,
      id
    })
  }
}

export function addNote(note) {
  return async dispatch => {
    if (note.img) {
      const fileName = note.img.split('/').pop()
      const newPath = FileSystem.documentDirectory + fileName

      try {
        await saveFile(note.img, newPath)
        note.img = newPath
      } catch (err) {
        console.log('Add Note Error • ', err);
      }
    }

    try {
      const id = await DB.createPost(note)
      note.id = id
    } catch (err) {
      console.log('create Post Error • ');
    }

    dispatch({
      type: NOTES_ADD_NOTE,
      note
    })
  }
}

export function editNote(note) {
  return async dispatch => {
    const editedNote = {
      text: note.text,
      title: note.title
    }

    // если есть путь, значит это путь к новой картинке
    if (note.img) {
      const fileName = note.img.split('/').pop()
      const newPath = FileSystem.documentDirectory + fileName

      try {
        if (note.sourceNote.img) await deleteFile(note.sourceNote.img)

        await saveFile(note.img, newPath)
        note.img = newPath
        editedNote.img = newPath
      } catch (err) {
        console.log('Edit Note Error • ', err);
      }
    }

    try {
      await DB.editPost(note)
    } catch (err) {
      console.log('Edit Post Error • ');
    }

    dispatch({
      type: NOTES_EDIT_NOTE,
      noteId: note.id,
      note: editedNote
    })
  }
}

export function fetchNotes() {
  return async function (dispatch, getState) {
    const notes = await DB.getPosts()

    notes.sort((l, r) => new Date(r.date) - new Date(l.date))

    dispatch(setNotes(notes))
  }
}