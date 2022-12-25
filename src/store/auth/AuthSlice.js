import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', //checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {

    login: (state, { payload }) => {
      state.status = 'authenticated'
      state.uid = payload.uid || null
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL || null
      state.errorMessage = null
    },

    logout: (state, { payload }) => {
      state.status = 'non-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },
    resetErrorMessage: (state) => {
      state.errorMessage = ''
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
});

export const { logout, login, checkingCredentials, resetErrorMessage } = AuthSlice.actions;