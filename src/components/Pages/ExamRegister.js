import { Box, Button, Card, Container, Typography } from '@mui/material';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { base_url } from '../../Api';

const ExamRegister = () => {

    let authorized = localStorage.getItem('token') === null ? false : true;

    const location = useLocation()

    const { id, exam_name, exam_date } = location.state

    const date = exam_date.split('T')[0]
    const time = exam_date.split('T')[1].replace('Z', '')

    const handleExamRegister = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token')
        let response = await fetch(base_url + "api/student_register/", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }),
            body: JSON.stringify({'exam_id': id, 'exam_name': exam_name})
        })
        if (response.status === 200){
            console.log("Registered")
        }else{
            console.log("Not Registered")
        }
    }

  return (
    <>
        {authorized ? 
        <Box sx={{px: 5}}>
            <Box sx={{borderBottom: 1}}>
                <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold', my: 2}}>{exam_name}</Typography>
            </Box>
            <Box>
                <Card sx={{px: 5, py: 2}}>
                    <Typography sx={{mb: 3, fontWeight: 'bold'}}>Exam Date: {date}</Typography>
                    <Typography sx={{mb: 3, fontWeight: 'bold'}}>Exam Time: {time}</Typography>
                </Card>
            </Box>
            <Box sx={{my: 2}}>
                <Button fullWidth type='submit' variant='contained' color="primary" onClick={handleExamRegister}>Register Me</Button>
            </Box>
            
        </Box>:
        <Navigate to="/loginregister" />}
    </>
  )
}

export default ExamRegister