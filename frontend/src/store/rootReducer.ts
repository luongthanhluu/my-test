import { combineReducers } from '@reduxjs/toolkit'

import { repoSlice } from './repo'
import { boardSlice } from './board'

export const rootReducer = combineReducers({
    repo: repoSlice.reducer,
    board: boardSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
