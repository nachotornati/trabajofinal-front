
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import NavigatorWithButton from "./NavigatorWithButton";


export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [openVerifyEmailMessage, setopenVerifyEmailMessage] = React.useState(false);
    //const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = React.useState(false);
    //const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);
    //const [openInvalidUserError, setopenInvalidUserError] = React.useState(false);
    //const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);

    

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div className="row g-0 auth-wrapper landing-page">

            <NavigatorWithButton/>
            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <img
                            src="/fundacion-si-manuel-lozano (1).png"
                            //className="d-inline-block align-top logo"
                            style={{display:'flex',justifyContent:'center',alignItems:'center', margin:'auto',width:70,height:70}}
                        />
                        
                        <p style={{display:'flex',justifyContent:'center',alignItems:'center', margin:'auto'}}>Ingresa a tu cuenta</p>
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
                                        label="Correo Electrónico"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        onChange={(e) => { setEmail(e.target.value) }}
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
                                                        sx={{ color: 'white' }}
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
                                    <ThemeProvider >

                                        {/* <LoadingButton
                                            size="medium"
                                            onClick={handleLogin}
                                            loading={loading}
                                            variant="contained"
                                        >
                                            Iniciar Sesión
                                        </LoadingButton> */}
                                    </ThemeProvider>
                                </div>

                            </Box>
                            
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center', margin:'auto'}}><Link style={{ color: '#5cb377' }} className="text-link" to="/forgotPassword">Olvide mi contraseña </Link></div>
                        </div>
                    </div>
                </div>
            </div>
 
        </div>
    )



}
