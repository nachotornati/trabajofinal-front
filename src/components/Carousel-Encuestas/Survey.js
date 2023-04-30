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
import { ComedorContext } from "../Context/ComedorContext";
import { useEffect } from 'react';



const Survey = ({ survey,preguntas }) => {
    

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [stagingAnswers, setStagingAnswers] = useState(preguntas);
    const currentQuestionData = stagingAnswers[currentQuestion];
    const isLastQuestion = currentQuestion === stagingAnswers.length - 1;
    const [isChecked, setIsChecked] = useState(currentQuestionData.answer.option !== undefined ? currentQuestionData.answer.option : false);
    const [isChecked2, setIsChecked2] = useState(currentQuestionData.answer.option !== undefined ? !currentQuestionData.answer.option : false);
    const {id} = useParams()
    const [value, setValue] = React.useState('');
    const { currentUser } = useContext(AuthContext);
    const {currentDinner} = useContext(ComedorContext);
    

    const saveAnswers = () => {
        console.log('stagingAnswers:', stagingAnswers);
        transformAnswers(stagingAnswers);

        const transformedAnswers = transformAnswers2(stagingAnswers);
        console.log("otro arreglo",transformedAnswers);
        

        console.log(
            {
                "dinner_id": currentDinner.id,
                "user_id":currentUser.id,
                "survey_id": survey.id,
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
                    "user_id":currentUser.id,
                    "survey_id": survey.id,
                    "answers": transformedAnswers
                
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
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: answer
        }));
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
        console.log("array",array)
        array.forEach((respuesta) => {
          let _id = respuesta.question._id
          let answer = respuesta.answer
          transformedAnswers[_id] = answer;
          console.log(transformedAnswers[_id] = answer)
        });
        return transformedAnswers;
      }

      useEffect(() => {
        console.log("hook",answers);
      }, [answers]);

      const handleAnswerComment = (questionId, newAnswerValue) => {

        setStagingAnswers(prevAnswers =>
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

    const handleAnswerMultiselect = (questionId, newAnswerValue) => {
        
        setStagingAnswers(prevAnswers =>
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


    const handleAnswerNumerical = (questionId, newAnswerValue) => {
        setStagingAnswers(prevAnswers =>
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
        setStagingAnswers((prevAnswers) => {
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

    

    const renderContent = () => {
        switch (currentQuestionData.question.type) {
            case "comment":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center',color:'#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" style={{ width: '50%' }} onChange={(e) => handleAnswerComment(currentQuestionData.question._id, e.target.value)}
                                value={currentQuestionData.answer.value}></TextField>

                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

                            {currentQuestion > 0 && <Button variant='contained' style={{backgroundColor:'#8d75c6',color:'white'}} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{backgroundColor:'#8d75c6',color:'white'}} onClick={handleNext} >Siguiente</Button>


                        </Grid>
                    </>
                )
            case "multiselect":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center',color:'#8d75c6' }} >
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
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
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button variant='contained' style={{backgroundColor:'#8d75c6',color:'white'}} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{backgroundColor:'#8d75c6',color:'white'}} onClick={handleNext} >Siguiente</Button>
                        </Grid>



                    </>

                )
            case "numerical":
                return (
                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center',color:'#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField variant="outlined" type="number" style={{ width: '50%' }} onChange={(e) => handleAnswerNumerical(currentQuestionData.question._id, e.target.value)}
                                value={currentQuestionData.answer.value}> </TextField>
                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button variant='contained' style={{backgroundColor:'#8d75c6',color:'white'}}onClick={handlePrevious}>Anterior</Button>}
                            <Button variant='contained' style={{backgroundColor:'#8d75c6',color:'white'}} onClick={handleNext} >Siguiente</Button>

                        </Grid>

                    </>
                )
            case "select_comment":
                return (

                    <>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ display: 'flex', justifyContent: 'center',color:'#8d75c6' }} zeroMinWidth>
                                {currentQuestionData.question.legend}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox style={{color:'#8d75c6' }}/>}
                                label="SI"
                                labelPlacement="bottom"
                                checked={isChecked}
                                
                                onChange={handleCheck}
                            />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <FormControlLabel
                                value="bottom"
                                control={<Checkbox style={{color:'#8d75c6' }}/>}
                                label="NO"
                                labelPlacement="bottom"
                                checked={isChecked2}
                                onChange={handleCheck2}
                            />
                        </Grid>

                        {isChecked ? (
                            <Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '24px' }}>
                                <TextField variant="outlined" style={{ width: '50%' }} value={currentQuestionData.answer?.value} onChange={(e) => handleAnswerSelectComment(currentQuestionData.question._id, isChecked, e.target.value)} />
                            </Grid>
                        ) : null
                        }
                        <Grid style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {currentQuestion > 0 && <Button variant="contained"style={{backgroundColor:'#8d75c6',color:'white'}} onClick={handlePrevious}>Anterior</Button>}
                            <Button variant="contained" style={{backgroundColor:'#8d75c6', color:'white'}}onClick={handleNext} >Siguiente</Button>
                        </Grid>
                    </>
                )


        }
    }


    return (


        

        renderContent() 
             

    );
};

export default Survey;