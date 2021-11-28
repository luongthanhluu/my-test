import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import {
    ERROR_ADD_REPO_MESSAGE,
    ERROR_DELETE_REPO_MESSAGE,
    ERROR_UPDATE_REPO_MESSAGE,
    ERROR_LOAD_REPO_MESSAGE,
} from 'constants/message'
import { Repo } from 'models/repo'
import { getIndexRepoById } from 'utils/repoHelper'
import { repoList, updateRepo, addRepo, deleteRepo } from './middleware'

export interface RepoState {
    list: {
        loading: boolean
        data: Repo[]
        errorMessage: string
    }
}

const initialState: RepoState = {
    list: {
        loading: false,
        data: [],
        errorMessage: '',
    },
}

// Ref: https://redux-toolkit.js.org/tutorials/basic-tutorial
// Slice can create actions and reducer together
export const repoSlice = createSlice({
    name: 'repo',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        //get list repo
        [repoList.pending.toString()]: (state) => {
            state.list.loading = true
        },
        [repoList.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<Repo[]>
        ) => {
            state.list.loading = false
            state.list.data = payload
        },
        [repoList.rejected.toString()]: (state) => {
            state.list.loading = false
            state.list.errorMessage = ERROR_LOAD_REPO_MESSAGE
        },

        //update repo name
        [updateRepo.pending.toString()]: (state) => {
            state.list.loading = true
        },
        [updateRepo.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<Repo>
        ) => {
            state.list.loading = false
            const listRepo = current(state.list.data)
            const index = getIndexRepoById(listRepo, payload?.id || '')
            if (index > -1) {
                state.list.data[index] = payload
            }
        },
        [updateRepo.rejected.toString()]: (state) => {
            state.list.loading = false
            state.list.errorMessage = ERROR_UPDATE_REPO_MESSAGE
        },

        // add new repo
        [addRepo.pending.toString()]: (state) => {
            state.list.loading = true
        },
        [addRepo.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<Repo>
        ) => {
            state.list.loading = false
            state.list.data = [...state.list.data, payload]
        },
        [addRepo.rejected.toString()]: (state) => {
            state.list.loading = false
            state.list.errorMessage = ERROR_ADD_REPO_MESSAGE
        },

        // delete new repo
        [deleteRepo.pending.toString()]: (state) => {
            state.list.loading = true
            state.list.errorMessage = ''
        },
        [deleteRepo.fulfilled.toString()]: (
            state,
            { payload }: PayloadAction<string>
        ) => {
            state.list.loading = false
            const listRepo = current(state.list.data)
            const index = getIndexRepoById(listRepo, payload || '')
            if (index > -1) {
                const newList = [...listRepo]
                newList.splice(index, 1)
                state.list.data = newList
            }
        },
        [deleteRepo.rejected.toString()]: (state) => {
            state.list.loading = false
            state.list.errorMessage = ERROR_DELETE_REPO_MESSAGE
        },
    },
})
