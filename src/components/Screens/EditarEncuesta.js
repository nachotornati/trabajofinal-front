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
import EncuestaItem from '../Helpers/EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';
import Carousel, { Carouselitem } from "../Carousel-Encuestas/Survey"
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditarSurveyCarousel from '../Carousel-Encuestas/EditarSurveyCarousel'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const mdTheme = createTheme();

export default function EditarEncuesta(props) {

    

    const [answers, setAnswers] = useState([])
    const [comedor, setComedor] = useState("")
    const { id, idEncuesta } = useParams()
    const {currentUser} = useContext(AuthContext)
   
    



    

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


    useEffect(() => {
        getEncuesta()
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
                                        
                                        {answers.length != 0 ? < EditarSurveyCarousel comedor={comedor} id={idEncuesta} answers={answers}/> :'cargando encuesta...'}


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