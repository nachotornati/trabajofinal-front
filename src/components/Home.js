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
import { TableContainer, TablePagination } from '@mui/material';
import { useEffect } from 'react';


const mdTheme = createTheme();
export default function Home(props) {

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

    const getComedores = () => {
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
                                   
                                        <Button sx={{backgroundColor:'#8d75c6'}}variant="contained" style={{ width: '100%', height: '100%' }} onClick={ () => window.location.href = "/nuevoComedor"  }  ><SoupKitchenIcon style={{ fontSize: 60 }}/> </Button>
                                   
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                   
                                        <Button sx={{backgroundColor:'#8d75c6'}} variant="contained" style={{ width: '100%', height: '100%' }}  onClick={ () => window.location.href = "/nuevaEncuesta"  }    > <PollIcon style={{ fontSize: 60, }}/></Button>
                                    
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {comedores?.map((comedor) => (
                                                    <ComedorItem key={comedor.id} direccion={comedor.address} nombre={comedor.name  } />
                                                  
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