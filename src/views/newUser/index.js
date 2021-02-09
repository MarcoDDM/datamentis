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
        <span>Le llegará un correo electrónico con un link. Para confirmar su cuenta, debe hacer click en este, luego de eso podrá utilizar su cuenta en DataMentis.</span>
        <br />
        <br />
        <Button variant="primary" href="/">
          Regresar a página de Inicio
        </Button>
      </div>
    );
  }
}

export default NewUser;
