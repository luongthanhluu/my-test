import { FC, useState } from 'react'
import { IconButton, Grid, Card, CardContent, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/AddCircle'

import { RepoItem } from 'models/repo'
import { AddWrapper } from 'pages/Home/styles'

import { VulnerabilityCard } from './VulnerabilityCard'

interface BoardItemProps {
    item: RepoItem
}

export const BoardItem: FC<BoardItemProps> = ({ item }) => {
    const [isAdding, setIsAdding] = useState(false)
    const onClickAddNew = () => {
        setIsAdding(true)
    }
    const onCancelAdd = () => {
        setIsAdding(false)
    }
    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        {item?.title}
                    </Typography>
                    {item?.cards?.map((card) => (
                        <VulnerabilityCard
                            item={card}
                            status={item?.title}
                            key={card?.id}
                        />
                    ))}
                    {isAdding && (
                        <VulnerabilityCard
                            key="adding-item"
                            onCancel={onCancelAdd}
                            listId={item.id}
                        />
                    )}
                    <AddWrapper>
                        <IconButton onClick={onClickAddNew}>
                            <AddIcon color="secondary" fontSize="large" />
                        </IconButton>
                    </AddWrapper>
                </CardContent>
            </Card>
        </Grid>
    )
}
