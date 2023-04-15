import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/joy/FormControl';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { Link } from '@mui/material';

const mdTheme = createTheme();
const EncuestaRealizada = () => {
    const [survey, setSurvey] = useState([]);
    const { idEncuesta } = useParams()
    const [answers, setAnswers] = useState([]);
    const {currentUser}=useContext(AuthContext);



    const getEncuesta = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/' + idEncuesta, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {

                //const answersArray = res.answers[0].answers;
                setAnswers(res);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    useEffect(() => {
        getEncuesta()
    }, [])





    return (
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
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12} sm={8} md={6} lg={6} >
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        
                                    }}>

                                    {answers.map((pregunta) => {
                                        return (
                                            <>

                                                <FormLabel style={{marginTop:'30px',color:'#8d75c6'}}>{pregunta.question.legend}</FormLabel>
                                                <TextField style={{marginTop:'10px'}} value={pregunta.answer.value} />
                                            </>


                                        )
                                    })}
                                    <Grid item xs={12} style={{marginTop:'20px'}}>
                                        <Button style={{color:'#8d75c6'}} onClick={() => window.location.href = `/comedor/encuestas`}>
                                            Volver
                                        </Button>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
};

export default EncuestaRealizada;