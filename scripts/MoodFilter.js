import { getMoods, currentMood } from "./database.js"

const moods = await getMoods()

export const MoodFilter = () => {
    
    let html = `<legend>Filter Journal Entries by Mood</legend>`
    
    moods.map(mood => {
        html += `<div class="moodFilter-div">
        <input type ="radio" name="moodFilter" value="${mood.id}">
        <label for="moodFilter--happy">${mood.label}</label>
        </div>`
    }).join("")

    return html
}

document.addEventListener(
    "change",
    e => {
        if (e.target.name === "moodFilter") {
            currentMood.moodId = moods.find(mood => mood.id === parseInt(e.target.value)).id

            document.dispatchEvent(new CustomEvent("stateChange"))
        }
    }
)