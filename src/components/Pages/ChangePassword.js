import { Grid, TextField, Button, Box, Alert, Container, styled, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { base_url } from '../../Api';


const ChangePassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      old_password: data.get('password'),
      new_password: data.get('new_password'),
      confirm_password: data.get('password_confirmation')
    }


    if (actualData.old_password && actualData.new_password && actualData.confirm_password) {
      if (actualData.new_password === actualData.confirm_password) {


        const token = localStorage.getItem('token')
        let response = await fetch(base_url+'/api/change-password/', {
          method: 'PUT',
          headers: new Headers({
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(actualData)
        })
        const json = await response.json()
        if (response.status === 200){
          document.getElementById('registration_form').reset()
          setError({status: true, msg: json.message, type: 'success'});
          setTimeout(() => {
            window.location.replace('http://localhost:3000/dashboard');
        }, 1000)
        }else{
          setError({status: true, msg: json.old_password, type: 'error'});
        }
        
      }else {
        setError({status: true, msg: "New Password Fields didn't Matched", type: 'error'});
      }
    } else {
      setError({status: true, msg: 'All Fields Are Reuired', type: 'error'});
    }
  }





  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <>
      <Container >
        <Box component='form' noValidate sx={{mt: 2, px: 5}} id='registration_form' onSubmit={handleSubmit}>
        <h1>Change Password</h1>
              {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
              <TextField margin='normal' required fullWidth id='password' type='password' name='password' label='Old Password' />
              <TextField margin='normal' required fullWidth id='new password' type='password' name='new_password' label='New Password' />
              <TextField margin='normal' required fullWidth id='password_confirmation' type='password' name='password_confirmation' label='Confirm New Password' />
          <Box textAlign='center'>
            <Button sx={{mt:3, mb:2, px:5}} type='submit' variant='contained'>Change</Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ChangePassword;