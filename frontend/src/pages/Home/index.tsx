import { connect, useDispatch } from 'react-redux'
import { FC, useEffect, useState } from 'react'
import { Alert, List, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircle'

import { PageLayout } from 'layouts/PageLayout'
import { Repo } from 'models/repo'
import { Loading } from 'components/Loading'
import { RootState } from 'store'
import { getListRepoData } from 'store/repo/selector'
import { repoList } from 'store/repo/middleware'

import { RepoItem } from './RepoItem'
import { AddWrapper } from './styles'

interface HomeComponentProps {
    loading: boolean
    data: Repo[]
    errorMessage: string
}

export const HomeComponent: FC<HomeComponentProps> = ({
    loading,
    data,
    errorMessage,
}) => {
    const dispatch = useDispatch()
    const [isAdding, setIsAdding] = useState(false)
    useEffect(() => {
        dispatch(repoList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClickAddNew = () => {
        setIsAdding(true)
    }

    const onCancelAdd = () => {
        setIsAdding(false)
    }

    return (
        <PageLayout title="Home">
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Loading loading={loading} />
            {data && (
                <List component="nav">
                    {data.map((item, index) => (
                        <RepoItem item={item} key={item.id || index} />
                    ))}

                    {isAdding && (
                        <RepoItem key="adding-item" onCancel={onCancelAdd} />
                    )}
                </List>
            )}
            <AddWrapper>
                <IconButton onClick={onClickAddNew}>
                    <AddIcon color="secondary" fontSize="large" />
                </IconButton>
            </AddWrapper>
        </PageLayout>
    )
}

const mapStateToProps = (state: RootState) => {
    const data = getListRepoData(state)
    return data
}

export const Home = connect(mapStateToProps)(HomeComponent)
