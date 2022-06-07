import React, { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Container, Typography, Grid, CardActions, Tabs, Tab } from '@mui/material'
import ContactUs from '../ContactUs';
import FAQ from '../FAQ';
import OfficeAddress from '../OfficeAddress';
import { base_url } from '../../Api';


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


const Contact = () => {

  const [value, setValue] = useState(0);
  const handleChange = (event ,newValue) => {
    setValue(newValue);
  }


  return (
    <>
        <Box>
          <Tabs value={value} onChange={handleChange} textColor='secondary' indicatorColor='secondary' centered>
              <Tab label="Office Address" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
              <Tab label="FAQ" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
              <Tab label="Contact Us" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
          </Tabs>
        </Box>
        <Box sx={{mt: 3, mx: 5}}>
          <TabPanel value={value} index={0}><OfficeAddress /></TabPanel>
          <TabPanel value={value} index={1}><FAQ /></TabPanel>
          <TabPanel value={value} index={2}><ContactUs /></TabPanel>
        </Box>
    </>
  )
}

export default Contact