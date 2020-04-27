'use strict'

let notes = getSavedNotes()

console.log(notes)

const filters = {
    searchText: '', 
    sortBy: 'byEdited'
}

renderNotes(notes, filters)


document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()        // adding timestamps
    notes.push({
        id, 
        title: '',
        body: '', 
        createdAt: timestamp, 
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`edit.html#${id}`)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
        filters.searchText = e.target.value
        renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
        filters.sortBy = e.target.value
        renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {     // event listener by storage change, the event contains the old and the new data as well
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

