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
import PollIcon from '@mui/icons-material/Poll';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import ComedorItem from './ComedorItem';
import { TableContainer, TablePagination } from '@mui/material';

const mdTheme = createTheme();
export default function Home(props) {

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

                                                <Grid container spacing={3} style={{ marginBottom: '10px',marginTop:'0', marginLeft:'0',height:180 }}>
                                                    
                                                    <ComedorItem/>


                                                    
                                                </Grid>
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