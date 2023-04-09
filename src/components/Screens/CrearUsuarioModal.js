import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import {
    Button,

} from '@material-ui/core';
import { useState } from 'react';
import { TextField } from '@mui/material';
import {Grid} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import { Link } from '@material-ui/core';
import "../../assets/scss/modal.scss";

export default function CrearUsuarioModal(props) {

    console.log(props.user)
    const [name, setName] = useState(props.modalFlag ? props?.user?.first_name : "");
    const [lastname, setLastName] = useState(props.modalFlag ? props?.user?.last_name : "");
    const [userName, setUserName] = useState(props.modalFlag ? props?.user?.username : "");
    const [email, setEmail] = useState(props.modalFlag ? props?.user?.email : "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedValues, setSelectedValues] = useState(props.modalFlag ? props?.user?.roles : []);

    console.log(props)

    const handleChange = (event) => {
        setSelectedValues(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    const editUser = () => {
        // Send PUT request to update user info in the backend
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const updatedUser = {
            first_name: name,
            last_name: lastname,
            username: userName,
            email: email,
            password: password,
            roles: selectedValues,
        };



        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/auth/users/${props.user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Update the user's information in the state
                props.handleEditUserModal(data)
                // const updatedUsers = users.map(u => u.id === data.id ? data : u);
                // setUsers(updatedUsers);
                // props.handleCloseModal();
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
        //Chequear esto

        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedValues([]);
        props.handleCloseModal()
    };

    const cancelChanges = () => {
        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedValues([]);
        props.handleCloseModal()
    }

      // Función para crear un nuevo usuario
    const createUser = (userData) => {
        // Lógica para crear un nuevo usuario en la base de datos o API
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const newUser = {
            first_name: name,
            last_name: lastname,
            username: userName,
            email: email,
            password: password,
            roles: selectedValues
        }
        console.log(newUser)

        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)




        })

        console.log("Usuario creado correctamente")
        props.updateUsers()
        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedValues([]);
        props.handleCloseModal()

    }
    return (
        <Modal open={props.open} onClose={props.handleCloseModal}>
            <div className="modal-container">

                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Crear Usuario
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>

                    <TextField label="Nombre" value={name} onChange={handleNameChange} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Apellido" value={lastname} onChange={handleLastNameChange} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Nombre de Usuario" value={userName} onChange={handleUserNameChange} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Dirección de correo electrónico" value={email} onChange={handleEmailChange} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Contraseña" value={password} type="password" onChange={handlePasswordChange} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Confirmar contraseña" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <FormControl style={{ width: '75%' }}>
                            <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                multiple
                                value={selectedValues}
                                onChange={handleChange}
                                label="Option"


                            >
                                <MenuItem value={"admin"}>{"Admin"}</MenuItem>
                                <MenuItem value={"user"}>{"User"}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </div>
                <div className="modal-actions">
                <Button onClick={ () => {cancelChanges()}  }>Cancelar</Button>
                        {props.modalFlag ?
                            (<Button onClick={()=> {editUser()}}>Editar</Button>) : (
                                <Button onClick={() => {createUser()}}>Guardar</Button>)
                        }
                </div>
            </div>
        </Modal>
    )

}