import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NewUserImage from "../../assets/images/newuser.png";
import "./index.css";

export class NewUser extends Component {
  render() {
    return (
      <div className="main-newuser">
        <h1>Usuario creado</h1>
        <img src={NewUserImage} alt="Usuario creado" />
        <br />
        <br />
        <span>Verifique su correo y luego inicie sesión</span>
        <br />
        <br />
        <Button variant="primary" href="/">
          Inicia sesión
        </Button>
      </div>
    );
  }
}

export default NewUser;
