import { RootState } from '../rootReducer'

export const getListRepoData = (state: RootState) => state.repo?.list
