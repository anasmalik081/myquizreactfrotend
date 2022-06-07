import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {base_url} from '../Api'


const Navbar = () => {


    const [isAuth, setIsAuth] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);


    const handleLogout = () => {
        localStorage.clear();
        setIsAuth(false)
    }


    const updateToken =  async () => {
        let refresh = localStorage.getItem('refresh')
        let response = await fetch(base_url+'api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': refresh})
        })
        let json = await response.json()
        if (response.status === 200) {
            localStorage.setItem('token', json.access);
            localStorage.setItem('refresh', json.refresh);
        }else{
            handleLogout();
        }
    }


    useEffect(() => {

        let fourMinutes = 1000 * 60 * 19
        let interval = setInterval(() => {
            if(isAuth) {
                updateToken();
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [isAuth])






  return (
    <>
        <Box sx={{flexGrow:1}}>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Typography variant='div' component='div' sx={{flexGrow: 1}}>
                        MyQuiz
                    </Typography>
                    <Button sx={{color: 'white', textTransform: 'none'}} style={({isActive}) => {return {backgroundColor: isActive ? '#6d1b7b' : ''}}}  component={NavLink} to="/">Home</Button>
                    {
                    isAuth === false ?
                        <>
                            <Button sx={{color: 'white', textTransform: 'none'}} style={({isActive}) => {return {backgroundColor: isActive ? '#6d1b7b' : ''}}}  component={NavLink} to="contact">Contact</Button>
                            <Button sx={{color: 'white', textTransform: 'none'}} style={({isActive}) => {return {backgroundColor: isActive ? '#6d1b7b' : ''}}}  component={NavLink} to="loginregister">Login</Button>
                        </>:
                        <>
                            <Button sx={{color: 'white', textTransform: 'none'}} style={({isActive}) => {return {backgroundColor: isActive ? '#6d1b7b' : ''}}}  component={NavLink} to="dashboard">Dashboard</Button>
                            <Button sx={{color: 'white', textTransform: 'none'}} style={({isActive}) => {return {backgroundColor: isActive ? '#6d1b7b' : ''}}}  component={NavLink} to="loginregister" onClick={handleLogout}>Logout</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Navbar