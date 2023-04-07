import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Link} from '@mui/material';

const mdTheme = createTheme();
const EncuestaRealizada = () => {
    const [survey, setSurvey] = useState([]);
    const { idEncuesta } = useParams()
    const [answers, setAnswers] = useState([]);

    

    const getEncuesta = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/' + idEncuesta, {
            headers: {
                'Content-Type': 'application/json',
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
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center', 
                                                             
                            }}>

                            {answers.map((pregunta) => {
                                return (
                                    <Box key={pregunta.question._id} sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%', mb: 1 }}>
                                        <FormLabel component="legend" sx={{ textAlign: 'center' }}>{pregunta.question.legend}</FormLabel>
                                    </Box>
                                    <TextField value={pregunta.answer.value} sx={{ width: '100%',textAlign: 'center' }} />
                                </Box>
                                )
                            })}
                            <Grid item xs={12}>
                                <Button onClick={()=> window.location.href= `/comedor/encuestas`}>
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