import { clearInstructor, getInstructors, setInstructor } from "./database.js"

const instructors = await getInstructors()

export const Instructors = () => {
    let html = `
    <label for="instructors">Instructor</label>
    <select name="instructors" id="entryForm__instructor">
    <option value="0" id="instructor-placeholder">Choose an Instructor</option>`

    instructors.map(instructor => {
        if (instructor.first_name !== "Not") {
            html += `<option value="${instructor.id}">${instructor.first_name}</option>`
        }
    })

    html += `</select>`

    return html
}

document.addEventListener(
    "change",
    e => {
        if (e.target.name.startsWith("instructor")) {
            if (e.target.value !== "0" && e.target.value) {
                setInstructor(parseInt(e.target.value))
            } else {
                setInstructor(0)
            }
        }
    }
)