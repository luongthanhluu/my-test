import { createAsyncThunk } from '@reduxjs/toolkit'
import { Repo } from 'models/repo'
import {
    getListRepoApi,
    editRepoApi,
    addRepoApi,
    deleteRepoApi,
} from './../../services/repoApi'

export const repoList = createAsyncThunk('repo/repoList', async () => {
    const response = await getListRepoApi()
    return response
})

export const updateRepo = createAsyncThunk(
    'repo/updateRepo',
    async (repo: Repo) => {
        const response = await editRepoApi(repo)
        return response
    }
)

export const addRepo = createAsyncThunk('repo/addRepo', async (repo: Repo) => {
    const response = await addRepoApi(repo)
    return response
})

export const deleteRepo = createAsyncThunk(
    'repo/deleteRepo',
    async (id: string) => {
        const response = await deleteRepoApi(id)
        return response
    }
)
