import { Box, Typography } from '@mui/material'
import React from 'react'

const OfficeAddress = () => {
  return (
    <>
        <Box>
            <Typography sx={{borderBottom: 1, textAlign: 'center', pb: 1}}>Office Address</Typography>
        </Box>
        <Box sx={{my: 2, px: 3}}>
            <Box>
                <h3>Office Address:</h3>
                <Typography sx={{fontWeight: 'bold'}}>House No.: 408, Islam Nagar, Near Chand Traders, Saharanpur, Uttar Pradesh, India</Typography>
            </Box>
            <Box>
                <h3>Email Support:</h3>
                <Typography sx={{fontWeight: 'bold'}}>afzal44@gmail.com</Typography>
                <Typography sx={{fontWeight: 'bold'}}>anasmalik081@gmail.com</Typography>
            </Box>
            <Box>
                <h3>Web Technician:</h3>
                <Typography sx={{fontWeight: 'bold'}}>Name: Mr. Ankit Kumar (MCA)</Typography>
                <Typography sx={{fontWeight: 'bold'}}>email: tripleonegk@gmail.com</Typography>
            </Box>
        </Box>
    </>
  )
}

export default OfficeAddress