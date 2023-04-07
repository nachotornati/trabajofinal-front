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
import {Modal} from '@mui/material';
import {TextField} from '@mui/material';

const mdTheme = createTheme();



export default function CrearComedorModal(props) {
    
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')

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
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/dinners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nombre,
                address: direccion,

            })
        })
            .then((response) => response.json())
            .then((res) => {
                
                props.updateComedores()
                props.handleCloseModal()
                //Llamar funcion para recargar comedores
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    


    return (
        <Modal open={props.open} onClose={props.handleCloseModal} >

            <div className="modal-container" style={{ width: '70%',height:'60%'}}>
                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
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
                    <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained" onClick={props.handleCloseModal}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained" onClick={crearComedor} >Guardar</Button>
                    </Grid>
                  
                    </Grid>
               
                </div>
             
            </div>




        </Modal>
    )
}