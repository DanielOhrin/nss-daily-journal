import { getEntryTags, getTags } from "./database.js"

//Checks if the tag given already exists within the database. If it does not, it creates a new object for that tag in the database. Returns the matching tag's id in both cases.
export const TagCheck = async (tagToCheck) => {
    const tags = await getTags() // Not updating after being called once

    const tempTagArr = await findTag(tagToCheck)
    
    if (tempTagArr[0]) {
        return tempTagArr[0].id
    } else {
        const lastIndex = tags.length - 1
        const newId = tags[lastIndex].id + 1
        const newTag = {
            id: newId,
            subject: tagToCheck
        }

        fetch(`http://localhost:8088/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
        }).then(
                () => {
                    getTags() //Get all tags
                }
            )

        return newTag.id
    }
}

export const findTag = (subject) => {
    return fetch(`http://localhost:8088/tags?subject=${subject}`).then(response => {
        return response.json()
    })
}

//Creates a new object in EntryTags
export const newEntryTag = async (idOfEntry, idOfTag) => {
    const tagEntries = await getEntryTags() //Also Not updating after being called once

    const lastIndex = tagEntries.length - 1
    const newId = tagEntries[lastIndex].id + 1

    const newEntry = {
        id: newId,
        entryId: idOfEntry,
        tagId: idOfTag
    }

    fetch('http://localhost:8088/entrytags', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntry)
    }).then(
        () => {
            getEntryTags()
        }
    )
}