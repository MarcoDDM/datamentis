import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./index.css";

export class NotFound extends Component {
  render() {
    return (
      <div className="main-notfound">
        <h1>La página que buscas ya no existe o cambió.</h1>
        <br />
        <Button variant="primary" href="/">
          Ir a pagina principal
        </Button>
      </div>
    );
  }
}

export default NotFound;
