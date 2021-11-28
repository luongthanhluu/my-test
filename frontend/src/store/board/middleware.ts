import { createAsyncThunk } from '@reduxjs/toolkit'
import { Card } from 'models/card'
import {
    addCardApi,
    deleteCardApi,
    editCardApi,
    getRepoDetailApi,
    getRepoListApi,
    moveCardApi,
} from './../../services/repoApi'

export interface AddCardParams {
    listId: string
    card: Card
}

export interface MoveCardParams {
    cardId: string
    title: string
}

export const getRepoDetail = createAsyncThunk(
    'repo/getRepoDetail',
    async (id: string) => {
        const response = await getRepoDetailApi(id)
        return response
    }
)

export const getRepoList = createAsyncThunk(
    'repo/getRepoList',
    async (id: string) => {
        const response = await getRepoListApi(id)
        return response
    }
)

export const updateCard = createAsyncThunk(
    'repo/updateCard',
    async (card: Card) => {
        const response = await editCardApi(card)
        return response
    }
)

export const deleteCard = createAsyncThunk(
    'repo/deleteCard',
    async (id: string) => {
        const response = await deleteCardApi(id)
        return response
    }
)

export const addCard = createAsyncThunk(
    'repo/addCard',
    async (params: AddCardParams) => {
        const response = await addCardApi(params.listId, params.card)
        return {
            listId: params.listId,
            card: response,
        }
    }
)

export const moveCard = createAsyncThunk(
    'repo/moveCard',
    async (params: MoveCardParams) => {
        await moveCardApi(params)
        return params
    }
)
