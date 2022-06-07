import React, { useState } from 'react'
import {Box, Button, Card, Stepper, Step, StepLabel} from '@mui/material'
import UploadStep1 from './UploadStep1'
import UploadStep2 from './UploadStep2'
import UploadStep3 from './UploadStep3'
import { base_url } from '../../Api';

const UploadQuestions = () => {

    const [error, setError] = useState({
        status: false,
        msg: '',
        type: ''
    })

    const [exam, setExam] = useState({
        exam_category: '',
        exam_name: '',
        exam_level: '',
        exam_desc: '',
        exam_date: '',
        exam_time: '12:00'
    })

    const [questionAnswer, setQuestionAnswer] = useState({
        file: ''
    })

    const [currentStep, setCurrentStep] = useState(0)

    const handleChange = (e) => {
        e.preventDefault();
        if (currentStep === 0){
            const data = new FormData(e.currentTarget);
            const actualData = {
                exam_category: data.get('exam_category'),
                exam_name: data.get('exam_name'),
                exam_level: data.get('exam_level'),
                exam_desc: data.get('exam_desc'),
                exam_date: data.get('exam_date'),
                exam_time: data.get('exam_time')
            }
            setExam({exam_category: actualData.exam_category, exam_name: actualData.exam_name, exam_level: actualData.exam_level, exam_desc: actualData.exam_desc, exam_date: actualData.exam_date, exam_time: actualData.exam_time})
        }else if (currentStep === 1){
            const data = new FormData(e.currentTarget)
            const actualData = {
                file: data.get('file')
            }
            setQuestionAnswer({file: actualData.file})
        }
    }

    const handleContinue = (e) => {
        e.preventDefault();
        if(currentStep === 0){
            setCurrentStep(currentStep + 1)
        }else if(currentStep === 1){
            let file_name = questionAnswer.file['name'].split('.')
            if(file_name[file_name.length - 1] === 'xlsx'){
                setCurrentStep(currentStep + 1)
            }else{
                setError({status: true, msg: 'File Not Supported. Supported doc is only .xlsx', type: 'error'})
            }
        }
    }

    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1)
        setError({status: false, msg: '', type: ''})
    }

    const handleFinish = async (e) => {
        e.preventDefault();
        const uploadForm = new FormData();
        uploadForm.append("Exam Category", exam.exam_category);
        uploadForm.append("Exam Name", exam.exam_name);
        uploadForm.append("Exam Level", exam.exam_level);
        uploadForm.append("Exam Desc", exam.exam_desc);
        uploadForm.append("Exam Date", exam.exam_date);
        uploadForm.append("Exam Time", exam.exam_time);
        uploadForm.append("File", questionAnswer.file);
        if(exam.exam_name && exam.exam_category && exam.exam_date && exam.exam_level && exam.exam_desc && exam.exam_time && questionAnswer.file['name']){

            let token = localStorage.getItem('token')
            let response = await fetch(base_url + "api/question_upload/", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+token,
                },
                body: uploadForm
            })
            let json = await response.json()
            if(response.status === 200){
                setError({status: true, msg: 'Your Form Saved Successfully', type: 'success'})
                setTimeout(() => {
                    setError({status: false, msg: '', type: ''})
                    setExam({exam_category: '', exam_name: '', exam_date: ''})
                    setQuestionAnswer({file: ''})
                    setCurrentStep(0)
                }, 2000)
            }else{
                console.log(json)
            }

            
        }else{
            setError({status: true, msg: "Find Out What You have Missed and then try to submit", type: 'error'})
        }
    }

    const steps = [
        'Exam Detail Step',
        'Question Answers Step',
        'Final Step',
    ];

    const getStepsItems = (steps) => {
        switch (steps) {
            case 0:
                return <UploadStep1 state={exam} handleChange={handleChange} handleContinue={handleContinue} />;
            
            case 1:
                return <UploadStep2 error={error} state={questionAnswer} handlePrev={handlePrev} handleChange={handleChange} handleContinue={handleContinue} />;

            case 2:
                return <UploadStep3 error={error} state1={exam} state2={questionAnswer} handlePrev={handlePrev} handleFinish={handleFinish} />;

            default:
                return <UploadStep1 />;
        }
    }

  return (
    <>
        <Box sx={{my: 2, p: 2, display: 'flex', justifyContent: 'center'}}>
           <Box sx={{width: '100%'}}>
                <Card sx={{display: 'flex', justifyContent: 'center', p: 2, mb: 2}}>
                    <Box>
                    <Stepper activeStep={currentStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    </Box>
                </Card>
                <Card sx={{px: 2}}>
                    {getStepsItems(currentStep)}
                </Card>
           </Box>
        </Box>
    </>
  )
}

export default UploadQuestions