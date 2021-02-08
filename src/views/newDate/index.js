import React, { Component } from "react";
import Loading from "../../components/loading";
import firebase from "firebase";


export class NewDate extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      parameters: true,
      title: "",
      message: ""
    };
  }

  async componentDidMount() {
    let parameters = this.props.location.search.substring(1);
    parameters = parameters.split("&");
    await parameters.map(parameter => {
      parameter = parameter.split("=");
      this.setState({
        [parameter[0]]: parameter[1]
      });
      return true;
    });
    if (this.state.user && this.state.expdate) {
      if (this.state.expdate > new Date().getTime()) {
        const user = firebase
          .database()
          .ref()
          .child("users")
          .child(this.state.user);
        var tiemGap;
        await user.child("timeGap").once("value", function(value) {
          tiemGap = value.val();
        });
        await user.update({
          referenceDate: tiemGap + new Date().getTime(),
          emailSent: false
        });
        this.setState({
          loading: false
        });
        setTimeout(this.redirect, 2000);
      } else {
        this.setState({
          parameters: false,
          title: "Este link ya expiró.",
          message: "El mensaje fue enviado a tus contactos."
        });
      }

    } else {
      this.setState({
        parameters: false,
        title: "Este link no es valido.",
        message: "Revise su correo y busque el valido."
      });
    }
  }

  redirect() {
    window.location = "/";
  }

  render() {
    var { loading, parameters, title, message } = this.state;
    return (
      <center>
        <br />
        {parameters ? (
          <div>
            {loading ? (
              <div>
                <h1>Actualizando...</h1>
                <Loading width="30px" height="30px" />
              </div>
            ) : (
              <div>
                <h1>Fecha actualizada</h1>
                <h3>Redireccionando...</h3>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1>{title}</h1>
            <h3>{message}</h3>
          </div>
        )}
      </center>
    );
  }
}

export default NewDate;
