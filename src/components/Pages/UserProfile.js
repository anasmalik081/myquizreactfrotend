import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { base_url } from '../../Api';

const UserProfile = () => {

    const [user, setUser] = useState([]);
    const [create, setCreate] = useState([]);

    useEffect(() => {
        async function getAllData(){
            try{
                const token = localStorage.getItem('token')
                const response = await fetch(base_url + 'api/profile/', {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer '+token,
                        'Content-Type': 'application/json'
                    })
                })
                const json = await response.json();
                setUser(json)
                const a = json.created_at;
                const b = a.split('T');
                b.pop()
                const account_created_at = b[0];
                setCreate(account_created_at)
                
            }catch (error){
                console.log(error)
            }
        }
        getAllData()
    }, [])


  return (
    <>

        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="text.primary" sx={{border: 1, p: 1 ,borderColor: 'purple', mb: 5}} gutterBottom>
                My Details
            </Typography>
            <Box sx={{mx: 5}}>
                <Typography variant="h5"  color="text.secondary" paragraph>
                    Username: {user.username}
                </Typography>
                <Typography variant="h5"  color="text.secondary" paragraph>
                    Email: {user.email}
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Account Created: {create}
                </Typography>
            </Box>
            {/* <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button color="secondary" variant="contained">My Performace</Button>
              <Button color="secondary" variant="outlined">Change Password</Button>
            </Stack> */}
          </Container>
        </Box>
    </>
  )
}

export default UserProfile