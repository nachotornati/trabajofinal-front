import React from "react";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const NavigatorWithButton = () => {


    return (
        <>
            <Navbar bg="black" variant="dark">
                <Container style={{display:'flex', backgroundColor:'#a4c4be'}}>
                <Navbar.Brand style={{marginRight:'25px',marginLeft:'40px',marginTop:'9px'}}>
                    <a href="/">
                        <img
                            src="/fundacion-si-manuel-lozano.png"
                            width="170"
                            height="60"
                            className="d-inline-block align-top logo"
                            style={{"marginRight": "15px", "marginLeft": "15px"}}
                        /></a>
                    </Navbar.Brand>
                </Container>

            </Navbar>
        </>
    );
};

export default NavigatorWithButton