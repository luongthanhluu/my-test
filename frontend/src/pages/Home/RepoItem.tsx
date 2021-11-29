import { FC, useMemo, useState } from 'react'
import {
    ListItemButton,
    ListItemText,
    IconButton,
    TextField,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Repo } from 'models/repo'
import { CONFIRM_DELETE_REPO_MESSAGE } from 'constants/message'
import { addRepo, deleteRepo, updateRepo } from 'store/repo/middleware'
import { StyledListItem } from 'styles'

interface ListItemProps {
    item?: Repo
    onCancel?: () => void
}
export const RepoItem: FC<ListItemProps> = ({
    item = {
        name: '',
    },
    onCancel,
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(item?.id ? false : true)
    const [name, setName] = useState(item.name)

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const isEmptyRepo = useMemo(() => {
        let isEmpty = true
        if (!item.lists || !item.lists?.length) {
            return isEmpty
        }
        const notEmpty = item.lists.find((item) => item.cards?.length > 0)
        if (notEmpty) {
            isEmpty = false
        }
        return isEmpty
    }, [item.lists])

    const onCancelEdit = () => {
        if (!item.id) {
            if (typeof onCancel === 'function') {
                onCancel()
            }
            return
        }
        setName(item.name)
        toggleEdit()
    }

    const onClickItem = () => {
        if (!isEdit) {
            navigate(`/repo/${item.id}`)
        }
    }

    const onSaveEdit = () => {
        if (item.id) {
            dispatch(
                updateRepo({
                    id: item.id,
                    name,
                })
            )
            toggleEdit()
            return
        }
        // on add new item
        dispatch(
            addRepo({
                name,
            })
        )
        onCancelEdit()
    }

    const onDeleteEdit = () => {
        // eslint-disable-next-line no-restricted-globals
        const shouldDelete = confirm(CONFIRM_DELETE_REPO_MESSAGE)
        if (shouldDelete && item.id) {
            dispatch(deleteRepo(item.id))
        }
    }

    function renderAction() {
        if (isEdit) {
            return (
                <>
                    <IconButton onClick={onSaveEdit}>
                        <CheckCircleIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={onCancelEdit}>
                        <CloseIcon />
                    </IconButton>
                </>
            )
        }
        return (
            <>
                <IconButton onClick={toggleEdit}>
                    <EditIcon color="primary" />
                </IconButton>
                {isEmptyRepo && (
                    <IconButton onClick={onDeleteEdit}>
                        <DeleteIcon color="error" />
                    </IconButton>
                )}
            </>
        )
    }

    return (
        <StyledListItem secondaryAction={renderAction()} disablePadding>
            <ListItemButton onClick={onClickItem}>
                {isEdit ? (
                    <TextField
                        id="outlined-basic"
                        label="name"
                        variant="outlined"
                        value={name}
                        onChange={onChangeName}
                    />
                ) : (
                    <ListItemText primary={item.name} />
                )}
            </ListItemButton>
        </StyledListItem>
    )
}
