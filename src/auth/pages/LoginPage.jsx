//React imports
import React, { useMemo } from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'

//Router imports
import { Link as RouterLink } from 'react-router-dom'

//Custom components imports
import { AuthLayout } from '../layouts/AuthLayout'
import { chekingAuthentication, startGoogleSignIn } from '../../store/auth'
import { useForm } from '../../hooks/UseForm'

//UI imports
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

export const LoginPage = () => {

  const dispatch = useDispatch()

  const { status } = useSelector(state => state.auth)

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })

  const isAthenticating = useMemo( () => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault()
    console.log({email, password})
    dispatch(chekingAuthentication())
  }

  const onGoogleSignIn = (event) => {
    console.log('google sign in')
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
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginY: 2, display: 'flex', alignItems: 'center' }}>
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
