import { Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className='box-shadow'
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
        <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>{ title }</Typography>

        { children }

      </Grid>
    </Grid>
  )
}
