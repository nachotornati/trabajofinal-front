import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import {
    Button,

} from '@material-ui/core';
import { useState } from 'react';
import "../../assets/scss/modal.scss";
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export default function CrearEncuestaModal(props) {

    const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
    };
    const cancelChanges = () => {
        props.handleCloseModal()
        
    }

    return (
        <Modal open={props.open} onClose={props.handleCloseModal}>
            <div className="modal-c-container">

                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6"  style={{color:'#8d75c6',whiteSpace: 'pre-wrap', textAlign: 'center'}}gutterBottom>
                            Seleccione el tipo de encuesta
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{display:'flex', justifyContent:'center', height:'100%'}}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedValues || []}
                            onChange={handleChange}
                            label="Option"


                        >
                            {props?.tipos.map((option) => (
                                <MenuItem value={option.id}>{option.type}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>
                    </Grid>
                </div>

                <div>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Button variant="contained" style={{backgroundColor:'#8d75c6',color:'white',marginRight:"8px"}}onClick={props.handleCloseModal}>Cancelar</Button>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Button variant="contained" style={{backgroundColor:'#8d75c6',color:'white',marginLeft:'8px'}}onClick={() => window.location.href = `/comedor/nueva-encuesta/${selectedValues}`}>Siguiente</Button>

                        </Grid>

                    </Grid>

                </div>


            </div>
        </Modal>
    )

}