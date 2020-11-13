import {
  NOTES_SET_NOTES,
  NOTES_TOOGLE_BOOKED,
  NOTES_DELETE_NOTE,
  NOTES_ADD_NOTE,
  NOTES_SET_LOADING,
  NOTES_CHANGE_FILTER,
  NOTES_EDIT_NOTE
} from '../consts'

const notesInitialState = {
  notes: [],
  bookedNotes: [],
  loading: true,
  filter: 'datea'
}

export function notesReucer(state = notesInitialState, action) {
  switch (action.type) {
    case NOTES_SET_NOTES:
      return {
        ...state,
        notes: action.notes,
        bookedNotes: action.notes.filter(n => n.booked),
        loading: false
      }

    case NOTES_TOOGLE_BOOKED:
      const notes = state.notes.map(n => {
        if(n.id == action.id) n.booked = !n.booked
        return n
      })
      return {
        ...state,
        notes,
        bookedNotes: notes.filter(n => n.booked)
      }
    
    case NOTES_DELETE_NOTE:
      const correctNotes = state.notes.filter(n => n.id != action.id)
      return {
        ...state, 
        notes: correctNotes,
        bookedNotes: correctNotes.filter(n => n.booked)
      }
    
    case NOTES_ADD_NOTE:
      state.notes.unshift(action.note)
      return {
        ...state, 
        notes: state.notes.slice()
      }
    
    case NOTES_EDIT_NOTE:
      return {
        ...state, 
        notes: state.notes.map(n => {
          if(action.noteId == n.id) return {...n, ...action.note}
          return n
        })
      }
    
    case NOTES_SET_LOADING:
      return {
        ...state, 
        loading: action.loading
      }

    case NOTES_CHANGE_FILTER:
      return {
        ...state, 
        filter: action.filter
      }

    default:
      return state
  }
}