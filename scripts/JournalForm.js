import { saveJournalEntry, NewEntry, clearNewEntry, getTags, getEntryTags } from "./database.js"
import { Moods } from "./Moods.js"
import { currentEntries } from "./main.js"
import { MoodFilter } from "./MoodFilter.js"
import { newEntryTag } from "./Tags.js"
import { Instructors } from "./Instructors.js"

const tags = await getTags()

export const JournalForm = () => {
    return `<form class="entryForm">
    <fieldset>
    <label for="entryDate">Date</label>
    <input type="date" name="entryDate" id="entryForm__date">
    </fieldset>
    <fieldset>
    <label for="topicsCovered">Concepts covered</label>
    <input type="text" name="topicsCovered" id="entryForm__topics">
    </fieldset>
    <fieldset>
    <label for="entryText">Journal Entry</label>
    <textarea name="entryText" id="entryForm__text"></textarea>
    </fieldset>
    <fieldset>
    ${Moods()}
    </fieldset>
    <fieldset>
    ${Instructors()}
    </fieldset>
    <fieldset>
    <label for="tags">Tags</label>
    <input type="text" name="tags" id="entryForm__tags">
    </fieldset>
    <button id="save-btn" type="button" style="margin-top: 5px">Record Journal Entry</button>
    <hr>
    <fieldset>
    ${MoodFilter()}
    </fieldset>
    </form>`
}

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "save-btn") {
            const newEntry = NewEntry()
            if (Object.keys(newEntry).length >= 4 && newEntry.moodId) {//inside of the IF statement

                const lastIndex = currentEntries.length - 1
                newEntry.id = currentEntries[lastIndex].id + 1

                if (document.getElementById("entryForm__tags").value) {
                    const tagArr = document.getElementById("entryForm__tags").value.split(",").map(value => value.trim().toLowerCase().replace(' ', '-'))
                    
                    newEntryTag(newEntry.id, tagArr)

                }

                saveJournalEntry(newEntry)
                clearNewEntry()
            } else {
                window.alert("Please fill out the entire form before submitting.")
            }
        }

    }
)

