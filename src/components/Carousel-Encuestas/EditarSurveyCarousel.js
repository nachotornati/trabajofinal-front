import React, { useState } from 'react';
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
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';



const EditarSurveyCarousel = ({ comedor, id, answers }) => {

    const [newAnswers, setNewAnswers] = useState(answers);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const currentQuestionData = newAnswers[currentQuestion];
    console.log("Answers", answers)

    const isLastQuestion = currentQuestion === answers.length - 1;

    
    const [isChecked, setIsChecked] = useState(currentQuestionData.answer.option !== undefined ? currentQuestionData.answer.option : false);
    const [isChecked2, setIsChecked2] = useState(currentQuestionData.answer.option !== undefined ? !currentQuestionData.answer.option : false);
    const [value, setValue] = useState(currentQuestionData.answer.value || "");

    const saveAnswers = () => {
        console.log(newAnswers)
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            },
            body: JSON.stringify(newAnswers)


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

        setNewAnswers({ ...answers, [questionId]: answer });
    };


    const handleAnswerComment = (questionId, newAnswerValue) => {

        setNewAnswers(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer._id === questionId) {
                    return {
                        ...answer,
                        answer: {
                            ...answer.answer,
                            value: newAnswerValue
                        }
                    }
                }
                return answer
            })
        )

    };

    const handleAnswerMultiselect = (questionId, newAnswerValue) => {
        setValue(newAnswerValue)
        setNewAnswers(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer._id === questionId) {
                    return {
                        ...answer,
                        answer: {
                            ...answer.answer,
                            value: newAnswerValue
                        }
                    }
                }
                return answer
            })
        )

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


    const handleAnswerNumerical = (questionId, newAnswerValue) => {
        setNewAnswers(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer._id === questionId) {
                    return {
                        ...answer,
                        answer: {
                            ...answer.answer,
                            value: newAnswerValue
                        }
                    }
                }
                return answer
            })
        )
    };


    const handleAnswerSelectComment = (questionId, isChecked, value) => {
        setNewAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers.map((answer) => {
                if (answer._id === questionId) {
                    if (isChecked) {
                        return {
                            ...answer,
                            answer: {
                                option: isChecked,
                                value: value,
                            },
                        };
                    } else {
                        return {
                            ...answer,
                            answer: {
                                option: isChecked,
                                value: "",
                            },
                        };
                    }
                } else {
                    return answer;
                }
            });
            return updatedAnswers;
        });
    }


    const handleNext = () => {
        if (isLastQuestion) {
            const confirmSubmit = window.confirm('¿Está seguro que desea enviar la encuesta?');
            if (confirmSubmit) {
                saveAnswers()

                //Ver como
                //window.location.href = "/home"

            }
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentQuestion(currentQuestion - 1);
    };



    const renderContent = () => {
        switch (currentQuestionData.question.type) {
            case "comment":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData._id, e.target.value)}
                                value={currentQuestionData.answer.value}></TextField>

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
                                {currentQuestionData.question.legend}
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
                                    {currentQuestionData.question.options.map((option) => (
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
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerNumerical(currentQuestionData._id, e.target.value)}
                               value={currentQuestionData.answer.value}> </TextField>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button onClick={handlePrevious}>Anterior</Button>}
                            <Button onClick={handleNext} >Siguiente</Button>

                        </Grid>

                    </>
                )
            case "select_comment":
                //setIsChecked(currentQuestionData.answer.option);
                //setIsChecked2(!currentQuestionData.answer.option);
                return (

                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
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
                                <TextField variant="outlined" style={{ width: '50%' }} value={currentQuestionData.answer?.value} onChange={(e) => handleAnswerSelectComment(currentQuestionData._id, isChecked, e.target.value)} />
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

export default EditarSurveyCarousel;