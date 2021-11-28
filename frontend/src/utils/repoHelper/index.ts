import { Repo } from 'models/repo'

export const getIndexRepoById = (listRepo: Repo[], id: string) => {
    let index = -1
    while (index < listRepo?.length) {
        index++
        if (listRepo[index]?.id === id) {
            return index
        }
    }
    return -1
}
