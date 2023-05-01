import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { TableCell } from '@mui/material';
import { TableContainer, TablePagination } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CustomAlert from './CustomAlert';



const mdTheme = createTheme();
const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-input': {
            padding: 0,
        },
    },
});

export default function Gestion(props) {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [tableUsers, setTableUsers] = useState([]);
    const [busqueda, setBusqueda] = useState("")
    const [selectedUser, setSelectedUser] = useState(null);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
    const [searchUserModalOpen, setSearchUserModalOpen] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedValues, setSelectedValues] = useState([]);
    const [modalFlag, setModalFlag] = useState(false);


    const handleChange = (event) => {
        setSelectedValues([event.target.value]);
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




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [openSuccessfulRegister, setOpenSuccessfulRegister] = useState(false);

    const showSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(true);
    };

    const closeSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(false);
    };

    const [openSuccessfulEdit, setOpenSuccessfulEdit] = useState(false);
    const showSuccessfulEditUser = (event, reason) => {
        setOpenSuccessfulEdit(true);
    };
    const closeSuccessfulEditUser = (event, reason) => {
        setOpenSuccessfulEdit(false);
    };

    const [openSuccessfulDelete, setOpenSuccessfulDelete] = useState(false);
    const showSuccessfulDeleteUser = (event, reason) => {
        setOpenSuccessfulDelete(true);
    };
    const closeSuccessfulDeleteUser = (event, reason) => {
        setOpenSuccessfulDelete(false);
    };
    const [openInvalidMail, setOpenInvalidMail] = useState(false);
    const showInvalidMail = (event, reason) => {
        setOpenInvalidMail(true);
    };
    const closeInvalidMail = (event, reason) => {
        setOpenInvalidMail(false);
    };

    const [openUnmatchingPasswords, setOpenUnmatchingPasswords] = useState(false);
    const showUnmatchingPasswords = (event, reason) => {
        setOpenUnmatchingPasswords(true);
    };
    const closeUnmatchingPasswords = (event, reason) => {
        setOpenUnmatchingPasswords(false);
    };
    const [openInvalidPassword, setOpenInvalidPassword] = useState(false);
    const showInvalidPassword = (event, reason) => {
        setOpenInvalidPassword(true);
    };
    const closeInvalidPassword = (event, reason) => {
        setOpenInvalidPassword(false);
    };

    const [openRequiredFields, setOpenRequiredFields] = useState(false);
    const showRequiredFields = (event, reason) => {
        setOpenRequiredFields(true);
    };
    const closeRequiredFields = (event, reason) => {
        setOpenRequiredFields(false);
    };

    const [openCreationError, setOpenCreationError] = useState(false);
    const showCreationError = (event, reason) => {
        setOpenCreationError(true);
    };
    const closeCreationError = (event, reason) => {
        setOpenCreationError(false);
    };

    //Ver por que no se actualiza al toque
    useEffect(() => {
        getUsuarios();
    }, []);

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value)
        filtrar(event.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        var resultadoTablaBusqueda = tableUsers.filter((elemento) => {

            if (elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setUsers(resultadoTablaBusqueda)
    }



    // Función para crear un nuevo usuario
    const createUser = (userData) => {
        if (!name || !lastname || !userName || !email || !password || !confirmPassword || selectedValues.length === 0) {
            showRequiredFields()
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            showUnmatchingPasswords()
            return;
        }

        // Validar formato del email con una expresión regular
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            showInvalidMail()
            return;
        }

        // Validar que la contraseña tenga al menos 8 caracteres
        if (password.length < 8) {
            showInvalidPassword()
            return;
        }

        // Lógica para crear un nuevo usuario en la base de datos o API
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
                'x-access-token': currentUser.accessToken
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "User was registered successfully!") {
                    showSuccessfulRegister()
                    getUsuarios()
                }
                else {
                    showCreationError()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        //console.log("Usuario creado correctamente")
        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedValues([]);
        handleCloseModal()

    }
    const handleEditUser = (user) => {

        setModalFlag(true)
        setSelectedUser(user)
        setName(user.first_name);
        setLastName(user.last_name);
        setUserName(user.username);
        setEmail(user.email);
        setPassword(user.password);
        setConfirmPassword(user.password);
        setSelectedValues(user.roles);
        setCreateUserDialogOpen(true);

    }
    const editUser = () => {
        // Send PUT request to update user info in the backend
        if (password !== confirmPassword) {
            showUnmatchingPasswords()
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



        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/auth/users/${selectedUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'x-access-token': currentUser.accessToken
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message === "User was updated successfully!") {
                    handleCloseModal()
                    showSuccessfulEditUser()
                    getUsuarios()

                }
                else {
                    showCreationError()
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });


        


    };



    const getUsuarios = async () => {
        await fetch('https://trabajo-final-backend-7ezk.onrender.com/api/auth/users', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            }
        })
            .then((response) => response.json())
            .then((res) => {
                setUsers(res);
                setTableUsers(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleCloseModal = () => {
        setSelectedUser(null);
        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedValues([]);
        setCreateUserDialogOpen(false)
        setModalFlag(false)

    }

    const handleDeleteUser = (user) => {
        const confirmSubmit = window.confirm('¿Está seguro que desea eliminar el usuario?');
        if (confirmSubmit) {
            deleteUser(user)


        }

    }

    const deleteUser = (user) => {
        setSelectedUser(user)
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/auth/users/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': currentUser.accessToken
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                showSuccessfulDeleteUser()
                return response.json();

            }
            )
            .then((data) => {
                // Update the user's information in the state
                const updatedUsers = users.filter((u) => u.id !== user.id);
                setUsers(updatedUsers);
                setSelectedUser(null);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            }
            );

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
                                    <Paper sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%'
                                    }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <TextField
                                                    value={busqueda}
                                                    placeholder="Busqueda por nombre de usuario o mail"
                                                    style={{ marginRight: '8px', width: '100%' }}
                                                    onChange={handleChangeBusqueda}

                                                />

                                            </Grid>
                                            <Grid item xs={6} md={6} lg={6} >
                                                <Button
                                                    sx={{ backgroundColor: '#8d75c6', padding: 0 }}
                                                    variant="contained"
                                                    style={{ width: '100%', height: '100%' }}
                                                    onClick={() => setCreateUserDialogOpen(true)}
                                                >
                                                    <PersonAddIcon style={{ fontSize: 40 }} />
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell style={{ textAlign: 'center', color: '#8d75c6' }}>Nombre</TableCell>
                                                                <TableCell style={{ textAlign: 'center', color: '#8d75c6' }} >Apellido</TableCell>
                                                                <TableCell style={{ textAlign: 'center', color: '#8d75c6' }} >Usuario</TableCell>
                                                                <TableCell style={{ textAlign: 'center', color: '#8d75c6' }}>Dirección de correo electrónico</TableCell>
                                                                <TableCell style={{ textAlign: 'center', color: '#8d75c6' }}>Acciones</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {users && users
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((user) => (
                                                                    <TableRow key={user.id}>
                                                                        <TableCell style={{ textAlign: 'center' }} >{user.first_name}</TableCell>
                                                                        <TableCell style={{ textAlign: 'center' }}>{user.last_name}</TableCell>
                                                                        <TableCell style={{ textAlign: 'center' }}>{user.username}</TableCell>
                                                                        <TableCell style={{ textAlign: 'center' }}>{user.email}</TableCell>
                                                                        <TableCell style={{ textAlign: 'center' }}>
                                                                            {/* onClick={() => setSelectedUser(user)}*/}
                                                                            <Button onClick={() => handleEditUser(user)}>
                                                                                <EditIcon sx={{ color: '#8d75c6' }} />
                                                                            </Button>
                                                                            <Button onClick={() => handleDeleteUser(user)} >
                                                                                <DeleteIcon sx={{ color: '#8d75c6' }} />
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
                                                    count={users.length}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    rowsPerPage={rowsPerPage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <CustomAlert text={"Usuario eliminado exitosamente!"} severity={"success"} open={openSuccessfulDelete} closeAction={closeSuccessfulDeleteUser} />
                    <CustomAlert text={"Usuario creado exitosamente!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />
                    <CustomAlert text={"Datos acutalizados exitosamente!"} severity={"success"} open={openSuccessfulEdit} closeAction={closeSuccessfulEditUser} />
                    <CustomAlert text={"Completa todos los campos requeridos!"} severity={"error"} open={openRequiredFields} closeAction={closeRequiredFields} />
                    <CustomAlert text={"Las contraseñas no coinciden!"} severity={"error"} open={openUnmatchingPasswords} closeAction={closeUnmatchingPasswords} />
                    <CustomAlert text={"Ingresa un mail valido!"} severity={"error"} open={openInvalidMail} closeAction={closeInvalidMail} />
                    <CustomAlert text={"La contraseña debe tener al menos 8 caracteres!"} severity={"error"} open={openInvalidPassword} closeAction={closeInvalidPassword} />
                    <CustomAlert text={"Error en la creacion del usuario!"} severity={"error"} open={openCreationError} closeAction={closeCreationError} />

                </Box>
            </ThemeProvider>

            {/* Diálogo para crear usuario */}
            <Modal open={createUserDialogOpen} onClose={handleCloseModal}>

                <div className="modal-u-container">
                    <div className="modal-content"  >
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                                {modalFlag ? "Editar Usuario" : "Crear Usuario"}
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{"Seleccione una opcion"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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

                    <div style={{ marginTop: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                                <Button variant="contained" style={{ backgroundColor: '#8d75c6' }} onClick={() => handleCloseModal()}>Cancelar</Button>
                            </Grid>
                            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                                {modalFlag ?
                                    (<Button variant='contained' style={{ backgroundColor: '#8d75c6' }} onClick={() => editUser()} sx={{ ml: 2 }}>Editar</Button>) : (
                                        <Button variant="contained" style={{ backgroundColor: '#8d75c6' }} onClick={() => createUser()} sx={{ ml: 2 }}>Guardar</Button>)
                                }
                            </Grid>
                        </Grid>
                    </div>

                </div>

            </Modal>
        </>

    );
}


