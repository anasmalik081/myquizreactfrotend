import React, { useState } from "react";
import { Box, Card, Typography, Button, CssBaseline } from '@mui/material'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { textColorChange, backgroundColorChange, setOptionBacgroundColor, setOptionTextColor, setUserAnswer } from '../../counter/counterSlice'
import { createBrowserHistory } from "history";
import { base_url } from '../../Api';

const Questions = () => {

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser 
    }
    return ''; // Legacy method for cross browser support
  };

  const history = createBrowserHistory()

  const location = useLocation()
  
  const navigate = useNavigate()
  
  const dispatch = useDispatch();

  const question = useSelector((state) => state.quiz.questions)

  let authorized = localStorage.getItem('token') == null ? false : true;

  const [answer, setAnswer] = useState([]);

  const [number, setNumber] = useState(0);

  const handleAnswer = (id, ans) => {
    let temp = [...answer];
    temp[id] = ans;
    setAnswer([...temp]);


    function Reset() {
      let arr1 = question[id].background;
      arr1 = ["white", "white", "white", "white"];
      let arr2 = question[id].color;
      arr2 = ["black", "black", "black", "black"];
      dispatch(backgroundColorChange({"id": id, "arr1": arr1}));
      dispatch(textColorChange({"id": id, "arr2": arr2}));
    }
    Reset();
    dispatch(setOptionBacgroundColor({"id": id, "ans": ans}))
    dispatch(setOptionTextColor({"id": id, "ans": ans}))
    dispatch(setUserAnswer({'id': id, "ans_id": question[id].options[ans].id}))
  };

  const handleIncrement = () => {
    if (number+1 === question.length) {
      return;
    }
    setNumber(number + 1);
  };

  const handleDecrement = () => {
    if (number === 0) return;
    setNumber(number - 1);
  };

  const handleSubmit = async () => {

    let answersByUser = []
    for(let i=0; i<question.length; i++){
      answersByUser.push({
        'q_id': question[i].q_id,
        'a_id': question[i].ans
      })
    }

    let token = localStorage.getItem('token')
    let response = await fetch(base_url + "api/user-answers/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
      body: JSON.stringify({'userAnswers': answersByUser, 'exam_Id': location.state.id})
    })
    let json = await response.json();
    if(response.status === 200){
      alert("Your Exam Submitted successfully")
      history.push('/dashboard')
      navigate("/dashboard")
    }else{
      console.log("Oops Somethig Went Wrong")
    }
  }

  let exam = true;
  try{
    const { title ,options, id, background, color } = question[number]
  }catch{
    exam = false;
  }

  if(exam) {
    history.push(null, null, location.href);
    window.onpopstate = function(event) {
      history.go(1);
    };
  }

  return (
    <>
    <CssBaseline />
    {authorized ?
    <Box sx={{backgroundColor: '#263238', pt: 2}}>
      <Typography textAlign='center' sx={{color: '#ffea00'}}>Please do not Refresh your page otherwise you will loose your exam.</Typography>
      <Box sx={{ backgroundColor: '#263238' ,height: '99vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       {exam ?
        <Card sx={{p: 2, width: '90vh'}}>
        <Box sx={{flexGrow: 1 ,display: 'flex', justifyContent: 'flex-end'}} elevation={24}>
            <Box>
                <Typography sx={{fontWeight: 'bold'}}>Question {question[number].id + 1} / {question.length}</Typography>
            </Box>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-start', my: 2}}>
            <Typography>Q {number+1}: {question[number].title}</Typography>
        </Box>
 
   {question[number].options.map((v, i) => {
       return (
         <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 16, my: 1, p:1 }} key={i} onClick={() => handleAnswer(question[number].id, i)} style={{ backgroundColor: question[number].background[i], color: question[number].color[i] }}>
             {v.value}
         </Box>
       )
   })}
 
 
        <Box>
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
              <Button variant="contained" color="error" size="medium"  onClick={handleSubmit}>Finish</Button>
                {number === 0 ?
                <Button variant="outlined" sx={{mr: 2}} color="secondary" size="medium" disabled>Previous</Button>:
                <Button variant="outlined" sx={{mr: 2}} color="secondary" size="medium" onClick={handleDecrement}>Previous</Button>}
                {number+1 === question.length ?
                <Button variant="contained" color="secondary" size="medium" disabled>Next</Button>:
                <Button variant="contained" color="secondary" size="medium" onClick={handleIncrement}>Next</Button>}
            </Box>
        </Box>
    </Card>:
    <Navigate to="/dashboard" />}
    </Box>
    </Box>:
    <Navigate to="/loginregister" />}
    </>
  );
};

export default Questions;
