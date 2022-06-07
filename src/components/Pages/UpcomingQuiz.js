import {  Card, Container, Grid, CardHeader, CardContent, Typography, Button, CardActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {questionsHandle} from '../../counter/counterSlice'
import { base_url } from '../../Api';

const UpcomingQuiz = () => {

  const dispatch = useDispatch()

  const [upcoming, setUpcoming] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    async function getAllData(){
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(base_url + 'api/upcomming/', {
          method: 'GET' ,
          headers: new Headers({
            'Authorization': 'Bearer '+token, 
            'Content-Type': 'application/json'
        })
        })
        const json = await response.json();
        setUpcoming(json.upcoming_exam)
        setCurrent(json.current_exam)
      } catch (error) {
        console.log(error)
      }
    }
    getAllData()
  }, [])


  const navigate = useNavigate();
  const handleClick = id => e => {
    e.preventDefault();
    async function getData(){
      const token = localStorage.getItem('token')
      const response = await fetch(base_url + 'api/quiz/'+id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
      })
      const json = await response.json();
      if(response.status === 200){
        dispatch(questionsHandle(json.message));
        navigate("/quiz", {state: {'id': id}})
      }else{
        alert(json.message)
      }
    }
    getData()
  }

  return (
    <>
    <Typography variant='h4' textAlign='center' sx={{mt: 2}}>Today's Quizes</Typography>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
              {
                current.map((exam, i)=>{
                  return (
                  <Grid item key={i}  xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader title={exam.exam_name} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center' }} sx={{borderBottom: 1, backgroundColor: 'purple', color: 'white', align: 'center'}} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography>
                        {exam.exam_desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                      <Button fullWidth color="secondary" variant="outlined" onClick={handleClick(exam.id)}>
                      Start Quiz
                    </Button>
                    </CardActions>
                    </Card>
                  </Grid>
                  )
                })
              }
          </Grid>
        </Container>






        <Typography variant='h4' textAlign='center' sx={{mt: 2}}>Upcoming Quizes</Typography>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
              {
                upcoming.map((exam, i)=>{
                  return (
                  <Grid item key={i}  xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader title={exam.exam_name} titleTypographyProps={{ align: 'center' }} subheaderTypographyProps={{ align: 'center' }} sx={{borderBottom: 1, backgroundColor: 'purple', color: 'white', align: 'center'}} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography>
                          {exam.exam_desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                      <Button fullWidth color="secondary" variant="outlined" disabled>
                        Start Quiz
                      </Button>
                    </CardActions>
                    </Card>
                  </Grid>
                  )
                })
              }
          </Grid>
        </Container>
    </>
  )
}

export default UpcomingQuiz