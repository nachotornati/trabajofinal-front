import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ComedorItem from './ComedorItem';
import { TableContainer, TablePagination } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { TextField } from '@mui/material';
import { ComedorContext } from '../Context/ComedorContext';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import CrearComedorModal from '../Modals/CrearComedorModal';
import CustomAlert from './CustomAlert';

const mdTheme = createTheme();
export default function Home(props) {

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [comedores, setComedores] = useState([])
    const [tableComedores, setTableComedores] = useState([]);
    const [busqueda, setBusqueda] = useState("")
    const [crearComedorModalOpen, setCrearComedorModalOpen] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const { currentDinner } = useContext(ComedorContext);
    const { dispatch } = useContext(ComedorContext);

    console.log("currentDinner", currentUser)

    const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = React.useState(false);
    
    const showCompleteAllFieldError = () => {
        setopenCompleteAllFieldsError(true);
    };

    const closeCompleteAllFieldError = (event, reason) => {
        setopenCompleteAllFieldsError(false);
    };

    const [openSuccessfulRegister, setOpenSuccessfulRegister] =useState(false);
 
    const showSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(true);
    };

    const closeSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(false);
    };


    const unsetDinner = () => {

        dispatch({ type: "UNSET", payload: null })

    }


    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value)
        filtrar(event.target.value)
    }

    const handleModalClose = () => {
        setCrearComedorModalOpen(false)
    }

    const filtrar = (terminoBusqueda) => {
        var resultadoTablaBusqueda = tableComedores.filter((elemento) => {

            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.address.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setComedores(resultadoTablaBusqueda)
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getComedores = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/dinners', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {

                setComedores(res.dinners)
                setTableComedores(res.dinners)


            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {
        unsetDinner()
        getComedores()
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
                            <Grid container spacing={1}>
                                <CrearComedorModal open={crearComedorModalOpen} handleCloseModal={handleModalClose} updateComedores={getComedores} successMessage={showSuccessfulRegister} completeFieldMessage={showCompleteAllFieldError} />
                                <Grid item xs={12}>
                                    <Paper sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%'
                                    }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <TextField
                                                    value={busqueda}
                                                    placeholder="Busqueda por nombre de comedor"
                                                    style={{ marginRight: '8px', width: '100%' }}
                                                    onChange={handleChangeBusqueda}
                                                />
                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6}>
                                                <Button
                                                    sx={{ backgroundColor: '#8d75c6' }}
                                                    variant="contained"
                                                    style={{ width: '100%', height: '100%' }}
                                                    onClick={() => {
                                                        setCrearComedorModalOpen(true);
                                                    }}
                                                >
                                                    Nuevo Comedor
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>{/* Add table header cells here */}</TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {comedores &&
                                                                comedores.map((comedor) => (
                                                                    <ComedorItem key={comedor.id} id={comedor._id} direccion={comedor.address} nombre={comedor.name} coordinates={comedor.coordinates} />
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <TablePagination
                                                    style={{ display: 'flex', justifyContent: 'right' }}
                                                    component="div"
                                                    rowsPerPageOptions={[5, 10, 25]}
                                                    count={comedores.length}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    rowsPerPage={rowsPerPage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <CustomAlert text={"Completa todos los campos!"} severity={"error"} open={openCompleteAllFieldMessage} closeAction={closeCompleteAllFieldError} />
                    <CustomAlert text={"Comedor creado exitosamente!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />
                                              
                </Box>
            </ThemeProvider>

        </>
    );
}