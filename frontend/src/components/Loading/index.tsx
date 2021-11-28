import { CircularProgress } from '@mui/material'
import { FC } from 'react'

import { StyledBox } from './styles'

interface LoadingProps {
    loading: boolean
}
export const Loading: FC<LoadingProps> = ({ loading }) => {
    if (!loading) {
        return null
    }
    return (
        <StyledBox>
            <CircularProgress />
        </StyledBox>
    )
}
