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
import EncuestaItem from './EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { TextField } from '@mui/material';
import CustomAlert from './Screens/CustomAlert';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';
const mdTheme = createTheme();



export default function CrearComedorModal(props) {

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')

    const {currentUser} = useContext(AuthContext)

    const handleComedorName = (value) => {
        setNombre(value)
    }
    const handleComedorDireccion = (value) => {
        setDireccion(value)
    }

    const cancelChanges = () => {
        props.handleCloseModal()
    }

  

    const crearComedor = () => {

        if (nombre === '' || direccion === '') {
            props.completeFieldMessage()

        }
        else {
            fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/dinners`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token':currentUser.accessToken
                },
                body: JSON.stringify({
                    name: nombre,
                    address: direccion,

                })
            })
                .then((response) => response.json())
                .then((res) => {

                    props.updateComedores()
                    props.successMessage()
                    props.handleCloseModal()
                    //Llamar funcion para recargar comedores
                })
                .catch((err) => {
                    console.log(err.message);
                });
            
            }   
        }




        return (
            <Modal open={props.open} onClose={props.handleCloseModal} >

                <div className="modal-container">
                    <div className="modal-content">
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                                Nuevo Comedor
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <TextField label="Nombre del comedor" onChange={(e) => handleComedorName(e.target.value)}></TextField>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <TextField label="Direccion" onChange={(e) => handleComedorDireccion(e.target.value)}></TextField>
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                                <Button variant="contained" style={{backgroundColor:'#8d75c6'}}onClick={props.handleCloseModal}>Cancelar</Button>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                                <Button variant="contained" style={{backgroundColor:'#8d75c6'}}onClick={crearComedor} >Guardar</Button>
                            </Grid>

                        </Grid>

                    </div>
                
                </div>




            </Modal>
        )
    }