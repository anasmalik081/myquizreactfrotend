import React, { useEffect, useState } from 'react'
import { Card, Container, Grid, CardHeader, CardContent, Typography, Button, CardActions } from '@mui/material'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { base_url } from '../../Api';



const MyPerformance = () => {



    const [data, setData] = useState({});


    useEffect(() => {
        async function getAllData() {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(base_url+'api/dashboard/', {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    })
                })
                const json = await response.json();
                setData(json)
            } catch (error) {
                console.log(error)
            }
        }
        getAllData()
    }, [])


    const total_exams = [
        {
            name: "Total Exams",
            value: data.total_exam
        }
    ]

    const winner = [
        {
            name: "Winner",
            value: data.winner
        }
    ]



    return (
        <>
        <Typography variant='h4' textAlign='center' sx={{ mt: 2 }}>My Performance</Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" sx={{mb: 5}}>
                <Grid item sx={{ height: 200, width: 250, mt: 3 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart >
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={total_exams}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Pie dataKey="value" data={total_exams} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <Typography textAlign='center' variant="h5" color="text.secondary" paragraph>
                            Total Exams
                    </Typography>
                </Grid>
                <Grid item sx={{ height: 200, width: 250, mt:3 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart >
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={winner}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Pie dataKey="value" data={winner} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <Typography textAlign='center' variant="h5" color="text.secondary" paragraph>
                            Total Wins
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default MyPerformance