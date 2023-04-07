import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EncuestaItem from '../EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { ComedorContext } from '../Context/ComedorContext';
import { useState } from 'react';
const mdTheme = createTheme();

export default function EditarComedorModal(props) {
    

    const { dispatch } = useContext(ComedorContext);
    const { currentDinner } = useContext(ComedorContext);
    const cancelChanges = () => {
        props.handleCloseModal()
    }
    

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')

    const handleNombre = (e) => {
        setNombre(e.target.value)
    }
    
    const handleDireccion = (e) => {
        setDireccion(e.target.value)
    }

    const deleteComedor = () => {
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/dinners/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                props.handleCloseModal()

                //Mandar a pagina home
            })
    }

    const updateComedor = () => {
        
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/dinners/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nombre,
                address: direccion,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                
                const updatedDinner= {
                   
                        id: res.updatedDinner._id,
                        nombre: res.updatedDinner.name,
                        direccion: res.updatedDinner.address,
                        latitud: res.updatedDinner.coordinates.lat,
                        longitud: res.updatedDinner.coordinates.lng,
                
                    
                }
               
                if(res.updatedDinner._id != null){
                     dispatch({ type: "UPDATE", payload:updatedDinner})
                     props.handleCloseModal()
                 }
                 else{
                     console.log("no se pudo actualizar")
                 }
                
            })
    }


    return (
        <Modal open={props.open} onClose={props.handleCloseModal} >

            <div className="modal-container" style={{ width: '70%',height:'60%'}}>
                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                           Editar Comedor
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Nombre del comedor" onChange={handleNombre}></TextField>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Direccion" onChange={handleDireccion}></TextField>
                    </Grid>
                    </div>
                    <div>
                    <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained" onClick={props.handleCloseModal}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained" onClick={updateComedor}>Guardar</Button>
                    </Grid>
                    <Grid  item xs={4}style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={deleteComedor} variant="contained">Eliminar Comedor</Button>
                    </Grid>
                    </Grid>
               
                </div>
             
            </div>




        </Modal>
    )
}