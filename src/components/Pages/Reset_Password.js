import { Grid, TextField, Button, Box, Alert } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import React, {useState} from 'react'
import { base_url } from '../../Api';


const ResetPassword = () => {


    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      });


    

      const navigate = useNavigate();
      const a = useParams();

    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          password: data.get('password'),
          password_confirmation: data.get('password_confirmation'),
        }
        if (actualData.password && actualData.password_confirmation) {
          if (actualData.password === actualData.password_confirmation) {

            const response = await fetch(base_url+'/api/password-reset-complete/', {
              method: 'PATCH',
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify({'token': a.token, 'uidb64': a.uid ,'password':actualData.password})
            })
            const json = await response.json()
            if (response.status === 200) {
              document.getElementById('password_reset_form').reset()
              setError({status: true, msg: json.message, type: 'success'});
              setTimeout(() => {
                navigate("/loginregister");
            }, 3000)
            }else{
              setError({status: true, msg: json.password, type: 'error'});
            }

          }else {
            setError({status: true, msg: "Two Password Fileds didn't Matched", type: 'error'});
          }
        } else {
          setError({status: true, msg: 'All Fields are Required', type: 'error'});
        }
      }



  return (
    <>
        <Grid container justifyContent='center'>
          <Grid item sm={6} xs={12}>
            <h1>Reset Password</h1>
            <hr />
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
            <Box component='form' noValidate sx={{mt: 2}} id='password_reset_form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='password' type='password' name='password' label='New Password' />
                <TextField margin='normal' required fullWidth id='password_confirmation' type='password' name='password_confirmation' label='Confirm Password' />
                <Box textAlign='center'>
                <Button sx={{mt:3, mb:2, px:5}} type='submit' variant='contained'>Save</Button>
                </Box>
            </Box>
          </Grid>
      </Grid>
    </>
  )
}

export default ResetPassword;