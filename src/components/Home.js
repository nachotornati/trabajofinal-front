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
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 180,
                                        }}
                                    >
                                        <Button variant="contained" style={{ width: '100%', height: '100%' }}  ><span className="black-font">Nuevo Comedor</span></Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} md={6} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 180,
                                        }}
                                    >
                                        <Button variant="contained" style={{ width: '100%', height: '100%' }}  onClick={ () => window.location.href = "/nuevaEncuesta"  }    > <span className="black-font">Nueva Encuesta</span></Button>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <div>
                                                        <Typography variant="h6" id="tableTitle" component="div">
                                                            Comedores
                                                        </Typography>
                                                    </div>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                                                    <Grid item xs={12} lg={12} md={12}>
                                                        <Paper
                                                            sx={{
                                                                p: 2,
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                height: 240,
                                                            }}
                                                        >
                                                            <Grid item xs={6}>
                                                                <Typography variant="h6" id="tableTitle" component="div">
                                                                    Comedor 1
                                                                </Typography>

                                                            </Grid>

                                                        </Paper>




                                                    </Grid>
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