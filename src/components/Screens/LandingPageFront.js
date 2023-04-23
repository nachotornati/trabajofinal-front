import React from "react";
//import "../assets/scss/landingPage.scss"
//import "../assets/scss/constants.scss"

import Container from 'react-bootstrap/Container';
import { Button } from "@material-ui/core";
import {Stack} from "react-bootstrap";

//import { LEMMA, THEME } from "../CONSTANTS"


export const LandingPageFront = () => {


    return (
        <>
            <Container style={{
                display: "flex",
                width: "60%",
                justifyContent: "center",
                margin: "0 auto",
                color: "white",
                marginTop: "5%"
            }
            }>

                <Stack gap={1} style={{ textAlign: "center" }}>
                    <div><img className="logo" src="/logo512.png" width="250" height="250"></img></div>
                    <div><h1 className="custom-font-bold">Walletify</h1></div>
                    <div className="custom-font-light"></div>
                    <div><Button variant="contained" className="custom-font-light"><span className="black-font">Empezar ahora</span></Button></div>
                </Stack>

            </Container>
        </>
    );
};

export default LandingPageFront