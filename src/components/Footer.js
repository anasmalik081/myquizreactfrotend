import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <Box sx={{backgroundColor: '#9c27b0' }}>
        <Box sx={{display: 'flex', justifyContent: 'center', pt: 2 }}>
            <Button sx={{color: 'white', textTransform: 'none', mx:5 }} component={NavLink} to='/'>Home</Button>
            <Button sx={{color: 'white', textTransform: 'none', mx:5 }} component={NavLink} to='contact'>Contact Us</Button>
            <Button sx={{color: 'white', textTransform: 'none', mx:5 }} component={NavLink} to='contact'>Query</Button>
        </Box>
        <Typography sx={{textAlign: 'center', color: 'White', mt: 2}}>©2022 My Quiz Portal | All Right Reserved</Typography>
        </Box>
    </>
  )
}

export default Footer