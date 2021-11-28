import { FC } from 'react'

import { Header } from 'components/Header'
import { StyledContainer } from './styles'

interface PageLayouProps {
    children: React.ReactChild[] | React.ReactChild
    title: string
}

export const PageLayout: FC<PageLayouProps> = ({ children, title }) => {
    return (
        <div>
            <Header title={title} />
            <StyledContainer>{children}</StyledContainer>
        </div>
    )
}
