import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Mapa from '../Helpers/Mapa';
import GraficoLinea from '../GraficoLinea';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CrearEncuestaModal from '../Modals/CrearEncuestaModal';
import EditarComedorModal from '../Modals/EditarComedorModal';
import { useContext } from 'react';
import { ComedorContext } from '../Context/ComedorContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../Context/AuthContext';
import { EncuestaContext } from '../Context/EncuestaContext';
import CustomAlert from './CustomAlert';

const mdTheme = createTheme();


export default function Comedor(props) {


    const [comedor, setComedor] = useState([])
    const { id } = useParams()
    const [editComedorModalOpen, setEditComedorModalOpen] = useState(false)
    const [createSurveyModalOpen, setCreateSurveyModalOpen] = useState(false)
    const [tipos, setTipos] = useState([]);
    const [openSuccessfulRegister, setOpenSuccessfulRegister] =useState(false);
    const { currentDinner } = useContext(ComedorContext);
    const { currentUser } = useContext(AuthContext);
    const { currentEncuesta} = useContext(EncuestaContext);

    const dispatch = useContext(ComedorContext);

    //console.log(currentEncuesta)
    console.log(typeof props.tipos);

    const showSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(true);
    };

    const closeSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(false);
    };

    const handleModalClose = () => {
        setEditComedorModalOpen(false)
    }
    const handleSurveyClose = () => {
        setCreateSurveyModalOpen(false)
    }

    const getTiposEncuesta = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/survey/types', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setTipos(res)

            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    const handleDeleteComedor = () => {
        const confirmSubmit = window.confirm('¿Está seguro que desea eliminar el comedor?');
            if (confirmSubmit) {
                deleteComedor()
                

            }
            else{
                handleModalClose()
            }

    }
    const deleteComedor = () => {
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/dinners/${currentDinner.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {
                handleModalClose()
                window.location.href = '/home'
            })
    }


    //useEffect(() => {
      //  getTiposEncuesta()
    //}, [])

    useEffect(() => {
        getTiposEncuesta()
    if (currentEncuesta) {
            console.log('entro')
            showSuccessfulRegister()
        }
      }, [currentEncuesta]);




    return (

        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <CrearEncuestaModal tipos={tipos} open={createSurveyModalOpen} handleCloseModal={handleSurveyClose} id={currentDinner.id} />
                <EditarComedorModal open={editComedorModalOpen} handleCloseModal={handleModalClose} id={currentDinner.id} successMessage={showSuccessfulRegister} />
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
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" style={{color: "#8d75c6"}} gutterBottom component="div">
                                                {currentDinner.nombre}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} textAlign='right' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={() => setEditComedorModalOpen(true)}>
                                                <EditIcon sx={{color: "#8d75c6"}}/>
                                            </Button>
                                            <Button onClick={handleDeleteComedor}>
                                                <DeleteIcon sx={{color: "#8d75c6"}} />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Typography variant="body2" gutterBottom component="div">
                                            {currentDinner.direccion}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid>
                                        <Typography variant="body2" gutterBottom component="div">
                                            {currentDinner.telefono}
                                        </Typography>
                                    </Grid> */}
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
                                    <Button style={{color: "#8d75c6"}} component={Link} to={`/comedor/encuestas`}>
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
                                    <Button style={{color: "#8d75c6"}}
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

                                    <Mapa latitud={currentDinner?.latitud} longitud={currentDinner?.longitud} />
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>
                    <CustomAlert text={"Comedor actualizado exitosamente!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />
                    <CustomAlert text={"Comedor actualizado exitosamente!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />
                    <CustomAlert text={"Encuesta cargada exitosamente!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />
                </Box>

            </Box>
        </ThemeProvider>


    );
}