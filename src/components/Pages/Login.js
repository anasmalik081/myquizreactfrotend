import { Alert, Box, Button, TextField } from '@mui/material'
import React, { createContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { base_url } from '../../Api'

const Login = () => {


    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);

    const [error, setError] = useState({
        status: false,
        msg: '',
        type: ''
    })



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            username: data.get('username'),
            password: data.get('password'),
        }
        if (actualData.username && actualData.password) {

            let response = await fetch(base_url+'api/token/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(actualData)
            })
            let token = await response.json()
            if (response.status === 200) {
                setAuthToken(token)
                setUser(jwt_decode(token.access))
                localStorage.clear();
                localStorage.setItem('token', token.access);
                localStorage.setItem('refresh', token.refresh);
                localStorage.setItem('is_staff', token.is_staff);
                document.getElementById('login_form').reset();
                setError({status: true, msg: "Login Successfully", type: 'success'})
                setTimeout(() => {
                    window.location.replace('http://localhost:3000/dashboard');
                }, 1000)
            }else{
                setError({status: true, msg: "Username and Password are Invalid", type: 'error'})
            }

        }else{
            setError({status: true, msg: "All Fields are required", type: 'error'})
        }
    }



  return (
    <>
        <Box component='form' id='login_form' noValidate onSubmit={handleSubmit}>
            {error.status ? <Alert severity={error.type} sx={{my: 1}}>{error.msg}</Alert>: ''}
            <TextField required fullWidth margin='normal' id='username' name='username' label='Username' />
            <TextField required fullWidth margin='normal' id='password' name='password' type='password' label='Password' />
            <Box sx={{my: 2}}>
                <NavLink  to='/passwordreset' >Forgot Password ?</NavLink>
            </Box>
            <Box textAlign='center' >
                <Button type='submit' variant='contained' color="secondary">Submit</Button>   
            </Box>
        </Box>
    </>
  )
}

export default Login