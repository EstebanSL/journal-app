//React imports
import React, { useMemo, useState } from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'

//Router imports
import { Link as RouterLink } from 'react-router-dom'

//Custom components imports
import { AuthLayout } from '../layouts/AuthLayout'
import { chekingAuthentication, startEmailAndPasswordSignIn, startGoogleSignIn } from '../../store/auth'
import { useForm } from '../../hooks/UseForm'

//UI imports
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

const formValidations = {
  email: [(value) => value.includes('@'), 'Email must be valid'],
  password: [(value) => value.length >= 6, 'Password must be at least 6 characters']
}

export const LoginPage = () => {

  const dispatch = useDispatch()

  const [formSubmited, setFormSubmited] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)

  const { email, password, onInputChange, formState, isFormValid, passwordValid, emailValid } = useForm({
    email: '',
    password: ''
  }, formValidations)

  const isAthenticating = useMemo( () => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmited(true);
    isFormValid && dispatch(startEmailAndPasswordSignIn(formState))
  }

  const onGoogleSignIn = (event) => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
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
          <Link component={RouterLink} color='inherit' to='/auth/register'>Create account</Link>
        </Grid>

      </form>
      
    </AuthLayout>

  )
}
