import { AppBar, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'

interface HeaderProps {
    title: string
}
export const Header: FC<HeaderProps> = ({ title }) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
