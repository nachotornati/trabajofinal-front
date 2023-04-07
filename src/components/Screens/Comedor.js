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
import Mapa from '../Mapa';
import EncuestaItem from '../EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';
import GraficoLinea from '../GraficoLinea';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CrearEncuestaModal from '../Modals/CrearEncuestaModal';
import ComedorModal from '../Modals/ComedorModal';
const mdTheme = createTheme();


export default function Comedor(props) {

    const location = {
        address: 'Azcuenaga 1295, Buenos Aires, Argentina',
        lat: -34.593594671986146,
        lng: -58.39888790931125,
    }

    const [comedor, setComedor] = useState([])
    const { id } = useParams()
    const [editComedorModalOpen, setEditComedorModalOpen] = useState(false)
    const [createSurveyModalOpen, setCreateSurveyModalOpen] = useState(false)
    const [tipos, setTipos] = useState([]);
    const handleModalClose=()=>{
        setEditComedorModalOpen(false)
    }
    const handleSurveyClose = () => {
        setCreateSurveyModalOpen(false)
    }

    const getTiposEncuesta = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/survey/types', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
            
                setTipos(res.types)
               
            })
            .catch((err) => {
                console.log(err.message);
            });

    }


    const getComedor = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/comedor', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setComedor(res)
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {

        getTiposEncuesta()
    }, [])




    return (

        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <CrearEncuestaModal tipos={tipos} open={createSurveyModalOpen} handleCloseModal={handleSurveyClose} id={id} />
                <ComedorModal open={editComedorModalOpen} handleCloseModal={handleModalClose} id={id}/>
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
                        <Grid container spacing={1}>
                            {/* <Grid container spacing={0}>
                                <Grid id="target"item xs={8} lg={8} md={8}>


                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                            width: '100%',
                                            backgroundColor: '#a4c4be'
                                        }}
                                    >


                                    </Paper>
                                </Grid>
                                <Grid item xs={4} lg={4} md={4}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                            width: '100%',
                                        }}
                                    >
                                    </Paper>
                                </Grid>
                            </Grid> */}

                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Grid container justifyContent="space-between">
                                        <Grid item xs={6} textAlign="left">
                                            <Typography variant="h6" gutterBottom component="div">
                                                Comedor Tengo Hambre
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} textAlign='right' >
                                            <Button onClick={() => {
                                            
                                            setEditComedorModalOpen(true)
                                            }}>
                                                Editar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>


                            <Grid item xs={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Button component={Link} to={`/comedor/${id}/encuestas`}>
                                        Ver encuestas
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            setCreateSurveyModalOpen(true)
                                        }}>
                                        Crear encuesta
                                    </Button>

                                </Paper>

                            </Grid>
                            {/* <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >

                                    <Typography variant="h6" gutterBottom component="div">
                                        Grafico
                                    </Typography>
                                </Paper>
                                {/*<GraficoLinea/>
                            </Grid> 
                            */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Mapa location={location} />
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>

                </Box>

            </Box>
        </ThemeProvider>


    );
}