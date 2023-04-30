import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const mdTheme = createTheme();
export default function EncuestaGuardadaSuccess(props) {
  const [timer, setTimer] = useState(5);
  console.log("Entre")

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      window.location.href = "/comedor"
    }
  }, [timer]);


  return (
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
            <Grid container spacing={1} >
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>

                  <Grid container spacing={2} >
                    <Grid item xs={12} md={12} lg={12}>
                      <div className="carousel-item" style={{ paddingTop: '20px' }}>
                        <Grid container spacing={2} justify="center" alignItems="center">
                          <Grid item xs={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ textAlign: 'center', color: '#8d75c6', fontWeight: 'bold' }}>
                              Encuesta {props.caso} con éxito!
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ textAlign: 'center', color: '#8d75c6' }}>
                              Redirigiéndolo en {timer} segundos...
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h6" id="tableTitle" component="div" style={{ textAlign: 'center', color: '#8d75c6' }}>
                              Si no se redirige automáticamente, haga clic <a href="/comedor" style={{ color: '#8d75c6' }}>aquí</a>
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>

                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

  );
};

