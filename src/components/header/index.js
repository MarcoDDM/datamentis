import React, { Component, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Login from "../login";
import firebase from "firebase";
import "./index.css";

export class Header extends Component {
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        localStorage.removeItem("uid");
        window.location.pathname = "/";
      });
  }

  render() {
    const uid = localStorage.getItem("uid");
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">AsyncData</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {uid ? null : <p className="inicio-sesion-header"> Inicio de sesión</p>}
            </Nav>
            <Nav>
              {localStorage.getItem("uid") ? (
                <Fragment>
                  <Nav.Link href="/configure">CONFIGURAR</Nav.Link>
                  <Nav.Link onClick={this.logout}>CERRAR SESION</Nav.Link>
                </Fragment>
              ) : (
                <Login />
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
