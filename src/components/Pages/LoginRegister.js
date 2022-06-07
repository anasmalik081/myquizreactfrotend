import { Box, Card, Grid, Tab, Tabs} from '@mui/material'
import Pic1 from '../../Images/Pic1.png'
import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';


const TabPanel = (props) => {
  const {children, value, index} = props;
  return(
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}




const LoginRegister = () => {
  
  

  const [value, setValue] = useState(0);
  const handleChange = (event ,newValue) => {
    setValue(newValue);
  }


  return (
    <>
      <Grid container sx={{height: '90vh'}}>
        <Grid item lg={6} sm={6} sx={{
          backgroundImage: `url(${Pic1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', sm: 'block' }
          }}>
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <Box sx={{mx: 2}}>
              <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} textColor='secondary' indicatorColor='secondary'>
                  <Tab label="Login" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
                  <Tab label="Registration" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}><Login /></TabPanel>
              <TabPanel value={value} index={1}><Register /></TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default LoginRegister