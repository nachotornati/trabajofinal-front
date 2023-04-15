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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import EncuestaItem from '../EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';
import Carousel, { Carouselitem } from "../Carousel-Encuestas/Survey"
import { useState } from 'react';
import { useEffect } from 'react';
import Survey from '../Carousel-Encuestas/Survey';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';

const mdTheme = createTheme();

export default function PantallaEncuestas(props) {

    const [encuesta, setEncuesta] = useState([])
    const [preguntas, setPreguntas] = useState([])
    const { currentUser } = useContext(AuthContext)
    

    const getEncuestas = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/survey', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                const tranformedQuestions = res.questions.map(question => {
                    let answer = {};
                    return{
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


        return (
            <>
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
                                        
                                            
                                            
                                           

                                           {encuesta.length != 0 ? < Survey survey={encuesta} preguntas={preguntas}/> :'cargando encuesta...'}

                                        

                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>

                        </>
        );

    }