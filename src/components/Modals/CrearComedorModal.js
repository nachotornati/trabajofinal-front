import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { TextField } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import "../../assets/scss/modal.scss";



export default function CrearComedorModal(props) {

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const {currentUser} = useContext(AuthContext)

    const handleComedorName = (value) => {
        setNombre(value)
    }
    const handleComedorDireccion = (value) => {
        setDireccion(value)
    }


  

    const crearComedor = () => {

        if (nombre === '' || direccion === '') {
            props.completeFieldMessage()

        }
        else {
            setIsSaving(true)
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

                    props.handleCloseModal()
                    props.updateComedores()
                    props.successMessage()
                    
                    //Llamar funcion para recargar comedores
                })
                .catch((err) => {
                    console.log(err.message);
                })
                .finally(() => {
                    setIsSaving(false)
                }
                );
            
            }   
        }




        return (
            <Modal open={props.open} onClose={props.handleCloseModal} >

                <div className="modal-c-container">
                    <div className="modal-content">
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom  style={{marginBottom: '20px'}}>
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
                                <Button variant="contained" style={{backgroundColor:'#8d75c6'}}onClick={crearComedor} disabled={isSaving} >Guardar</Button>
                            </Grid>

                        </Grid>

                    </div>
                
                </div>




            </Modal>
        )
    }