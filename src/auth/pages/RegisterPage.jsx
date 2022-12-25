import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/UseForm'
import { resetErrorMessage, startCreatingUserWithEmailAndPassword } from '../../store/auth'
import { AuthLayout } from '../layouts/AuthLayout'

const InitialFormData = {
  username: '',
  email: '',
  password: ''
}

const formValidations = {
  username: [(value) => value.length >= 1, 'Username is required'],
  email: [(value) => value.includes('@'), 'Email must be valid'],
  password: [(value) => value.length >= 6, 'Password must be at least 6 characters']
}

export const RegisterPage = () => {

  /** 
 * Variable that defines if the form has been submited 
 */
  const [formSubmited, setFormSubmited] = useState(false)

  /** 
 * Variables that stores the status and errorMessage from the app state
 */
  const { status, errorMessage } = useSelector(state => state.auth)

  /** 
  * Variables and function from useForm custom hook to handle login form 
  */
  const { email, password, username, onInputChange, formState, isFormValid, usernameValid, emailValid, passwordValid } = useForm(InitialFormData, formValidations)

  /**
 * Redux variable to dispatch actions
 */
  const dispatch = useDispatch()

   /**
 * Variable that defines if the user is been authenticated
 */
   const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  /**
   * [onSubmit]
   * @description Function that submit the form information if its valid to log via email-password
   * @param {event} form event 
   */
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    isFormValid && dispatch(startCreatingUserWithEmailAndPassword(formState))
  }

  const onResetErrorMessage = () => {
    dispatch(resetErrorMessage())
  }


  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>

        <Typography variant='h4' textAlign='center' sx={{ mb: 4 }}>Register</Typography>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              label='Username'
              type='text'
              placeholder='Enter your Username'
              fullWidth
              name='username'
              value={username}
              onChange={onInputChange}
              error={!!usernameValid && formSubmited}
              helperText={usernameValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Email'
              type='email'
              placeholder='Enter your email address'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              placeholder='Enter your password'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginY: 2, display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth type='submit' disabled={isCheckingAuthentication}>Create account</Button>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
          <Link component={RouterLink} color='inherit' to='/auth/login' onClick={onResetErrorMessage}>Login</Link>
        </Grid>

      </form>
    </AuthLayout>
  )
}
