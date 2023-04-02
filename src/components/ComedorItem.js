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
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const mdTheme = createTheme();

export default function ComedorItem(props) {
    
    console.log("id",props.id)
   
    return (

        <Grid container spacing={0}>
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
                        
                    <Button component={Link} to={`/comedor/${props.id}`}><InfoIcon sx={{color:'#8d75c6',fontSize: 40} }/></Button>
                        
                    </Grid>
                    
                        
                    


                </Paper>
            </Grid>

            



        </Grid>
    )
}