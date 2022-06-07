import { Grid,TextField, Button, Box, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordReset = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    if (actualData.email) {


      const response = await fetch('http://127.0.0.1:8000/api/password_reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(actualData)
      })
      const json = await response.json()
      console.log(json)
      if (response.status === 200){
        document.getElementById('password_reset_email_form').reset()
        setError({status: true, msg: json.success, type: 'success'});
      }else{
        setError({status: true, msg: json.error, type: 'error'})
      }

    } else {
      setError({status: true, msg: 'Email Field is Required!', type: 'error'});
    }
  }


  return (
    <>
      <Grid container justifyContent='center'>
          <Grid item sm={6} xs={12}>
            <h1>Reset Password</h1>
            <hr />
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            <Box component='form' noValidate sx={{mt: 2}} id='password_reset_email_form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
                <Box textAlign='center'>
                <Button sx={{mt:3, mb:2, px:5}} type='submit' variant='contained'>Send</Button>
                </Box>
            </Box>
          </Grid>
      </Grid>
    </>
  )
}

export default PasswordReset;