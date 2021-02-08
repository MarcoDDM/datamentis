import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import testament from "../../assets/images/testament.jpeg";
import "./index.css";

export class AboutUs extends Component {
  render() {
    return (
      <div>
        {window.location.pathname === "/aboutus" && (
          <h1 className="title-home">
            <b>No todos los secretos queremos llevarlos a la tumba</b>{" "}
          </h1>
        )}
        <br />
        <div className="container-home">
          <Row>
            <Col sm={"auto"}>
              <div className="image-home">
                <img src={testament} alt="testament" />
              </div>
            </Col>
            <Col>
              <div className="text-home">
                ¿Alguna vez pensaste en dejar un mensaje a tus seres queridos para después de tu muerte y quizás
                acompañarlo con un video, imágenes o cualquier otro archivo? 
                <br />
                <br />
                Quizás también pensaste en dejarles algunas ideas o instrucciones en caso de que algo te pase.
                <br />
                <br />
                Bueno, esa es la idea de AsyncData, usarlo es muy simple: te registrás con un mail válido, escribís
                tu mensaje al que le podés incluir algún link (por ejemplo un video privado de youtube) o adjuntarle los
                archivos que quieras. Después elegís el o los destinatarios, la frecuencia de aviso de supervivencia y
                listo! 
                <br />
                <br />
                En caso de que no respondas al correo de supervivencia, automáticamente se enviará tu mensaje a los
                destinatarios que hayas elegido. 
                <br />
                <br />
                AsyncData está pensado para que evites preocuparte por los mensajes que querés dejar, hay veces que
                necesitamos que nadie sepa lo que dejamos hasta que llegue ese momento, o bien no estamos seguros en
                pedirle a una persona que tenga la responsabilidad de darle todas las instrucciones o mensajes que
                queremos para nuestros seres queridos.
                <br /> 
                <br />
                Es por eso que podemos de esta manera dejar un correo para que llegue directamente a esa persona que
                tanto queremos, de una manera más directa, sin intermediarios y en el momento oportuno. 
                <br />
                <br />
                Nos tomamos muy enserio tu privacidad, la información se encuentra encriptada con AES-256, por lo que no
                tenemos forma de acceder al contenido de tu mensaje y una vez enviado el mismo automáticamente se borra
                de nuestra base de datos conjuntamente con tu cuenta.
                <br />
                <br />
                ¡Bienvenido!
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AboutUs;
