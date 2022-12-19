import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/UseForm'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'
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

  const dispatch = useDispatch()

  const [formSubmited, setFormSubmited] = useState(false)

  const { email, password, username, onInputChange, formState, isFormValid, usernameValid, emailValid, passwordValid } = useForm(InitialFormData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    console.log(formState)
    isFormValid && dispatch(startCreatingUserWithEmailAndPassword(formState))

  }

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>

        <Typography variant='h4' textAlign='center' sx={{mb: 4}}>Register</Typography>
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
              error={ !!usernameValid && formSubmited }
              helperText={ usernameValid }
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
              value={password}
              onChange={onInputChange}
              error={ !!passwordValid && formSubmited }
              helperText={ passwordValid }
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginY: 2, display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth type='submit'>Login</Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' fullWidth sx={{ backgroundColor: 'secondary.main' }}>
              <Google />
              <Typography sx={{ ml: 2 }}>Register with Google</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
          <Link component={RouterLink} color='inherit' to='/auth/register'>Login</Link>
        </Grid>

      </form>
    </AuthLayout>
  )
}
