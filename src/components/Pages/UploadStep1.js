import React from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'


const UploadStep1 = ({ state, handleChange, handleContinue}) => {
  return (
    <>
        <Box component='form' id='UploadStep1Form' noValidate onChange={handleChange}>
            <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold', my: 2}}>Exam Details</Typography>
            <TextField required fullWidth margin='normal' id='exam_category' name='exam_category' label='Enter Exam Category' defaultValue={state.exam_category} variant="standard"/>
            <TextField required fullWidth margin='normal' id='exam_name' name='exam_name' label='Enter Exam Name' defaultValue={state.exam_name} variant="standard" />
            <TextField required fullWidth margin='normal' id='exam_level' name='exam_level' label='Enter Exam Level' defaultValue={state.exam_level} variant="standard" />
            <TextField required fullWidth margin='normal' id='exam_desc' name='exam_desc' label='Enter Exam Description' defaultValue={state.exam_desc} variant="standard" />
            <TextField required fullWidth margin='normal' id='exam_date' name='exam_date' type='date' label='Choose Exam Date' variant="standard" defaultValue={state.exam_date} InputLabelProps={{shrink: true}} />
            <TextField required fullWidth margin='normal' id='exam_time' name='exam_time' type='time' label='Choose Exam Time' variant="standard" defaultValue={state.exam_time} InputLabelProps={{shrink: true}} />
            <Box sx={{my: 4, display: 'flex', justifyContent: 'flex-end'}} >
                <Button type='submit' variant='contained' color="primary" onClick={handleContinue}>Next</Button>   
            </Box>
        </Box>
    </>
  )
}

export default UploadStep1