import { createSelector } from 'reselect'

const filterSortFuncsList = {
  'datea': (l, r) => new Date(r.date) - new Date(l.date),
  'dated': (l, r) => new Date(l.date) - new Date(r.date),
  'namea': (l, r) => String(l.title).localeCompare(String(r.title), 'ru'),
  'named': (l, r) => String(r.title).localeCompare(String(l.title), 'ru')
}

export const getNotes = createSelector(
  state => state.notes.notes,
  state => state.notes.filter,
  (notes, filter) => {
    return notes.sort(filterSortFuncsList[filter]).slice()
  }
)