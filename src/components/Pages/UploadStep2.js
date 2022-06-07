import { Button, TextField, Box, Typography, Alert } from '@mui/material'
import React from 'react'

const UploadStep2 = ({ state, handleContinue, handlePrev, handleChange, error}) => {
  return (
    <>
        <Box component='form' id='UploadStep1Form' noValidate onChange={handleChange}>
        <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold', my: 2}}>Please Select File for Question and Answers</Typography>
        {error.status ? <Alert severity={error.type} sx={{my: 2}}>{error.msg}</Alert>: ''}
        <TextField type='file' fullWidth margin='normal' id='file' name='file' label='Select File' InputLabelProps={{shrink: true}} variant='standard' />
        {state.file['name'] ? 
        <label htmlFor='file'>Selected File: {state.file['name']}</label>:
        <label>Selected File: No File Selected</label>}
            <Box sx={{my: 4, display: 'flex', justifyContent: 'space-between'}} >
                <Button type='submit' variant='contained' color="primary" onClick={handlePrev}>Back</Button> 
                <Button type='submit' variant='contained' color="primary" onClick={handleContinue}>Next</Button> 
            </Box>
        </Box>
    </>
  )
}

export default UploadStep2