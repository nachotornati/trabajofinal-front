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
import InfoIcon from '@mui/icons-material/Info';

const mdTheme = createTheme();

export default function ComedorItem(props) {


    return (

        <Grid container spacing={1}>

            <Button style={{ width: '100%' }} onClick={() => window.location.href = "/comedor"}>
            <Grid item xs={8} lg={8} md={8}>
                        
                        
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        width: '100%',
                        backgroundColor:'#a4c4be'
                    }}
                >

                    
                </Paper>
            </Grid>
            
            <Grid item xs={6} lg={6} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        width: '100%',
                    }}
                >
                    <Grid item xs>
                        <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                            Comedor 1
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography component="h2" variant="h6" color="#8d75c6" gutterBottom>
                            Direccion : Oro Negro 93
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={ 12} style={{display:'flex',justifyContent:'center'}}>
                        <Button><InfoIcon sx={{color:'#8d75c6',fontSize: 40} }/></Button>
                    </Grid>
                    
                        
                    


                </Paper>
            </Grid>

            </Button>



        </Grid>
    )
}