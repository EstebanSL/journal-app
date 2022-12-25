import { AddOutlined, MailOutline } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'
import { JournalLayout } from '../layouts/JournalLayout'
import { NoteView } from '../views'
import NothingSelectedView from '../views/NothingSelectedView'

export const JournalPage = () => {

  const dispatch = useDispatch()

  const { isSaving, activeNote } = useSelector(state => state.journal)

  const addNewNote = () => {
    dispatch(startNewNote())
  }

  console.log(activeNote)

  return (
    <JournalLayout>
      {/* <Typography variant='h6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography> */}
      {/* Nothing selected */}
      {
        !activeNote 
        ? <NothingSelectedView />
        : <NoteView />
      }
      {/* Selected Element */}

      <IconButton
        onClick={addNewNote}
        disabled={ isSaving }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: .9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
