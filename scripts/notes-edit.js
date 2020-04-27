'use strict'

const noteTitle = document.getElementById('note-title')
const noteBody = document.getElementById('note-body')
const removeButton = document.getElementById('remove-note')
const updatedAtEl = document.getElementById('note-edited')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()

let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('index.html')
}

noteTitle.value = note.title
noteBody.value = note.body
updatedAtEl.innerText = generateLastEdited(note.updatedAt)    


noteTitle.addEventListener('input', (e) => {
    const title = e.target.value
    note.title = title
    note.updatedAt = moment().valueOf()
    updatedAtEl.innerText = generateLastEdited(note.updatedAt)    
    saveNotes(notes)
})

noteBody.addEventListener('input', (e) => {
    const body = e.target.value
    note.body = body
    note.updatedAt = moment().valueOf()     // updating timestamps
    updatedAtEl.innerText = generateLastEdited(note.updatedAt)    
    saveNotes(notes)
})

removeButton.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('index.html')
})

window.addEventListener('storage', (e) => {     // event listener by storage change, the event contains the old and the new data as well
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign('index.html')
        }
        noteTitle.value = note.title
        noteBody.value = note.body
        updatedAtEl.innerText = generateLastEdited(note.updatedAt)    
    }
})