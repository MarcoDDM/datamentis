import React, { Component } from "react";
import { Button, Form, Row, Col, Overlay } from "react-bootstrap";
import Loading from "../loading";
import firebase from "firebase";

import "./index.css";

export class Login extends Component {
  constructor(...args) {
    super(...args);

    this.attachRef = target => this.setState({ target });
    this.state = {
      email: "",
      password: "",
      message: "",
      show: false,
      loading: false
    };
  }

  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({ placement: "top" });
    } else {
      this.setState({ placement: "left" });
    }
  }

  login = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ message: "", show: false });
    if (password !== "") {
      this.setState({ message: "", loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(event => {
          if (event.user.emailVerified) {
            this.setState({ loading: false });
            localStorage.setItem("uid", event.user.uid);
            window.location.pathname = "/configure";
          } else {
            this.setState({
              message: "Verifique su correo",
              loading: false,
              show: true
            });
          }
        })
        .catch(error => {
          this.setState({ loading: false, show: true });
          if (error.code === "auth/user-disabled") {
            this.setState({ message: "Cuenta suspendida por inactividad" });
          } else if (error.code === "auth/network-request-failed") {
            this.setState({ message: "Revise su conexión a internet" });
          } else if (error.code === "auth/user-not-found") {
            this.setState({ message: "¡Usted no está registrado! Regístrese" });
          } else if (error.code === "auth/wrong-password") {
            this.setState({ message: "Contraseña incorrecta" });
          } else if (error.code === "auth/invalid-email") {
            this.setState({ message: "Ingrese su correo electrónico" });
          } else {
            this.setState({ message: error.message });
          }
        });
    } else {
      this.setState({ message: "Ingrese su contraseña", show: true });
    }
  };

  render() {
    const { show, target, message, placement } = this.state;
    return (
      <div className="main-login">
        <div className="form-login">
          <Form onSubmit={!this.state.loading ? e => this.login(e) : null}>
            <Row>
              <Col md="auto">
                <Form.Group
                  className="input-login"
                  controlId="email-testamentoapp"
                >
                  <Form.Control
                    type="email"
                    ref={this.attachRef}
                    placeholder="Ingrese correo electrónico"
                    size="sm"
                    onChange={event =>
                      this.setState({ email: event.target.value, show: false })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="auto">
                <Form.Group
                  className="input-login"
                  controlId="password-testamentoapp"
                >
                  <Form.Control
                    type="password"
                    placeholder="Ingrese contraseña"
                    size="sm"
                    onChange={event =>
                      this.setState({
                        password: event.target.value,
                        show: false
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md="1">
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={this.state.loading}
                  size="sm"
                >
                  {this.state.loading ? (
                    <Loading width="20px" height="20px" />
                  ) : (
                    "Iniciar"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Overlay target={target} show={show} placement={placement}>
          {({
            outOfBoundaries,
            placement,
            scheduleUpdate,
            arrowProps,
            ...props
          }) => (
            <div
              {...props}
              style={{
                backgroundColor: "RGBA(255, 100, 100, 0.85)",
                padding: "2px 10px",
                color: "white",
                borderRadius: 3,
                ...props.style
              }}
            >
              {message}
            </div>
          )}
        </Overlay>
      </div>
    );
  }
}

export default Login;
