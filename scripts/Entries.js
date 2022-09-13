import { currentMood, getEntries, setConcept, setDate, setEntry, setMood } from "./database.js"

export const Entries = async () => {
    let allEntriesAsHTML = ""
    const entries = await getEntries()

    if (!currentMood.moodId) {

        for (const entry of entries) {
            allEntriesAsHTML += `
            <h2 class="topic-h2">${entry.concept}</h2>
            <p>${entry.entry}<br>${entry.date}</p>
            <button type="button" id="btn--${entry.id}" class="delete-btn">Delete Entry</button>
            <hr>
        `
        }
    } else {
        for (const entry of entries) {
            if (entry.moodId === currentMood.moodId) {
                allEntriesAsHTML += `
                <h2 class="topic-h2">${entry.concept}</h2>
                <p>${entry.entry}<br>${entry.date}</p>
                <button type="button" id="btn--${entry.id}" class="delete-btn">Delete Entry</button>
                <hr>
                `
            }
        }
    }
    return allEntriesAsHTML
}

document.addEventListener(
    "change",
    e => {
        if (e.target.name === "entryDate") {
            setDate(e.target.value)
        }
        if (e.target.name === "topicsCovered") {
            setConcept(e.target.value)
        }
        if (e.target.name === "entryText") {
            setEntry(e.target.value)
        }
        if (e.target.name === "mood") {
            setMood(e.target.value)
        }
    }
)
