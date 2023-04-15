import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { ComedorContext } from '../Context/ComedorContext';
import { useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import CustomAlert from '../Screens/CustomAlert';

const mdTheme = createTheme();

export default function EditarComedorModal(props) {
    
    console.log("entre",props)
    const { dispatch } = useContext(ComedorContext);
    const { currentDinner } = useContext(ComedorContext);

    const cancelChanges = () => {
        props.handleCloseModal()
    }
    const {currentUser} = useContext(AuthContext);
    const [nombre, setNombre] = useState( currentDinner.nombre || '')
    const [direccion, setDireccion] = useState(currentDinner.direccion || '')
    const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = useState(false);
    const showCompleteAllFieldError = () => {
        setopenCompleteAllFieldsError(true);
    };

    const closeCompleteAllFieldError = (event, reason) => {
        setopenCompleteAllFieldsError(false);
    };
    const handleNombre = (e) => {
        setNombre(e.target.value)
    }
    
    const handleDireccion = (e) => {
        setDireccion(e.target.value)
    }

    const updateComedor = () => {
        
        if(nombre === '' || direccion === ''){
            showCompleteAllFieldError()
        }
        else{
        
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/dinners/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
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
                     props.successMessage()
                 }
                 else{
                     console.log("no se pudo actualizar")
                 }
                
            })
        }
    }


    return (
        <Modal open={props.open} onClose={props.handleCloseModal} >

            <div className="modal-container" >
                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                           Editar Comedor
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Nombre del comedor" defaultValue={nombre}onChange={handleNombre}></TextField>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Direccion" defaultValue={direccion} onChange={handleDireccion}></TextField>
                    </Grid>
                    </div>
                    <div style={{marginTop:'20px'}}>
                    <Grid container spacing={2}>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained"  style={{backgroundColor:'#8d75c6'}}onClick={props.handleCloseModal}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained" style={{backgroundColor:'#8d75c6'}}onClick={updateComedor}>Guardar</Button>
                    </Grid>
                    
                    </Grid>

                    
                </div>
               
                <CustomAlert text={"Completa todos los campos!"} severity={"error"} open={openCompleteAllFieldMessage} closeAction={closeCompleteAllFieldError} />

            </div>



            
        </Modal>
    )
}