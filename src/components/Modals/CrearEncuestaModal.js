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
            <div className="modal-container">

                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Seleccione el tipo de encuesta
                        </Typography>
                    </Grid>

                    
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            multiple
                            value={selectedValues || []}
                            onChange={handleChange}
                            label="Option"


                        >
                            {props.tipos.map((option) => (
                                <MenuItem value={option}>{option}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Button variant="contained" onClick={props.handleCloseModal}>Cancelar</Button>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Button variant="contained" onClick={() => window.location.href = `/comedor/nueva-encuesta`}>Siguiente</Button>

                        </Grid>

                    </Grid>

                </div>


            </div>
        </Modal>
    )

}