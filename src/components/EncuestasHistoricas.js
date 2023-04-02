import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import PollIcon from '@mui/icons-material/Poll';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ComedorItem from './ComedorItem';
import { TableCell, TableContainer, TablePagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const mdTheme = createTheme();
export default function EncuestasHistoricas(props) {

    const { id } = useParams();// uso el id para buscar las encuestas del comedor
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [comedores, setComedores]= React.useState()
  
    
    
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getEncuestas = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/dinners', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setComedores(res.dinners)
                
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {
        //getEncuestas()
    }, [])

    return (
        <>
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
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="div" gutterBottom>
                                        Encuestas Históricas del comedor Tengo Hambre
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Fecha</TableCell>
                                                    <TableCell>Tipo</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                    
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {/* {comedores?.map((comedor) => (
                                                    <ComedorItem key={comedor.id} id={comedor._id} direccion={comedor.address} nombre={comedor.name  } />
                                                  
                                                ))} */}
                                                <TableRow>
                                                
                                                    <TableCell>22/06/22</TableCell>
                                                    <TableCell>General</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            startIcon={<PollIcon />}
                                                        >
                                                            Ver
                                                        </Button>

                                                    </TableCell>
                                                    
                                                
                                                </TableRow>
                                                
                                               
                                                
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        style={{ display: 'flex', justifyContent: 'right' }}
                                        component="div"
                                        rowsPerPageOptions={[5, 10, 25]}
                                        count={3}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPage={rowsPerPage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>

        </>
    );
}