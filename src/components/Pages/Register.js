import { Alert, Box, Button, TextField, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import {GoogleLogin} from 'react-google-login'
import { base_url } from '../../Api';


const Register = () => {


    const clientId = '425651521555-e6v88sc11p7lre7d6d1s58080ch7ijal.apps.googleusercontent.com';
    const actualData = {};
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState({});


    const onSucess = (res) => {
        const data = res.profileObj;
        const a = data.email;
        const split = a.split('@');
        split.pop();
        const username = split[0];
        actualData['email'] = data.email;
        actualData['first_name']= data.givenName;
        actualData['last_name']= data.familyName;
        actualData['username'] =  username;
        handleOpen();
        setData(actualData);
      }

    
    const onFailure = (res) => {
        console.log("[Login Failed] res:", res)
    }


    const handleModalSubmit = async (e) => {
        e.preventDefault();
        const password_data = new FormData(e.currentTarget);

        data['password'] = password_data.get('password');
        data['confirm_password'] = password_data.get('confirm_password')

        if (data.password === data.confirm_password) {



            let response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let Registered = await response.json()
            console.log(Registered)
            if (response.status === 200) {
                setError({status: true, msg: "Registered Successfully. Your Username: "+ Registered.user.username, type: 'success'})
                handleClose();
            }else{
                setError({status: true, msg: (Registered.email || Registered.password.at(0)) , type: 'error'})
            }
            




            
        }else {
            setError({status: true, msg: "Password Fields does not match", type: 'error'})
        }

    }






    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



    



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
            email: data.get('email'),
            password: data.get('password'),
            confirm_password: data.get('confirm_password')
        }
        if (actualData.username && actualData.email && actualData.password && actualData.confirm_password) {
            if (actualData.password === actualData.confirm_password) {


            let response = await fetch(base_url+'api/register/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(actualData)
            })
            let Registered = await response.json()
            if (response.status === 200) {
                console.log(actualData)
                document.getElementById('register_form').reset();
                setError({status: true, msg: 'Registered Successfully', type: 'success'})
                setTimeout(() => {
                    window.location.replace('http://localhost:3000/loginregister');
                }, 1000)
            }else{
                setError({status: true, msg: (Registered.username || Registered.email || Registered.password.at(0)) , type: 'error'})
            }






                
            }else{
                setError({status: true, msg: "Password Fields does not match", type: 'error'})
            }
        }else{
            setError({status: true, msg: "All Fields are required", type: 'error'})
        }
    }



  return (
    <>
        <Box component='form' id='register_form' noValidate onSubmit={handleSubmit}>
            {error.status ? <Alert severity={error.type} sx={{mt: 1}}>{error.msg}</Alert>: ''}
            <TextField margin='normal' required fullWidth id='username' name='username' label='Username' />
            <TextField margin='normal' required fullWidth id='email' name='email' label='Email' />
            <TextField margin='normal' required fullWidth id='password' name='password' type='password' label='Create Password' />
            <TextField margin='normal' required fullWidth id='confirm_password' name='confirm_password' type='password' label='Confirm Password' />
            <Box textAlign='center'>
                <Button type='submit' variant='contained' color="secondary" sx={{mt: 2}}>Register</Button>
            </Box>
            <Box textAlign='center'  sx={{my: 3}}>
                    <GoogleLogin
                            clientId={clientId}
                            buttonText="Register with Google"
                            onSuccess={onSucess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
            </Box>
        </Box>



        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component='form' onSubmit={handleModalSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Congratulations! You are all set. Just Create a Password for your account.
                    </Typography>
                    <TextField margin='normal' required fullWidth id='password' name='password' type='password' label='Create Password' />
                    <TextField margin='normal' required fullWidth id='confirm_password' name='confirm_password' type='password' label='Confirm Password' />
                    <Button type='submit' variant='contained' color="secondary" sx={{mt: 2}}>Register</Button>
                    {error.status ? <Alert severity={error.type} sx={{mt: 1}}>{error.msg}</Alert>: ''}
                </Box>
        </Modal>
            







    </>
  )
}

export default Register