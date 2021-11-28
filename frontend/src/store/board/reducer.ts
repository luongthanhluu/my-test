import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    ERROR_ADD_CARD_MESSAGE,
    ERROR_DELETE_CARD_MESSAGE,
    ERROR_LOAD_CARD_MESSAGE,
    ERROR_MOVE_CARD_MESSAGE,
    ERROR_UPDATE_CARD_MESSAGE,
} from 'constants/message'
import { Card } from 'models/card'
import { RepoItem } from 'models/repo'
import {
    addCard,
    AddCardParams,
    deleteCard,
    getRepoList,
    moveCard,
    MoveCardParams,
    updateCard,
} from './middleware'

export interface BoardState {
    loading: boolean
    data: RepoItem[]
    errorMessage: string
}

const initialState: BoardState = {
    loading: false,
    data: [],
    errorMessage: '',
}

// Ref: https://redux-toolkit.js.org/tutorials/basic-tutorial
// Slice can create actions and reducer together
export const boardSlice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        //get repo list
        [getRepoList.pending.toString()]: (state) => {
            state.loading = true
            state.errorMessage = ''
        },
        [getRepoList.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<RepoItem[]>
        ) => {
            state.loading = false
            state.data = payload
        },
        [getRepoList.rejected.toString()]: (state) => {
            state.loading = false
            state.errorMessage = ERROR_LOAD_CARD_MESSAGE
        },

        //update card
        [updateCard.pending.toString()]: (state) => {
            state.loading = true
            state.errorMessage = ''
        },
        [updateCard.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<Card>
        ) => {
            state.loading = false
            let card = null
            for (let list of state.data) {
                card = list.cards.find((card) => card.id === payload.id)
                if (card) {
                    break
                }
            }
            if (card) {
                card.text = payload.text
                card.note = payload.note
            }
        },
        [updateCard.rejected.toString()]: (state) => {
            state.loading = false
            state.errorMessage = ERROR_UPDATE_CARD_MESSAGE
        },

        //delete card
        [deleteCard.pending.toString()]: (state) => {
            state.loading = true
            state.errorMessage = ''
        },
        [deleteCard.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<string>
        ) => {
            state.loading = false
            let card = null
            let list = null
            let index = 0
            for (list of state.data) {
                index = 0
                for (let item of list.cards) {
                    if (item.id === payload) {
                        card = item
                    }
                    if (card) {
                        break
                    }
                    index++
                }
                if (card) {
                    break
                }
            }
            list?.cards.splice(index, 1)
        },
        [deleteCard.rejected.toString()]: (state) => {
            state.loading = false
            state.errorMessage = ERROR_DELETE_CARD_MESSAGE
        },

        // add new card
        [addCard.pending.toString()]: (state) => {
            state.loading = true
            state.errorMessage = ''
        },
        [addCard.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<AddCardParams>
        ) => {
            state.loading = false
            let list = null
            for (list of state.data) {
                if (list.id === payload.listId) {
                    break
                }
            }
            list?.cards?.push(payload.card)
        },
        [addCard.rejected.toString()]: (state) => {
            state.loading = false
            state.errorMessage = ERROR_ADD_CARD_MESSAGE
        },

        // move card
        [moveCard.pending.toString()]: (state) => {
            state.loading = true
            state.errorMessage = ''
        },
        [moveCard.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<MoveCardParams>
        ) => {
            state.loading = false
            let fromList = null
            let toList = null
            let card = null
            for (fromList of state.data) {
                for (let item of fromList.cards) {
                    if (item.id === payload.cardId) {
                        card = item
                        break
                    }
                }
                if (card) {
                    break
                }
            }
            for (toList of state.data) {
                if (toList.title === payload.title) {
                    break
                }
            }
            if (card) {
                if (!card.activities) {
                    card.activities = []
                }
                const activities = [...card.activities]
                activities.push({
                    createdAt: new Date().toString(),
                    description: `moved from ${fromList?.title} to ${toList?.title}`,
                })
                card.activities = activities
                toList?.cards?.push(card)
            }
            const index = fromList?.cards?.findIndex(
                (item) => item.id === payload.cardId
            )
            if (typeof index === 'number') {
                fromList?.cards?.splice(index, 1)
            }
        },
        [moveCard.rejected.toString()]: (state) => {
            state.loading = false
            state.errorMessage = ERROR_MOVE_CARD_MESSAGE
        },
    },
})
