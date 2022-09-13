const database = {
    entries: [],
    newEntry: {}, // State Object for User Input Form
    currentMood: {} //State Object for Mood Filter
}

// export const getEntries = async () => {
//     const response = await fetch("http://localhost/8088");
//     const entries = await response.json();
//     return entries;  
//   }

export const currentMood = database.currentMood

export const clearNewEntry = () => {
    database.newEntry = {}
}

export const getEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood").then(response => {
        return response.json()
    }).then(entries => {
        return entries
    })
}

export const getMoods = () => {
    return fetch("http://localhost:8088/moods").then(response => {
        return response.json()
    }).then(mood => {
        return mood
    })
}

export const saveJournalEntry = (entryObj) => {
    fetch(`http://localhost:8088/entries`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
        .then(
            () => {
                getEntries() //Get all journal entries
            }
        )
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChange")) //Broadcast the state change event
            }
        )
}

export const getEntryTags = () => {
    return fetch("http://localhost:8088/entrytags").then(response => {
        return response.json()
    })
}

export const setDate = (date) => {
    let newDate = date.split("-")
    newDate.reverse()

    let temp = newDate[0]
    newDate[0] = newDate[1]
    newDate[1] = temp

    database.newEntry.date = newDate.join("/")
}

export const setConcept = (conceptString) => {
    database.newEntry.concept = conceptString
}

export const setEntry = (entryString) => {
    database.newEntry.entry = entryString
}

export const setMood = (id) => {
    database.newEntry.moodId = parseInt(id)
}

export const NewEntry = () => {
    return { ...database.newEntry }
}

export const getTags = () => {
    return fetch("http://localhost:8088/tags").then(response => {
        return response.json()
    })
}