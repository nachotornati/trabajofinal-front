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

import PollIcon from '@mui/icons-material/Poll';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ComedorItem from './ComedorItem';
import { TableCell, TableContainer, TablePagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@mui/material';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext } from 'react';
import { ComedorContext } from '../Context/ComedorContext';
import { AuthContext } from '../Context/AuthContext';
import CustomAlert from './CustomAlert';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';



const mdTheme = createTheme();
export default function EncuestasHistoricas(props) {

    const { id } = useParams();// uso el id para buscar las encuestas del comedor
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [encuestas, setEncuestas] = React.useState([])

    const { currentDinner } = useContext(ComedorContext);
    const { currentUser } = useContext(AuthContext);
    
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const [openSuccessfulRegister, setOpenSuccessfulRegister] =useState(false);
 
    const showSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(true);
    };

    const closeSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(false);
    };

    const handleDeleteEncuesta = (id) => {
        const confirmSubmit = window.confirm('¿Está seguro que desea eliminar la encuesta?');
            if (confirmSubmit) {
                deleteEncuesta(id)
                

            }
     

    }

    const handleDownloadEncuesta = (id) =>{ 
        const confirmSubmit = window.confirm('¿Está seguro que desea descargar la encuesta?');
            if (confirmSubmit) {
                downloadEncuesta(id)
                

            }

    }

    const downloadEncuesta = (id) => {
        
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/${id}/download/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then( (response)=> response.text())
            .then((csvString) => {
                const blob = new Blob([csvString], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${currentDinner}-encuesta.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              })
            .catch((err) => {
                console.log(err.message);
            });
    }


    const deleteEncuesta = (id) => {

        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/answers/id/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {
                getEncuestas()
                showSuccessfulRegister()

            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    const getEncuestas = () => {
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/answers/${currentDinner.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {

                setEncuestas(res)


            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {
        getEncuestas()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;

    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

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
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography variant="h4" component="div" gutterBottom sx={{ textAlign: 'center' ,color: "#8d75c6"}}>
                                            Encuestas Históricas del {currentDinner.nombre}
                                        </Typography>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Fecha</TableCell>
                                                        <TableCell>Tipo</TableCell>
                                                        <TableCell style={{ textAlign: 'center' }}>Hecha Por</TableCell>
                                                        <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                
                                                    { encuestas
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(encuesta => (
                                                        <TableRow key={encuesta.id}>
                                                            <TableCell>{formatDate(encuesta.date)}</TableCell>
                                                            <TableCell>{encuesta.survey_type}</TableCell>
                                                            <TableCell style={{ textAlign: 'center' }}>{encuesta.surver}</TableCell>
                                                            <TableCell style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                                                <Button onClick={() => (window.location.href = `/comedor/encuesta/${encuesta.id}`)}>
                                                                    <VisibilityIcon sx={{color: "#8d75c6"}} />
                                                                </Button>
                                                                <Button onClick={() => (window.location.href = `/comedor/editar-encuesta/${encuesta.id}`)}>
                                                                    <EditIcon sx={{color: "#8d75c6"}}/>
                                                                </Button>
                                                                <Button onClick={() => handleDeleteEncuesta(encuesta.id)}>
                                                                    <DeleteIcon sx={{color: "#8d75c6"}} />
                                                                </Button>
                                                                <Button onClick={() => handleDownloadEncuesta(encuesta.id)}>
                                                                    <DownloadIcon sx={{color: "#8d75c6"}} />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            style={{ display: 'flex', justifyContent: 'right' }}
                                            component="div"
                                            rowsPerPageOptions={[5, 10, 25]}
                                            count={encuestas.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <CustomAlert text={"Encuesta eliminada exitosamente!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />

                </Box>
            </ThemeProvider>

        </>
    );
}