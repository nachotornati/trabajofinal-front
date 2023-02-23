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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ComedorForm from './ComedorForm';
import EncuestaItem from './EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material'; 

const mdTheme = createTheme();

export default function NuevoComedor(props) {
    return(

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
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Nuevo Comedor
                                </Typography>

                              
                             
                             </Paper>         
                        </Grid>
                       <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
                       <Paper sx={{ p: 2,width:'75%'}}>
                                <ComedorForm/>
                        </Paper>
                       </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    </ThemeProvider>


    );

}