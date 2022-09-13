import { getMoods } from "./database.js"

const moods = await getMoods()

export const Moods = () => {
    let html = `
    <label for="mood">Mood for the day</label>
    <select name="mood" id="entryForm__mood">
    <option value="0" id="mood-placeholder">Choose a Mood</option>`

    moods.map(mood => {
        html += `<option value="${mood.id}">${mood.label}</option>`
    })

    html += `</select>`

    return html
}