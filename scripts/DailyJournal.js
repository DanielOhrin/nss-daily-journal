import { Entries } from "./Entries.js"
import { JournalForm } from "./JournalForm.js"

export const DailyJournal = async () => {
    return `
    ${ JournalForm() }
    <article id="entries">
        <hr style="opacity:0%">
        <div class="entryList">
            ${ await Entries() }
        </div>
    </article>
    `
}
