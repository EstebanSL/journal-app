import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedMessage: '',
    notes: [],
    activeNote: null,
    // {
    //   id: '',
    //   title: '',
    //   body: '',
    //   date: '',
    //   imagesURL: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    stopSaving: (state) => {
      state.isSaving = false;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
      state.savedMessage = `Note created successfully`
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload
      state.isSaving = false;
      state.savedMessage = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.savedMessage = ''
    },
    updateNoteById: (state, action) => {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
      state.savedMessage = `Note updated successfully`
      state.isSaving = false
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imagesURL = [ ...state.activeNote.imagesURL, ...action.payload ]
      state.isSaving = false
    },
    clearAllOnLogout: (state) => {
      state.activeNote = null,
      state.notes = [],
      state.savedMessage = ''
      state.isSaving = false
    },
    deleteNoteById: (state, action) => {
      state.activeNote = null
      state.isSaving = false
      state.notes = state.notes.filter(note => note.id !== action.payload)
    }
  }
});


export const { 
  addNewEmptyNote, 
  clearAllOnLogout,
  deleteNoteById,
  savingNewNote,  
  setActiveNote, 
  setNotes, 
  setPhotosToActiveNote,
  updateNoteById, 
  stopSaving
} = journalSlice.actions;