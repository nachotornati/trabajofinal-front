import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from "react";
import { ComedorContext } from "../Context/ComedorContext";

const mdTheme = createTheme();

export default function ComedorItem(props) {
    
    
    const { dispatch } = useContext(ComedorContext);
    const handleComedorDetailed = () => {
        const dinner = {
            id: props.id,
            nombre: props.nombre,
            direccion: props.direccion,
            latitud: props.coordinates.lat,
            longitud: props.coordinates.lng,
        }
        
        if(props.id != null){
            dispatch({ type: "SET", payload: dinner })
            window.location.href = "/comedor"
        }

    }
    

    return (

        <Grid container spacing={0} sx={{mb: 1}}>
            <Grid item xs={8} lg={8} md={8}>


                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        width: '100%',
                        backgroundColor: '#a4c4be',
                    }}
                >


                </Paper>
            </Grid>

            <Grid item xs={4} lg={4} md={4}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        width: '100%',
                    }}
                >
                    <Grid item xs sx={{ textAlign: 'center' }}>
                        <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                            {props.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs sx={{ textAlign: 'center' }}>
                        <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                            {props.direccion}
                        </Typography>
                    </Grid>

                    <Grid item xs sx={{ textAlign: 'center' }}>

                        <Button onClick={handleComedorDetailed} >Ver mas</Button>

                    </Grid>





                </Paper>
            </Grid>





        </Grid>
    )
}