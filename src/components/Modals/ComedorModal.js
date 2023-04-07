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
import EncuestaItem from '../EncuestaItem';
import { TableContainer, TablePagination } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const mdTheme = createTheme();

export default function NuevoComedor(props) {
    console.log(props)

    const cancelChanges = () => {
        props.handleCloseModal()
    }
    return (
        <Modal open={props.open} onClose={props.handleCloseModal} >

            <div className="modal-container" style={{ width: '70%',height:'60%'}}>
                <div className="modal-content">
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                           Editar Comedor
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Nombre del comedor"></TextField>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <TextField label="Direccion"></TextField>
                    </Grid>
                    </div>
                    <div>
                    <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained" onClick={props.handleCloseModal}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <Button variant="contained">Guardar</Button>
                    </Grid>
                    <Grid  item xs={4}style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained">Eliminar Comedor</Button>
                    </Grid>
                    </Grid>
               
                </div>
             
            </div>




        </Modal>
    )
}