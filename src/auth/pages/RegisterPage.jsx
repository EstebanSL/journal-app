import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <form>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type='email'
              placeholder='Enter your email address'
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              placeholder='Enter your password'
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='confirm password'
              type='password'
              placeholder='confirm your password'
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginY: 2, display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth>Login</Button>
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
