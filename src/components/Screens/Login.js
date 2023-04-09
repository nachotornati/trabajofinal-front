
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from "react";
import NavigatorWithButton from "../NavigatorWithButton";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import CustomAlert from './CustomAlert'
import { Grid } from "@material-ui/core";
import { FormLabel } from '@mui/material';



export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);
    const [openInvalidUserError, setopenInvalidUserError] = React.useState(false);

    const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = React.useState(false);
    const showCompleteAllFieldError = () => {
        setopenCompleteAllFieldsError(true);
    };

    const closeCompleteAllFieldError = (event, reason) => {
        setopenCompleteAllFieldsError(false);
    };

    const showInvalidEmailError = () => {
        setopenInvalidEmailError(true);
    };

    const closeInvalidEmailError = (event, reason) => {
        setopenInvalidEmailError(false);
    };

    const showInvalidUserError = () => {
        setopenInvalidUserError(true);
    };

    const closeInvalidUserError = (event, reason) => {
        setopenInvalidUserError(false);
    };

    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true);
        if (username === '' || password === '') {
            showCompleteAllFieldError()

        }
        else {

            fetch('https://trabajo-final-backend-7ezk.onrender.com/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password


                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    if (response.status === 404 || response.status === 401) {
                        showInvalidUserError()
                    }
                })
                .then((res) => {
                   
                    if (typeof res !== "undefined") {
                        const user = {
                            username: res.username,
                            id: res.id,
                            roles: res.roles,
                            accessToken: res.accessToken,
                        }

                        dispatch({ type: "LOGIN", payload: user })
                        window.location.href = "/home"


                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }


    return (
        <div>

            <NavigatorWithButton />
            <Grid container justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
                <Grid item xs={12} sm={8} md={6} lg={4} style={{ display: "flex", justifyContent: "center" }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/fundacion-si-manuel-lozano (1).png"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: 70, height: 70 }}
                        />

                        <FormLabel style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }} >Ingresa a tu cuenta</FormLabel>

                        <TextField
                            label="Usuario"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '100%' }}
                            onChange={(e) => { setUsername(e.target.value) }}
                            style={{ marginTop: '10px' }}
                        />

                        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: 'black' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button style={{ marginTop: '20px', backgroundColor: '#8d75c6' }} onClick={handleLogin} variant="contained">Iniciar Sesión</Button>
                    </Box>
                </Grid>
            </Grid>

            <CustomAlert text={"Completa todos los campos!"} severity={"error"} open={openCompleteAllFieldMessage} closeAction={closeCompleteAllFieldError} />
            <CustomAlert text={"Usuario o contraseña incorrectos!"} severity={"error"} open={openInvalidUserError} closeAction={closeInvalidUserError} />
        </div>
    )



}
