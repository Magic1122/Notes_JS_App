'use strict'

// Read existing notes from local storage

const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []               // avoding cracshing if the data is invalid
    } catch (e) {
        return []
    }
}

// Save the notes to localStorage

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from a list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.innerText = note.title
    } else {
        textEl.innerText = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)


    // Setup the link
    noteEl.setAttribute('href', `./edit.html#${note.id}`)   // we get acces to the id through location.hash
    noteEl.classList.add('list-item')

    // Setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

//Sort your notes by one of three ways

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => b.updatedAt - a.updatedAt)
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => b.createdAt - a.createdAt)
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) { 
                return -1 
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) { 
                return 1 
        }
            return 0;
    })
    } else {
        return notes
    }
}

// Render application notes

const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emtpyMessage = document.createElement('p')
        emtpyMessage.textContent = 'No notes to show'
        emtpyMessage.classList.add('empty-message')
        notesEl.append(emtpyMessage)
    }
}

// Generate the last edited msg

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
