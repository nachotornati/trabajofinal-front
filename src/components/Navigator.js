//import "../../assets/scss/constants.scss"


import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
//import { THEME } from "../../CONSTANTS"
//import '../../assets/scss/navbar.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


//import SavingsIcon from '@mui/icons-material/Savings'

import MenuIcon from '@mui/icons-material/Menu';
import { NavigatorItem } from "./NavigatorItem";
//import { BACKEND_URL } from "../../CONSTANTS";
//import { auth } from "../../firebase"
//import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../components/Context/AuthContext";
import { useEffect } from "react";



export const Navigator = () => {
    
    const { dispatch } = useContext(AuthContext);
    const { currentUser } = useContext(AuthContext);
    
    /* 
        const { dispatch } = useContext(AuthContext);
        const { currentUser } = useContext(AuthContext);
        const [pendingTransactions, setPendingTransactions] = React.useState([])
    
        const logOut = () => {
            signOut(auth).then(() => {
                dispatch({ type: "LOGOUT", payload: null })
                window.location.href = "/"
            }).catch((error) => {
                alert("Log Out Fallo")
            });
        }
    
        const getPendingTransactions = () => {
            fetch(BACKEND_URL + '/sharedExpense/pending', {
                headers: { 'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken }
            }).then((response) => response.json())
                .then((data) => {
                    setPendingTransactions(data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    
        }
    
    
        useEffect(() => {
            getPendingTransactions()
        }, [])
        
     */

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, backgroundColor: 'white', height: "100%" }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{ "width": "100%", "marginTop": "25px", "textAlign": "center", "marginLeft": "-10px" }}>
                <img
                    src="/fundacion-si-manuel-lozano.png"
                    width="200 !important"
                    height="75 !important"
                    className="d-inline-block align-top logo"
                    alt="logo"
                />
            </div>
            <List sx={{ paddingLeft: "16px" }}>
                <NavigatorItem name={"Home"} icon={<HomeIcon sx={{ color: "#8d75c6" }} />} path={"/home"} />
                <NavigatorItem name={"Gestion Usuarios"} icon={<SupervisorAccountIcon sx={{ color: "#8d75c6" }} />} path={"/admin"} />
            </List>
            <Divider sx={{ color: "white" }} />
            <div style={{paddingLeft:"16px"}}>
            <NavigatorItem name={"Cerrar Sesion"} icon={<LogoutIcon sx={{ color: "#8d75c6" }} />} path={"/"} />
            </div>
        </Box>
    );


    return (
        <>
            <Navbar bg="black" variant="dark">
                <Container style={{ display: 'flex' }}>
                    <Navbar.Brand style={{ marginRight: '25px', marginLeft: '40px', marginTop: '9px' }}>
                        <img
                            src="/fundacion-si-manuel-lozano (1).png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top logo"
                            //style={{ "marginRight": "15px", "marginLeft": "15px" }}
                            alt="logo"
                        />


                    </Navbar.Brand>
                    <React.Fragment key={"left"} >
                        <Button className="custom-font" disableRipple variant="outlined" style={{ border: 0 }} onClick={toggleDrawer("left", true)}><MenuIcon style={{ fontSize: 50, }} sx={{ color: '#8d75c6', display: 'flex', flexGrow: 1 }} /></Button>

                        <Drawer
                            anchor={"left"}
                            open={state["left"]}
                            onClose={toggleDrawer("left", false)}
                            sx={{ fontSize: '80px' }}
                        >
                            {list("left")}
                        </Drawer>
                    </React.Fragment>

                </Container>
            </Navbar>
        </>
    );
};

export default Navigator