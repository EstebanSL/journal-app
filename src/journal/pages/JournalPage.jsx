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

  return (
    <JournalLayout>
      {
        !activeNote 
        ? <NothingSelectedView />
        : <NoteView />
      }
      
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
