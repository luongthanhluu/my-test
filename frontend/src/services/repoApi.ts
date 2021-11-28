import { ERROR_MOVE_CARD_MESSAGE } from './../constants/message'
import { MoveCardParams } from './../store/board/middleware'
import { Card } from 'models/card'
import { Repo, RepoItem } from '../models/repo'

const apiUrl = process.env.REACT_APP_API_URL

export const getListRepoApi = async (): Promise<Repo[]> => {
    const baseUrl = `${apiUrl}/api/repo`
    const reponse = await fetch(baseUrl).then((res) => res.json())
    return reponse.repos
}

export const editRepoApi = async (repo: Repo): Promise<Repo> => {
    const baseUrl = `${apiUrl}/api/repo/${repo.id}`
    await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(repo),
    })
    return repo
}

export const addRepoApi = async (repo: Repo): Promise<Repo> => {
    const baseUrl = `${apiUrl}/api/repo`
    const reponse = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(repo),
    }).then((res) => res.json())
    return reponse
}

export const deleteRepoApi = async (id: string): Promise<string> => {
    const baseUrl = `${apiUrl}/api/repo/${id}`
    await fetch(baseUrl, {
        method: 'DELETE',
    })
    return id
}

export const getRepoDetailApi = async (id: string): Promise<Repo> => {
    const baseUrl = `${apiUrl}/api/repo/${id}`
    const reponse = await fetch(baseUrl).then((res) => res.json())
    return reponse
}

export const getRepoListApi = async (id: string): Promise<RepoItem[]> => {
    const baseUrl = `${apiUrl}/api/repo/${id}/list`
    const reponse = await fetch(baseUrl).then((res) => res.json())
    return reponse.lists
}

export const editCardApi = async (card: Card): Promise<Card> => {
    const baseUrl = `${apiUrl}/api/card/${card.id}`
    await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    }).then((response) => {
        if (
            response?.status !== 201 &&
            response?.status !== 200 &&
            response?.status !== 204
        ) {
            throw new Error("can't update")
        }
    })
    return card
}

export const addCardApi = async (listId: string, card: Card): Promise<Card> => {
    const baseUrl = `${apiUrl}/api/list/${listId}/card`
    const reponse = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
    }).then((res) => res.json())
    return reponse
}

export const deleteCardApi = async (id: string): Promise<string> => {
    const baseUrl = `${apiUrl}/api/card/${id}`
    await fetch(baseUrl, {
        method: 'DELETE',
    }).then((response) => {
        if (
            response?.status !== 201 &&
            response?.status !== 200 &&
            response?.status !== 204
        ) {
            throw new Error("can't delete")
        }
    })
    return id
}

export const moveCardApi = async (
    params: MoveCardParams
): Promise<MoveCardParams> => {
    const baseUrl = `${apiUrl}/api/list`
    await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    }).then((response) => {
        if (
            response?.status !== 201 &&
            response?.status !== 200 &&
            response?.status !== 204
        ) {
            alert(ERROR_MOVE_CARD_MESSAGE)
            throw new Error("can't move")
        }
    })
    return params
}
