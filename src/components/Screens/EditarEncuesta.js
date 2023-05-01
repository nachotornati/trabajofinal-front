import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {TextField} from '@mui/material';
import {FormControlLabel} from '@mui/material';
import {Checkbox} from '@mui/material';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import EncuestaGuardadaSuccess from './EncuestaGuardadaSuccess';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mdTheme = createTheme();

export default function EditarEncuesta(props) {



    const [answers, setAnswers] = useState([])
    const [comedor, setComedor] = useState("")
    const { id, idEncuesta } = useParams()
    const { currentUser } = useContext(AuthContext)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const currentQuestionData = answers?.length !== 0 ? answers[currentQuestion] : null;
    //const currentQuestionData = newAnswers[currentQuestion];

    console.log(idEncuesta)
    const isLastQuestion = currentQuestion === answers.length - 1;

    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    //const [isChecked, setIsChecked] = useState(currentQuestionData.answer?.option !== undefined ? currentQuestionData.answer.option : false);
    //const [isChecked2, setIsChecked2] = useState(currentQuestionData.answer?.option !== undefined ? !currentQuestionData.answer.option : false);
    const [value, setValue] = useState(currentQuestionData?.answer?.value || "");
    const [showButton, setShowButton] = useState(false);

    console.log("current", currentQuestionData)
    useEffect(() => {
        getEncuesta()
    }, [])

    useEffect(() => {
        if (answers.length !== 0) {
            const currentQuestionData = answers[currentQuestion];
            setIsChecked(currentQuestionData?.answer.option !== undefined ? currentQuestionData.answer.option : false);
            setIsChecked2(currentQuestionData?.answer.option !== undefined ? !currentQuestionData.answer.option : false);
        }
    }, [currentQuestion, answers]);


    const saveAnswers = () => {
        console.log('https://trabajo-final-backend-7ezk.onrender.com/api/answers/' + idEncuesta)
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/' + idEncuesta, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            },
            body: JSON.stringify(answers)


        })
            .then((response) => response.json())
            .then((res) => {
                console.log("Imprimir la rta:", res)
                setIsLoading(true)
            }
            )
            .catch((err) => {
                console.log(err.message);
            });


    }



    const handleAnswer = (questionId, answer) => {

        setAnswers({ ...answers, [questionId]: answer });
    };


    const handleAnswerComment = (questionId, newAnswerValue) => {

        setAnswers(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer._id === questionId) {
                    return {
                        ...answer,
                        answer: {
                            ...answer.answer,
                            value: newAnswerValue,

                        }
                    }
                }
                return answer
            })
        )

    };

    const handleAnswerMultiselect = (questionId, newAnswerValue) => {
        setValue(newAnswerValue)
        setAnswers(prevAnswers =>
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
        setAnswers(prevAnswers =>
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
        setAnswers((prevAnswers) => {
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
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center', color: '#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData._id, e.target.value)}
                                value={typeof currentQuestionData.answer?.value === 'undefined' ? '' : currentQuestionData.answer.value}
                            ></TextField>

                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginLeft: '10px' }} onClick={handleNext} >Siguiente</Button>
                        </Grid>
                    </>
                )
            case "multiselect":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center', color: '#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                            <FormControl style={{ width: '75%' }}>
                                <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentQuestionData.answer?.value}
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
                            {currentQuestion > 0 && <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginLeft: '10px' }} onClick={handleNext} >Siguiente</Button>
                        </Grid>



                    </>

                )
            case "numerical":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center', color: '#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerNumerical(currentQuestionData._id, e.target.value)}
                                value={typeof currentQuestionData.answer?.value === 'undefined' ? '' : currentQuestionData.answer.value}> </TextField>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginLeft: '10px' }} onClick={handleNext} >Siguiente</Button>
                        </Grid>

                    </>
                )
            case "select_comment":
                //setIsChecked(currentQuestionData.answer.option);
                //setIsChecked2(!currentQuestionData.answer.option);
                return (

                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center', color: '#8d75c6' }} zeroMinWidth>
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
                            {currentQuestion > 0 && <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginLeft: '10px' }} onClick={handleNext} >Siguiente</Button>
                        </Grid>
                    </>
                )


        }
    }
    useEffect(() => {
        if (answers.length !== 0) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }, [answers]);








    const getEncuesta = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/' + idEncuesta, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {

                setAnswers(res);

            })
            .catch((err) => {
                console.log(err.message);
            });
    }


   



    return (

        isLoading ?
        <EncuestaGuardadaSuccess caso={"editada"} />

        :


        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >


                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                        <Grid container spacing={1} >
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%'}}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="carousel-item" >
                                                {showButton && (
                                                    <Button onClick={() => window.location.href = '/comedor'} sx={{ mb: 2 }} style={{ backgroundColor: 'transparent' }}>
                                                        <ArrowBackIcon sx={{ color: '#8d75c6' }} />
                                                    </Button>

                                                )}

                                                <Grid container spacing={3} >
                                                    {showButton? renderContent() : <LoadingSpinner />}

                                                </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>




                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
            
    );

}