import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
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
import "../assets/scss/modal.scss"
const mdTheme = createTheme();

export default function Gestion(props) {
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




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value)
        filtrar(event.target.value)
    }

    const filtrar =(terminoBusqueda)=>{
        var resultadoTablaBusqueda = tableUsers.filter((elemento)=>{
            
            if(elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ||elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ){
                return elemento
            }
        })
        setUsers(resultadoTablaBusqueda)
    }


    // Función para actualizar la contraseña del usuario seleccionado
    const updatePassword = (newPassword) => {
        // Lógica para actualizar la contraseña del usuario en la base de datos o API
        setPasswordDialogOpen(false);
    }

    // Función para eliminar el usuario seleccionado
    const deleteUser = () => {
        // Lógica para eliminar el usuario de la base de datos o API
        setSelectedUser(null);
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
        setUsers([...users, newUser])
        setName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSelectedValues([]);
        setCreateUserDialogOpen(false);
        
    }
    const handleEditUser = (user) => {
        console.log("entre")
        setModalFlag(true)
        setSelectedUser(user)
        console.log(selectedUser)
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
        console.log(updatedUser)
        console.log(selectedUser.id)
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/auth/users/${selectedUser.id}`, {
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
            const updatedUsers = users.map((u) => (u.id === data.id ? data : u));
            setUsers(updatedUsers);
            setSelectedUser(null);
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
          setCreateUserDialogOpen(false);
      };



    const getUsuarios = async () => {
        await fetch('https://trabajo-final-backend-7ezk.onrender.com/api/auth/users', {
            headers: {
                'Content-Type': 'application/json',
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

    const handleDeleteUser = (user) => {
        setSelectedUser(user)
        fetch(`https://trabajo-final-backend-7ezk.onrender.com/api/auth/users/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
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
                                
                                
                                <Grid container spacing={0} justifyContent="flex-end">
                                    <Grid item xs={8} md={8} lg={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <TextField value={busqueda} placeholder="Busqueda por usuario o mail" style={{ marginRight: '8px', width: '100%' }} onChange={handleChangeBusqueda} />
                                        <Button><PersonSearchIcon /></Button>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4} style={{justifyContent:'right',display:'flex'}}>

                                    <Button sx={{ backgroundColor: '#8d75c6' }} variant="contained" style={{ width: '100%', height: '100%' }} onClick={() => setCreateUserDialogOpen(true)}    > <PersonAddIcon  /></Button>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nombre</TableCell>
                                                    <TableCell>Apellido</TableCell>
                                                    <TableCell>Usuario</TableCell>
                                                    <TableCell>Dirección de correo electrónico</TableCell>
                                                    <TableCell >Acciones</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                { users && users.map((user) =>(
                                                <TableRow key={user.id}>
                                                    <TableCell>{user.first_name}</TableCell>
                                                    <TableCell>{user.last_name}</TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>
                                                        {/* onClick={() => setSelectedUser(user)}*/}
                                                        <IconButton onClick={()=> handleEditUser(user)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={()=> handleDeleteUser(user) } >
                                                            <DeleteIcon />
                                                        </IconButton>
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
                                        count={3}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>

            {/* Diálogo para crear usuario */}
            <Modal open={createUserDialogOpen} onClose={() => setCreateUserDialogOpen(false)}>
                <div className="modal-container">
                    <h2>Crear nuevo usuario</h2>
                    <div className="modal-content">
                        <TextField label="Nombre" value={name || ""} onChange={handleNameChange} />
                        <TextField label="Apellido" value={lastname || ""} onChange={handleLastNameChange} />
                        <TextField label="Nombre de Usuario" value={userName || ""} onChange={handleUserNameChange} />
                        <TextField label="Dirección de correo electrónico" value={email || ""} onChange={handleEmailChange} />
                        <TextField label="Contraseña" value={password || ""} type="password" onChange={handlePasswordChange} />
                        <TextField label="Confirmar contraseña" type="password" value={confirmPassword || ""} onChange={handleConfirmPasswordChange} />
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
                                <MenuItem value={"admin"}>{"Admin"}</MenuItem>
                                <MenuItem value={"user"}>{"User"}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="modal-actions">
                        <Button onClick={() => setCreateUserDialogOpen(false)}>Cancelar</Button>
                        {modalFlag ? 
                        (<Button onClick={()=> editUser()}>Editar</Button> ):( 
                            <Button onClick={() => createUser()}>Guardar</Button>)
}
                    </div>
                </div>
            </Modal>
        </>
       
    );
}


