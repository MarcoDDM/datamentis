import React, { Component } from "react";
import Loading from "../../components/loading";
import { Button, Form, Row, Col } from "react-bootstrap";
import firebase from "firebase";

import "./index.css";

export class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      rpassword: "",
      message: "",
      loading: false
    };
  }

  register = e => {
    e.preventDefault();
    if (this.state.password === this.state.rpassword) {
      const { email, password } = this.state;
      this.setState({ message: "", loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(event => {
          const user = firebase
            .database()
            .ref()
            .child("users")
            .child(event.user.uid);
          user
            .set({
              email,
              emailVerified: true
            })
            .then(() => {
              var user = firebase.auth().currentUser;
              user.sendEmailVerification().then(() => {
                this.setState({ loading: false });
                window.location.pathname = "/newuser";
              });
            });
        })
        .catch(error => {
          this.setState({ loading: false });
          if (error.code === "auth/weak-password") {
            this.setState({
              message: "Contraseña debil (Mínimo 6 caracteres)"
            });
          } else if (error.code === "auth/email-already-in-use") {
            this.setState({ message: "Email en uso. Inicie sesión" });
          } else if (error.code === "auth/invalid-email") {
            this.setState({ message: "Formato de email incorrecto" });
          } else if (error.code === "auth/network-request-failed") {
            this.setState({ message: "Revise su conexión a internet" });
          } else {
            this.setState({ message: error.message });
          }
        });
    } else {
      this.setState({ message: "Contraseñas no coinciden" });
    }
  };

  render() {
    return (
      <div className="main-register">
        <Row className="container-register">
          <Col>
            <div className="form-register">
              <h2>Crea tu cuenta</h2>
              <br />
              <Form onSubmit={!this.state.loading ? e => this.register(e) : null}>
                <Form.Group controlId="email-testamento">
                  <Form.Control
                    type="email"
                    placeholder="Ingrese correo electrónico"
                    onChange={event => this.setState({ email: event.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="password-testamento">
                  <Form.Control
                    type="password"
                    placeholder="Ingrese contraseña"
                    onChange={event => this.setState({ password: event.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Repita contraseña"
                    onChange={event => this.setState({ rpassword: event.target.value })}
                  />
                </Form.Group>
                {this.state.loading ? (
                  <center>
                    <Loading width="30px" height="30px" />
                  </center>
                ) : null}
                <Form.Label>{this.state.message}</Form.Label>
                <br />
                <Button variant="success" type="submit" disabled={this.state.loading}>
                  Registrarse
                </Button>
              </Form>
            </div>
          </Col>
          <Col>
            <div className="steps-register">
              <h3>¿Como funcionamos?</h3>
              <br />
              <ol>
                <li>Te registras, verificas tu correo y luego inicias sesión.</li>
                <li>Configuras tus contactos, el mensaje y los archivos a enviar.</li>
                <li>Pones un lapso de tiempo para que enviemos un correo para verificar que estés bien.</li>
                <li>Si no abres el link enviado a tu correo en el tiempo que configures, le enviaremos el mensaje y los
                  archivos que has subido a tus contactos seleccionados.</li>
                <li><strong>Recuerda, todos tus datos son secretos y la confidencialidad está asegurada.</strong></li>
                
              </ol>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
