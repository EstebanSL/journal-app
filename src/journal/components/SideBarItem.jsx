import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({title, id, body, date, imagesURL = []}) => {

  const dispatch = useDispatch()

  const newTitle = useMemo(() => {
    return title.length < 17 
      ? title
      : title.substring(0,17) + '...'
  }, [title])

  const activeNote = () => {
    dispatch(setActiveNote({ title, id, body, date, imagesURL}))
  }

  return (
    <ListItem disablePadding onClick={activeNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction='column'>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
