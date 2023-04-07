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
import ComedorItem from '../ComedorItem';
import { TableContainer, TablePagination } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { TextField } from '@mui/material';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const mdTheme = createTheme();
export default function Home(props) {

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [comedores, setComedores] = useState([])
    const [tableComedores, setTableComedores] = useState([]);
    const [busqueda, setBusqueda] = useState("")
    const { currentUser } = useContext(AuthContext);

    

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value)
        filtrar(event.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        var resultadoTablaBusqueda = tableComedores.filter((elemento) => {

            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.address.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        })
        setComedores(resultadoTablaBusqueda)
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getComedores = () => {
        fetch('https://trabajo-final-backend-7ezk.onrender.com/api/dinners', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                
                setComedores(res.dinners)
                setTableComedores(res.dinners)
                

            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {
        getComedores()
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
                                
                                 <Grid item xs={6} md={6} lg={6}>
                                   
                                        <Button sx={{backgroundColor:'#8d75c6'}}variant="contained" style={{ width: '100%', height: '100%' }} onClick={ () => window.location.href = "/nuevo-comedor"  }  ><SoupKitchenIcon style={{ fontSize: 60 }}/> </Button>
                                   
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                   
                                        <Button sx={{backgroundColor:'#8d75c6'}} variant="contained" style={{ width: '100%', height: '100%' }}  onClick={ () => window.location.href = "/nueva-encuesta"  }    > <PollIcon style={{ fontSize: 60, }}/></Button>
                                    
                                </Grid> 
                                <Grid item xs={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TextField value={busqueda} placeholder="Busqueda por usuario o mail" style={{ marginRight: '8px', width: '100%' }} onChange={handleChangeBusqueda} />
                                    <Button><PersonSearchIcon /></Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                
                                                {comedores && comedores.map((comedor) => (
                                                    
                                                    <ComedorItem key={comedor.id} id={comedor._id} direccion={comedor.address} nombre={comedor.name}/>

                                                ))}
                                                



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