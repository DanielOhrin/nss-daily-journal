import { getEntryTags, getTags } from "./database.js"

//Checks if the tag given already exists within the database. If it does not, it creates a new object for that tag in the database. Returns the matching tag's id in both cases.
export const TagCheck = async (tagArr) => {
    const tags = await getTags() // Not updating after being called once
    const IDArr = []
    let lastIndex = tags.length - 1;
    let newId = tags[lastIndex].id + 1;

    for (const tag of tagArr) {
        const tempTagArr = await findTag(tag)

        if (tempTagArr[0]) {
            IDArr.push(tempTagArr[0].id)
        } else {
            const newTag = {
                id: newId,
                subject: tag
            }
            IDArr.push(newTag.id)
            newId++
            fetch(`http://localhost:8088/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTag)
            })
        }
    }
    return IDArr

}

export const findTag = (subject) => {
    return fetch(`http://localhost:8088/tags?subject=${subject}`).then(response => {
        return response.json()
    })
}

//Creates a new object in EntryTags
export const newEntryTag = async (idOfEntry, tagArr) => {
    const tagEntries = await getEntryTags() //Also Not updating after being called once
    const tagIds = await TagCheck(tagArr)

    let lastIndex = tagEntries.length - 1
    let newId = tagEntries[lastIndex].id + 1

    for (const id of tagIds) {
        const newEntry = {
            id: newId,
            entryId: idOfEntry,
            tagId: id
        }

        newId++

        fetch('http://localhost:8088/entrytags', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntry)
        })
    }


}