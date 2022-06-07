import { Box, Button, Typography, Alert } from '@mui/material'
import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';

const UploadStep3 = ({state1, state2, handlePrev, handleFinish, error}) => {
  return (
    <>
        <Box>
            <Box sx={{textAlign: 'center', mb: 4}}>
                <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold', mt: 2}}>Congratulations You are almost Done</Typography>
                <Typography variant='p'>You can go back to change anything otherwise finish to Submit</Typography>
            </Box>
            <Box>
            {error.status ? <Alert severity={error.type} sx={{my: 2}}>{error.msg}</Alert>: ''}
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>Exam Category: {state1.exam_category ? state1.exam_category : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>Exam Name: {state1.exam_name ? state1.exam_name : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>Exam Level: {state1.exam_level ? state1.exam_level : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>Exam Description: {state1.exam_desc ? state1.exam_desc : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>Exam Date: {state1.exam_date ? state1.exam_date : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>Exam Time: {state1.exam_time ? state1.exam_time : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
                <Typography componenet='h6' sx={{mb: 3, fontWeight: 'bold'}}>FIle Selected: {state2.file['name'] ? state2.file['name'] : <Button color="error" startIcon={<ErrorIcon />}>This Field is Required</Button>}</Typography>
            </Box>
            <Box sx={{my: 4, display: 'flex', justifyContent: 'space-between'}} >
                <Button type='submit' variant='contained' color="primary" onClick={handlePrev}>Back</Button> 
                <Button type='submit' variant='contained' color="success" onClick={handleFinish}>Finish</Button> 
            </Box>
        </Box>
    </>
  )
}

export default UploadStep3