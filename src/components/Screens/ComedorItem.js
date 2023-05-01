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

        if (props.id != null) {
            dispatch({ type: "SET", payload: dinner })
            window.location.href = "/comedor"
        }

    }


    return (

        <Grid container spacing={0} sx={{ mb: 1 }}>
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
  <Typography
    component="h1"
    variant="h4"
    sx={{
      color: '#8d75c6',
      fontWeight: 'bold',
      fontSize: {
        xs: '24px',
        sm: '36px',
        md: '40px',
        lg: '40px',
      },
      textTransform: 'uppercase',
      marginBottom: '20px',
    }}
  >
    {props.nombre}
  </Typography>
</Grid>

<Grid item xs sx={{ textAlign: 'center' }}>
  <Button
    onClick={handleComedorDetailed}
    variant="outlined"
    sx={{
      color: '#8d75c6',
      borderColor: '#8d75c6',
      textTransform: 'uppercase',
      fontSize: {
        xs: '14px',
        sm: '20px',
        md: '22px',
        lg: '22px',
      },
      '&:hover': {
        backgroundColor: '#8d75c6',
        color: '#fff',
      },
    }}
  >
    Ver más
  </Button>
</Grid>
                </Paper>
            </Grid>




        </Grid>
    )
}