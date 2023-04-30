import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormControl, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import Survey from '../Carousel-Encuestas/Survey';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { MenuItem, Select, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { ComedorContext } from '../Context/ComedorContext';
import { EncuestaContext } from '../Context/EncuestaContext';
import EncuestaGuardadaSuccess from './EncuestaGuardadaSuccess';
const mdTheme = createTheme();

export default function PantallaEncuestas(props) {



    const [encuesta, setEncuesta] = useState([])
    const [preguntas, setPreguntas] = useState([])
    const [answers, setAnswers] = useState({});
    const { currentUser } = useContext(AuthContext)
    const { currentDinner } = useContext(ComedorContext)
    
    const [isLoading, setIsLoading] = useState(false);
    const { idEncuesta } = useParams()

    
   

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const currentQuestionData = preguntas.length !== 0 ? preguntas[currentQuestion] : null;
    const isLastQuestion = currentQuestion === preguntas.length - 1;
    console.log(preguntas)
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    //console.log("Textfield", currentQuestionData.answer.value)

    useEffect(() => {
        if (preguntas.length !== 0) {
            const currentQuestionData = preguntas[currentQuestion];
            setIsChecked(currentQuestionData?.answer.option !== undefined ? currentQuestionData.answer.option : false);
            setIsChecked2(currentQuestionData?.answer.option !== undefined ? !currentQuestionData.answer.option : false);
        }
    }, [currentQuestion, preguntas]);


    const saveAnswers = () => {
        console.log('stagingAnswers:', preguntas);
        transformAnswers(preguntas);

        const transformedAnswers = transformAnswers2(preguntas);
        console.log("otro arreglo", preguntas);


        console.log(
            {
                "dinner_id": currentDinner.id,
                "user_id": currentUser.id,
                "survey_id": encuesta.id,
                "answers": transformedAnswers
            }

        )
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            },
            body: JSON.stringify(


                {
                    "dinner_id": currentDinner.id,
                    "user_id": currentUser.id,
                    "survey_id": encuesta.id,
                    "answers": transformedAnswers

                }
            )


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

    const handleAnswerComment = (questionId, newAnswerValue) => {

        setPreguntas(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer.question._id === questionId) {
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


    const handleAnswerNumerical = (questionId, newAnswerValue) => {
        setPreguntas(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer.question._id === questionId) {
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
        setPreguntas((prevAnswers) => {
            const updatedAnswers = prevAnswers.map((answer) => {
                if (answer.question._id === questionId) {
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

    const handleAnswerMultiselect = (questionId, newAnswerValue) => {

        setPreguntas(prevAnswers =>
            prevAnswers.map(answer => {
                if (answer.question._id === questionId) {
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



    const transformAnswers = (array) => {
        array.forEach((respuesta) => {
            let _id = respuesta.question._id
            let answer = respuesta.answer
            setAnswers(prevAnswers => ({
                ...prevAnswers,
                [_id]: answer
            }));
        });
    }
    const transformAnswers2 = (array) => {
        let transformedAnswers = {};
        console.log("array", array)
        array.forEach((respuesta) => {
            let _id = respuesta.question._id
            let answer = respuesta.answer
            transformedAnswers[_id] = answer;
            console.log(transformedAnswers[_id] = answer)
        });
        return transformedAnswers;
    }


    const handleNext = () => {
        if (isLastQuestion) {
            const confirmSubmit = window.confirm('¿Está seguro que desea enviar la encuesta?');
            if (confirmSubmit) {
                //Probar esto
                
                saveAnswers();

                //if (isLoading === false) {
                    //window.addEventListener('beforeunload', saveAnswers);
                //    window.location.href = "/comedor";
                //}
            }
        } else {
            setCurrentQuestion(currentQuestion + 1);


        }
    };

    const handlePrevious = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
        setIsChecked2(false);
        handleAnswerSelectComment(currentQuestionData.question._id, true, "");
    }

    const handleCheck2 = (e) => {
        setIsChecked2(e.target.checked);
        setIsChecked(false);
        handleAnswerSelectComment(currentQuestionData.question._id, false, "");
    }





    const getEncuestas = () => {
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/survey/id/${idEncuesta}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {

                const tranformedQuestions = res.questions.map(question => {
                    let answer = {};
                    return {
                        question,
                        answer
                    }


                })
                setPreguntas(tranformedQuestions)
                setEncuesta(res)



            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {
        getEncuestas()
    }, [])

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
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', marginBottom:'10px'}}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData.question._id, e.target.value)}
                                value={typeof currentQuestionData.answer.value === 'undefined' ? '' : currentQuestionData.answer.value}
                            ></TextField>

                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
    {currentQuestion > 0 && <Button variant='contained' style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
    <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white', marginLeft: '10px' }} onClick={handleNext} >Siguiente</Button>
  </Grid>
                    </>
                )
            case "multiselect":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center', color: '#8d75c6' }} >
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                            <FormControl style={{ width: '75%' }}>
                                <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentQuestionData.answer.value}
                                    label="Option"
                                    onChange={(e) => {
                                        handleAnswerMultiselect(currentQuestionData.question._id, e.target.value);
                                    }}

                                >
                                    {currentQuestionData.question.options.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container justifyContent="center" alignItems="center">
    {currentQuestion > 0 && <Button variant='contained' style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
    <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white',marginLeft: '10px' }} onClick={handleNext} >Siguiente</Button>
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
  <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center',  marginTop: '1rem', marginBottom: '1rem' }}>
    <TextField variant="outlined" type="number" style={{ width: '50%' }} onChange={(e) => handleAnswerNumerical(currentQuestionData.question._id, e.target.value)}
      value={typeof currentQuestionData.answer.value === 'undefined' ? '' : currentQuestionData.answer.value}
    />
  </Grid>
  <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%',marginTop: '10px'  }}>
    {currentQuestion > 0 && <Button variant='contained' style={{ backgroundColor: '#8d75c6', color: 'white', marginRight: '10px' }} onClick={handlePrevious}>Anterior</Button>}
    <Button variant='contained' style={{ backgroundColor: '#8d75c6', color: 'white', marginLeft: '10px'}} onClick={handleNext}>Siguiente</Button>
  </Grid>
</>
                )
            case "select_comment":
                return (

                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center', color: '#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center',marginTop: '1rem', marginBottom: '1rem'  }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox style={{ color: '#8d75c6' }} />}
                                label="SI"
                                labelPlacement="bottom"
                                checked={isChecked}

                                onChange={handleCheck}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox style={{ color: '#8d75c6' }} />}
                                label="NO"
                                labelPlacement="bottom"
                                checked={isChecked2}
                                onChange={handleCheck2}
                            />
                        </Grid>

                        {isChecked ? (
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '24px' }}>
                                <TextField variant="outlined" style={{ width: '50%' }} value={currentQuestionData.answer?.value} onChange={(e) => handleAnswerSelectComment(currentQuestionData.question._id, isChecked, e.target.value)}
                                />
                            </Grid>
                        ) : null
                        }
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white',marginRight: '10px'  }} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{ backgroundColor: '#8d75c6', color: 'white',marginLeft: '10px'  }} onClick={handleNext} >Siguiente</Button>
                        </Grid>
                    </>
                )


        }
    }


    return (

        

        isLoading ? 
                <EncuestaGuardadaSuccess caso={"guardada"}/>

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
                                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>

                                            <Grid container spacing={2} >
                                                <Grid item xs={12} md={12} lg={12}>
                                                    <div className="carousel-item" >
                                                        <Grid container spacing={3}>



                                                            {encuesta.length != 0 ? renderContent() : <div>Cargando encuesta...</div>}

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