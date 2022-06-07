import { Grid, Box, Card, Tabs, Tab } from '@mui/material';
import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'
import ChangePassword from '../Pages/ChangePassword'
import MyPerformance from './MyPerformance';
import UpcomingQuiz from './UpcomingQuiz';
import UploadQuestions from './UploadQuestions';
import UserProfile from './UserProfile';
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


const Dashboard = () => {


  const [value, setValue] = useState(0);
  const handleChange = (event ,newValue) => {
    setValue(newValue);
  }

  let is_staff = eval(localStorage.getItem('is_staff'))

  let authorized = localStorage.getItem('token') == null ? false : true;


  return (
    <>
      {authorized ?
      
      <Box sx={{mx: 2}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        {is_staff ? 
        <Tabs value={value} onChange={handleChange} textColor='secondary' indicatorColor='secondary'>
          <Tab label="Profile" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
          <Tab label="Upload Questions" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
          <Tab label="Change Password" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
        </Tabs>:
        <Tabs value={value} onChange={handleChange} textColor='secondary' indicatorColor='secondary'>
          <Tab label="Profile" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
          <Tab label="Performance" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
          <Tab label="Quizzes" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
          <Tab label="Change Password" sx={{textTransform: 'none', fontWeight: 'bold' }}></Tab>
        </Tabs>
        }
      </Box>
        {is_staff ?
        <>
          <TabPanel value={value} index={0}><UserProfile /></TabPanel>
          <TabPanel value={value} index={1}><UploadQuestions /></TabPanel>
          <TabPanel value={value} index={2}><ChangePassword /></TabPanel>
        </>:
        <>
          <TabPanel value={value} index={0}><UserProfile /></TabPanel>
          <TabPanel value={value} index={1}><MyPerformance /></TabPanel>
          <TabPanel value={value} index={2}><UpcomingQuiz /></TabPanel>
          <TabPanel value={value} index={3}><ChangePassword /></TabPanel>
        </>}
      </Box>

      : <Navigate to="/loginregister" />}
    </>
  )
}

export default Dashboard