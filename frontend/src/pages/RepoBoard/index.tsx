import { connect, useDispatch } from 'react-redux'
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Grid } from '@mui/material'

import { PageLayout } from 'layouts/PageLayout'
import { RepoItem } from 'models/repo'
import { Loading } from 'components/Loading'
import { RootState } from 'store'
import { getBoardData } from 'store/board/selector'
import { getRepoList } from 'store/board/middleware'

import { BoardItem } from './BoardItem'

interface RepoBoardComponentProps {
    loading: boolean
    data: RepoItem[]
    errorMessage: string
}

export const RepoBoardComponent: FC<RepoBoardComponentProps> = ({
    loading,
    data,
    errorMessage,
}) => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (!id) {
            return
        }
        dispatch(getRepoList(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PageLayout title="Repo Board">
            <Loading loading={loading} />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Grid container spacing={2}>
                {data?.map((item) => (
                    <BoardItem key={item.id} item={item} />
                ))}
            </Grid>
        </PageLayout>
    )
}

const mapStateToProps = (state: RootState) => {
    const data = getBoardData(state)
    return data
}

export const RepoBoard = connect(mapStateToProps)(RepoBoardComponent)
