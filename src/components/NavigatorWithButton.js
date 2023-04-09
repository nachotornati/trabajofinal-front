import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const NavigatorWithButton = () => {


    return (
        <>
        <style>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
        <Navbar bg="black" variant="dark">
        <Container fluid style={{ backgroundColor: "#a4c4be" }}>
          <Navbar.Brand>
            <a href="/">
              <img
                src="/fundacion-si-manuel-lozano.png"
                width="170"
                height="60"
                className="d-inline-block align-top logo"
                style={{ marginRight: "15px", marginLeft: "15px" }}
              />
            </a>
          </Navbar.Brand>
        </Container>
      </Navbar>

        </>
    );
};

export default NavigatorWithButton