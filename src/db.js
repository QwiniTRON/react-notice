import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('notes.db')

const SqlManager = {
  sqlEditWithoutImg: `
      UPDATE notes SET text = ?, title = ? WHERE id = ?
    `,
  sqlEdit: `
      UPDATE notes SET text = ?, title = ?, img = ? WHERE id = ?
    `,
  sqlCreateNoteTable: `
    CREATE TABLE IF NOT EXISTS notes(
    id INTEGER PRIMARY KEY NOT NULL,
    img TEXT,
    text TEXT NOT NULL,
    title TEXT NOT NULL,
    date TEXT,
    booked INT
  )`,
  sqlGetAllNotes: `
    SELECT * FROM notes
  `,
  sqlCreateNote: `
    INSERT INTO notes(img, text, title, date, booked) values 
    (?, ?, ?, ?, ?)
  `,
  sqlUpdateBookedOfNote: `
    UPDATE notes SET booked = ? WHERE id = ?  
  `,
  sqlDeleteNote: `
    DELETE FROM notes WHERE id = ?
  `
}

export class DB {
  static INIT() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {

        tx.executeSql(
          SqlManager.sqlCreateNoteTable, [],
          resolve,
          (_, err) => reject(err)
        )
      })
    })
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          SqlManager.sqlGetAllNotes, [],
          (_, result) => resolve(result.rows._array),
          (_, err) => reject(err)
        )
      })
    })
  }

  static createPost({ img, text, date, title }) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          SqlManager.sqlCreateNote, [img, text, title, date, 0],
          (_, results) => resolve(results.insertId),
          (_, err) => reject(err)
        )
      })
    })
  }

  static editPost({ img, text, title, id }) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        let sql = SqlManager.sqlEditWithoutImg
        let params = [text, title]
        if(img) {
          sql = SqlManager.sqlEdit
          params.push(img)
        }
        params.push(id)

        tx.executeSql(
          sql, params,
          (_, results) => resolve(),
          (_, err) => reject(err)
        )
      })
    })
  }

  static updateNote(note) {
    const newBooked = !note.booked

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          SqlManager.sqlUpdateBookedOfNote, [+newBooked, note.id],
          (_, results) => resolve(),
          (_, err) => reject(err),
        )
      })
    })
  }

  static removeNote(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(SqlManager.sqlDeleteNote, [id],
          (_, results) => resolve(),
          (_, err) => reject(err),
        )
      })
    })
  }

}