import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {base_url} from '../Api'

const ContactUs = () => {

    const [error, setError] = useState({
        status: false,
        msg: '',
        type: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const actualData = {
            query: data.get('query')
        }
        if(actualData.query){
            let response = await fetch(base_url+'api/query/', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(actualData)
            })
            let json = await response.json()
            if(response.status === 200){
                setError({ status: true, msg: json.msg, type: 'success' })
                document.getElementById('query_form').reset()
            }else{
                setError({ status: true, msg: 'Your Question Not Submitted Successfully', type: 'error' })
            }
        }else{
            setError({ status: true, msg: 'Please Enter Your Question', type: 'error' })
        }
    }

  return (
    <>
        <Box sx={{mx: 4}} component='form' id='query_form' noValidate onSubmit={handleSubmit}>
            <Typography sx={{borderBottom: 1, textAlign: 'center', pb: 1}}>Contact Us</Typography>
            {error.status ? <Alert severity={error.type} sx={{my: 1}}>{error.msg}</Alert>: ''}
            <Box sx={{mt: 2}}>
                <TextField required fullWidth id='query' name='query' label='Please Enter Your Question' />
            </Box>
            <Box sx={{my: 2, display: 'flex', justifyContent: 'center'}}>
                <Button type='submit' variant='contained' color="secondary">Submit</Button>
            </Box>
        </Box>
    </>
  )
}

export default ContactUs