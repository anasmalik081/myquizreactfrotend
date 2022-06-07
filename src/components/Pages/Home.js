import { Box, Button, Card, CardContent, CardHeader, Container, Typography, Grid, CardActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Carousel from '../Carousel'
import {base_url} from '../../Api'

const Home = () => {

  const [data, setData] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    async function getAllData(){
      try{
        let response = await fetch(base_url+"api/upcomming/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let json = await response.json()
        setData(json.upcoming_quiz)
      }catch(error){
        console.log(error)
      }
    }
    getAllData()
  }, [])

  const handleRegister = (id, exam_name, exam_date) => e => {
    e.preventDefault()
    navigate('/register_exam', {state: {'id': id, 'exam_name': exam_name, 'exam_date': exam_date}})
  }


  return (
    <>
      <Carousel />
      <Container>
        <Box sx={{ backgroundColor: '#ce93d8', p: 2, borderRadius: '10px', textAlign: 'center', mt: 1 }} >
          <Typography sx={{fontWeight: 'bold'}}>Welcome to My Quiz Portal !!</Typography>
          <Typography sx={{mt: 1}}>One of the Best Platform to Practice and prepare yourself for future.</Typography>
          <Typography>Be a part of this platform and prepare yourself for your future Now!!</Typography>
        </Box>
      </Container>
      <Typography sx={{fontWeight: 'bold', fontSize: 20, mt: 1, p: 1}}>Register for Upcoming Quiz {'-->'}</Typography>
      
      <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
              {data.map((exam, i) => {
                return (
                  <Grid key={i} item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader title={exam.exam_name} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center' }} sx={{borderBottom: 1, backgroundColor: '#9c27b0', color: 'white', align: 'center'}} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography>
                           Exam Date: {exam.exam_date.split('T')[0]}
                        </Typography>
                        <Typography>
                        Exam Time: {exam.exam_date.split('T')[1].replace('Z', '')}
                        </Typography>
                        <Typography>
                           {exam.exam_desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                      <Button fullWidth color="secondary" variant="contained" onClick={handleRegister(exam.id, exam.exam_name, exam.exam_date)}>
                      Register
                    </Button>
                    </CardActions>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
        </Container>

    </>
  )
}

export default Home