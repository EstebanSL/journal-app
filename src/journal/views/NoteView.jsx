import { Delete, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useForm } from '../../hooks'
import { setActiveNote, startDeleteNoteById, startSaveNewNote, startUploadingImages } from '../../store/journal'
import { ImageGallery } from '../components'

export const NoteView = () => {

  const { activeNote, savedMessage, isSaving } = useSelector(state => state.journal)
  const dispatch = useDispatch();

  const { title, body, date, onInputChange, formState } = useForm(activeNote)

  const fileInputRef = useRef()

  const DateString = useMemo(() => {
    return new Date(date).toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire({
        text: savedMessage,
        icon: 'success'
      })
    }
  }, [savedMessage])

  const onSaveNote = () => {
    dispatch(startSaveNewNote())
  }

  const onDeleteNote = () => {
    dispatch(startDeleteNoteById())
  }

  const onInputFileChange = ({target}) => {
    if (target.files === 0) return
    dispatch( startUploadingImages(target.files))
  }

  return (
    <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={20} fontWeight='light'> {DateString}</Typography>
      </Grid>
      <Grid item>
        <Button color='primary' sx={{ paddingX: 2 }} onClick={onSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid item>
        <IconButton onClick={onDeleteNote}>
          <Delete color='primary'/>
        </IconButton>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Enter a title'
          label='Title'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='What happened today?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery images={activeNote.imagesURL}/>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png, image/gif, image/jpeg"
        onChange={onInputFileChange} />
      <IconButton disabled={isSaving} onClick={() => fileInputRef.current.click()}>
        <UploadFileOutlined color='primary' />
      </IconButton>

    </Grid>
  )
}
