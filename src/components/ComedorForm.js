import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EncuestaItem from './EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';

const mdTheme = createTheme();

export default function NuevoComedor(props) {
    return (
        <Grid container spacing={2} >
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Nuevo Comedor
            </Typography>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <TextField label="Nombre del comedor"></TextField>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <TextField label="Direccion"></TextField>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Button variant="contained">Cancelar</Button>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Button variant="contained">Guardar</Button>
        </Grid>
        
        </Grid>
    )
}