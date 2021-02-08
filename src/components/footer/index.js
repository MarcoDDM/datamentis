import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <Container>
        <Row className="menu-footer">
          <Col md="auto">
            <a href="/politics">Politicas de privacidad</a>
          </Col>
          <Col md="auto">
            <a href="/terms">Terminos y condiciones</a>
          </Col>
          <Col md="auto">
            <a href="/aboutus">Acerca de nosotros</a>
          </Col>
          <Col className="year-footer">
            <span>Marco Almada &reg; 2019- {new Date().getFullYear()}</span>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
