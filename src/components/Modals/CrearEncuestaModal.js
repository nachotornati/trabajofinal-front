import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import {
    Button,
 
} from '@material-ui/core';
import { useState } from 'react';
import {Link} from '@material-ui/core';
import "../../assets/scss/modal.scss";

export default function CrearEncuestaModal(props) {

const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
const [selectedValues, setSelectedValues] = useState([]);

const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };
const cancelChanges = () => {
    props.handleCloseModal()
}

return(
<Modal open={props.open} onClose={props.handleCloseModal}>
<div className="modal-container">
    <h2>Crear nueva encuesta</h2>
    <div className="modal-content">
        
        <FormControl style={{ width: '75%' }}>
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
    <div className="modal-actions">
        <Button onClick={props.handleCloseModal}>Cancelar</Button>
        <Button onClick={ () => window.location.href=`/comedor/${props.id}/nueva-encuesta`}>Siguiente</Button>

    </div>
</div>
</Modal>
)

}