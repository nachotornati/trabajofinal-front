import React, { useContext, useState } from 'react';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";




const Survey = ({ survey }) => {
    

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const {id} = useParams()
    const [value, setValue] = React.useState('');
    const { currentUser } = useContext(AuthContext);

    const saveAnswers = () => {
      
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers', {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(


                {
                    "dinner_id": id,
                    "user_id":currentUser.id,
                    "survey_id": survey.id,
                    "answers": answers
                
                }
            )


        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Imprimir la rta:", res)
                
            }
            )
            .catch((err) => {
                console.log(err.message);
            });


    }



    const handleAnswer = (questionId, answer) => {
        console.log(answers)
        setAnswers({ ...answers, [questionId]: answer });
    };


    const handleAnswerComment = (questionId, answer) => {
        let respuesta = { value: answer }
        handleAnswer(questionId, respuesta)
    };

    const handleAnswerMultiselect = (questionId, answer) => {
        setValue(answer)
        const respuesta = { value: answer }
        handleAnswer(questionId, respuesta)

    };

    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
        setIsChecked2(false);
        handleAnswerSelectComment(currentQuestionData._id, true, "");
    }

    const handleCheck2 = (e) => {
        setIsChecked2(e.target.checked);
        setIsChecked(false);
        handleAnswerSelectComment(currentQuestionData._id, false, "");
    }


    const handleAnswerNumerical = (questionId, answer) => {
        let respuesta = { value: answer }

        handleAnswer(questionId, respuesta)
    };


    const handleAnswerSelectComment = (questionId, isChecked, answer) => {
        let respuesta = {}
        if (isChecked) {
            respuesta = { option: isChecked, value: answer }

        } else {
            respuesta = { option: isChecked, value: "" }
            setAnswers((prevAnswers) => {
                const updatedAnswers = { ...prevAnswers };
                delete updatedAnswers[questionId];
                return updatedAnswers;
            });


        }
        handleAnswer(questionId, respuesta)

    }


    const handleNext = () => {
        if (isLastQuestion) {
            const confirmSubmit = window.confirm('¿Está seguro que desea enviar la encuesta?');
            if (confirmSubmit) {
                //Probar esto
                saveAnswers();
                //window.addEventListener('beforeunload', saveAnswers);
                //window.location.href = "/home";

            }
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const currentQuestionData = survey?.questions[currentQuestion];
    const isLastQuestion = currentQuestion === survey.questions.length - 1;

    const renderContent = () => {
        switch (currentQuestionData.type) {
            case "comment":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {currentQuestionData.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData._id, e.target.value)}
                                value={answers[currentQuestionData._id.value]}></TextField>

                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                            {currentQuestion > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>


                        </Grid>
                    </>
                )
            case "multiselect":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} >
                                {currentQuestionData.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControl style={{ width: '75%' }}>
                                <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={value}
                                    label="Option"
                                    onChange={(e) => {
                                        handleAnswerMultiselect(currentQuestionData._id, e.target.value);
                                    }}

                                >
                                    {currentQuestionData.options.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>
                        </Grid>



                    </>

                )
            case "numerical":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {currentQuestionData.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" type="number" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData._id, e.target.value)}
                                value={answers[currentQuestionData._id.value]}> </TextField>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>

                        </Grid>

                    </>
                )
            case "select_comment":
                return (

                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {currentQuestionData.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox />}
                                label="SI"
                                labelPlacement="bottom"
                                checked={isChecked}
                                onChange={handleCheck}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox />}
                                label="NO"
                                labelPlacement="bottom"
                                checked={isChecked2}
                                onChange={handleCheck2}
                            />
                        </Grid>

                        {isChecked ? (
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '24px' }}>
                                <TextField variant="outlined" style={{ width: '50%' }} value={answers[currentQuestionData._id]?.value} onChange={(e) => handleAnswerSelectComment(currentQuestionData._id, isChecked, e.target.value)} />
                            </Grid>
                        ) : null
                        }
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>
                        </Grid>
                    </>
                )


        }
    }


    return (


        <Grid container spacing={2} >
            <Grid item xs={12} md={12} lg={12}>
                <div className="carousel-item" >
                    <Grid container spacing={3}>

                        {renderContent()}
                    </Grid>
                </div>
            </Grid>

        </Grid>

    );
};

export default Survey;