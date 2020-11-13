import {combineReducers} from 'redux'
import {notesReucer} from './notes/reducer'

export const mainStore = combineReducers({ 
  notes: notesReucer
})