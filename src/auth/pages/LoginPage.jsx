//React imports
import React, { useMemo, useState } from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'

//Router imports
import { Link as RouterLink } from 'react-router-dom'

//Custom components imports
import { AuthLayout } from '../layouts/AuthLayout'
import { resetErrorMessage, startEmailAndPasswordSignIn, startGoogleSignIn } from '../../store/auth'
import { useForm } from '../../hooks/UseForm'

//Material UI imports
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'


/**
 * Object that store the initial state of the login form
 */
const InitialFormData = {
  email: '',
  password: ''
}

/**
 * Object that stores the validators and error mesages for each login form input
 */
const formValidations = {
  email: [(value) => value.includes('@'), 'Email must be valid'],
  password: [(value) => value.length >= 6, 'Password must be at least 6 characters']
}

export const LoginPage = () => {

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
  const { email, password, onInputChange, formState, isFormValid, passwordValid, emailValid } 
  = useForm(InitialFormData, formValidations)
  
  /**
   * Redux variable to dispatch actions
   */
  const dispatch = useDispatch()

  /**
   * Variable that defines if the user is been authenticated
   */
  const isAthenticating = useMemo( () => status === 'checking', [status])

  /**
   * [onSubmit]
   * @description Function that submit the form information if its valid to log via email-password
   * @param {event} form event 
   */
  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmited(true);
    isFormValid && dispatch(startEmailAndPasswordSignIn(formState))
  }

  /**
   * [onGoogleSignIn]
   * @description Function that log the user throught Google
   */
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  const onResetErrorMessage = () => {
    dispatch(resetErrorMessage())
  }

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        
      <Typography variant='h4' textAlign='center' sx={{mb: 4}}>Login</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type='email'
              placeholder='Enter your email address'
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmited }
              helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              placeholder='Enter your password'
              fullWidth
              name='password'
              value= { password } 
              onChange= { onInputChange }
              error={ !!passwordValid && formSubmited }
              helperText={ passwordValid }
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginY: 2, display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} display={ !!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth type='submit' disabled={ isAthenticating }>Login</Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' fullWidth sx={{ backgroundColor: 'secondary.main' }} onClick={onGoogleSignIn} disabled={ isAthenticating }>
              <Google />
              <Typography sx={{ ml: 2 }}>Login with Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Link component={RouterLink} color='inherit' to='/auth/register' onClick={onResetErrorMessage}>Create account</Link>
        </Grid>

      </form>
      
    </AuthLayout>

  )
}
