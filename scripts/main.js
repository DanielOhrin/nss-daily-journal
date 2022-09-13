import { DailyJournal } from "./DailyJournal.js"
import { getEntries } from "./database.js"

export let currentEntries = await getEntries()

const container = document.querySelector("#container")
const renderHTML = async () => {
    const newHTML = await DailyJournal()
    container.innerHTML = newHTML
    currentEntries = await getEntries()
}

renderHTML()

document.addEventListener("stateChange", e => {
    console.log(`State Changed. Regenerating HTML...`)
    renderHTML()
})

document.addEventListener(
    "click",
    e => {
        if (e.target.id.startsWith("btn")) {
            const [, btnId] = e.target.id.split("--")

            fetch("http://localhost:8088/entries/" + btnId, {
                method: 'DELETE'
            }).then(
                () => {
                    document.dispatchEvent(new CustomEvent("stateChange"))
                }
            )
        }
    }
)