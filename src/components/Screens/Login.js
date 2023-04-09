
import { Link } from "react-router-dom";
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



export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [openVerifyEmailMessage, setopenVerifyEmailMessage] = React.useState(false);
    //const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = React.useState(false);
    //const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);
    //const [openInvalidUserError, setopenInvalidUserError] = React.useState(false);
    //const [loading, setLoading] = React.useState(false);
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
                .then((response) => response.json())
                .then((res) => {
                    console.log(res)
                    const user = {
                        username: res.username,
                        id: res.id,
                        roles: res.roles,
                        accessToken: res.accessToken,
                    }
                    if (res.accessToken != null) {
                        dispatch({ type: "LOGIN", payload: user })
                        window.location.href = "/home"
                    }
                    else {
                        alert("Usuario o contraseña incorrectos")
                    }

                })
                // .then((response) => {

                //     //console.log(response.json())
                //     let res = response.json()
                //     console.log(res)
                //     const user = {
                //          username: res.username,
                //          roles: res.roles,
                //          accessToken: res.accessToken,
                //      }

                //     console.log(user)
                //     if (response.status === 200) {
                //         dispatch({ type: "LOGIN", payload: user })
                //         //window.location.href = "/home"

                //     }   
                //     else {
                //         //showVerifyEmailMessage()
                //     }
                // })
                // .then((userCredential) => {
                //     console.log(userCredential)

                //     if (userCredential.status === 200) {
                //         dispatch({ type: "LOGIN", payload: {} })
                //         //window.location.href = "/home"
                //     }
                //     else {
                //         //showVerifyEmailMessage()
                //     }

                //     setLoading(false)   

                // })
                .catch((error) => {

                    if (error.code === 'auth/invalid-email') {
                        //showInvalidEmailError()
                    }
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        //showInvalidUserError()
                    }
                    setLoading(false)

                });

        }
    }


    return (
        <div className="row g-0 auth-wrapper landing-page">

            <NavigatorWithButton />
            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <img
                            src="/fundacion-si-manuel-lozano (1).png"
                            //className="d-inline-block align-top logo"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: 70, height: 70 }}
                        />

                        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>Ingresa a tu cuenta</p>
                        <div className="auth-form-container text-start">
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
                                    alignItems: "center"
                                }}
                            >

                                <div>
                                    <TextField
                                        label="Usuario"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                    />
                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
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
                                </div>

                                {/* <div>
                                    <TextField label="Correo electronico" color="primary" style={{ width: "100%"}} className={classes.root} onChange={(e) => { setEmail(e.target.value) }}/>
                                </div>
                                <div>

                                    <FormControl fullWidth className={classes.root}  >
                            <InputLabel style={{color:'black'}}>Contraseña</InputLabel>
                            <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    style={{color:'black'}}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    
                                />
                            </FormControl>
                                </div> */}

                                <div className="text-center">
                                    

                                        <Button
                                            
                                            onClick={handleLogin}
                                           
                                            variant="contained"
                                        >
                                            Iniciar Sesión
                                        </Button>
                                   
                                </div>

                            </Box>

                        </div>
                    </div>
                </div>
            </div>
            <CustomAlert text={"Completa todos los campos!"} severity={"error"} open={openCompleteAllFieldMessage} closeAction={closeCompleteAllFieldError} />
            <CustomAlert text={"Usuario o contraseña incorrectos!"} severity={"error"} open={openInvalidUserError} closeAction={closeInvalidUserError} />
        </div>
    )



}
