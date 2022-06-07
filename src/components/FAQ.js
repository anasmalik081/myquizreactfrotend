import { Box, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { base_url } from '../Api'

const FAQ = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        async function getAllData(){
            try{
                let response = await fetch(base_url+'api/query/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let json = await response.json()
                setData(json.Questions)
            }catch(error){
                console.log("Catch me AAya")
            }
        }
        getAllData()
    }, [])

    console.log(data)

  return (
    <>
        <Box>
            <Typography sx={{borderBottom: 1, textAlign: 'center', pb: 1}}>Frequently Asked Questions</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {data.map((v, i) => {
                    return (
                        <Grid key={i} item xs={12} sm={6}>
                            <Box sx={{backgroundColor: '#e1bee7', my: 2, p: 2}}>
                                <Typography sx={{fontWeight: 'bold'}}>{v.queston}</Typography>
                                <p>{v.answer}</p>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    </>
  )
}

export default FAQ