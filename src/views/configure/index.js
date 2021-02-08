import React, { Component } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import Slide from "@material-ui/core/Slide";
import firebase from "firebase";
import "firebase/auth";
import validator from "validator";
import { Button, ProgressBar, Form, Container, Row, Col } from "react-bootstrap";
import "./index.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class Configure extends Component {
  constructor() {
    super();

    this.state = {
      receiversText: "",
      subject: "",
      message: "",
      upload: false,
      uploadOk: false,
      isLoading: false,
      isUploading: false,
      progreso: 0,
      someFile: true,
      openMessageSuccessfully: false,
      emailVerification: true,
      openFileList: false,
      receivers: [],
      files: [],
      repetition: ["1", "2", "3"],
      timeGap: 604800000,
      repetitionsInfo: "",
      filesSize: -1
    };
    this.openListFiles = this.openListFiles.bind(this);
    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const uid = localStorage.getItem("uid");
    if (uid) {
      const userInfo = firebase
        .database()
        .ref()
        .child("users")
        .child(uid);
      await userInfo.once("value").then(snapshot => {
        snapshot.forEach(snap => {
          this.setState({
            [snap.key]: snap.val()
          });
          if (this.state.selector && this.state.repetitions) {
            document.getElementById("selector").value = this.state.selector;
            document.getElementById("repetitions").value = this.state.repetitions;
            if (this.state.selector === "604800000") {
              this.setState({ repetition: ["1", "2", "3"] });
            }
            if (this.state.selector === "2592000000") {
              this.setState({
                repetition: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
              });
            }
          }
        });
      });
      this.setState({ receiversText: "" });
      await this.state.receivers.map(receiver => {
        this.setState({
          receiversText: this.state.receiversText + receiver + ", "
        });
        return null;
      });
      this.setState({ receiversText: this.state.receiversText.slice(0, -2) });
    }
    this.getData();
  }

  async verifyEmail(event) {
    this.setState({ receiversText: event.target.value });
    var receiver = event.target.value.split(",");
    var receivers = [];
    receiver.forEach(email => {
      while (email[0] === " ") {
        email = email.substring(1, email.length);
      }
      while (email[email.length - 1] === " ") {
        email = email.substring(0, email.length - 1);
      }
      if (email !== "" && email !== " ") {
        if (validator.isEmail(email)) {
          receivers.push(email);
          this.setState({ emailVerification: true });
        } else {
          this.setState({ emailVerification: false });
        }
      }
    });
    await this.setState({ receivers });
  }

  update = () => {
    const uid = localStorage.getItem("uid");
    let { receivers, receiversText, subject, message, emailVerification, timeGap } = this.state;
    const selector = document.getElementById("selector").value;
    const repetitions = document.getElementById("repetitions").value;
    if (receiversText === "" || message === "" || subject === "") {
      alert("Algunos campos vacios");
    } else {
      if (uid && emailVerification) {
        this.setState({ isLoading: true });
        const userInfo = firebase
          .database()
          .ref()
          .child("users")
          .child(uid);
        userInfo
          .update({
            receivers,
            subject,
            message,
            receiversText,
            referenceDate: timeGap + new Date().getTime(),
            timeGap,
            selector,
            repetitions,
            emailSent: false
          })
          .then(() => {
            this.messageSuccessfully();
          });
      } else {
        alert("Inicie sesion");
      }
    }
  };

  async messageSuccessfully() {
    var text =
      document.getElementById("repetitions").options[document.getElementById("repetitions").selectedIndex].innerHTML +
      " " +
      document.getElementById("selector").options[document.getElementById("selector").selectedIndex].innerHTML;
    this.setState({
      repetitionsInfo: text,
      openMessageSuccessfully: true,
      isLoading: false
    });
  }

  upload = e => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    const file = document.getElementById("uploadFile").files[0];
    const { filesSize } = this.state;
    if (uid && file.size + filesSize < 5000000) {
      const files = firebase
        .database()
        .ref()
        .child("files")
        .child(uid);
      const storageRef = firebase
        .storage()
        .ref()
        .child("files")
        .child(uid)
        .child(file.name);
      const task = storageRef.put(file);
      task.on(
        "state_changed",
        snapshot => {
          let porcent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ progreso: porcent, isUploading: true });
        },
        function(error) {},
        async function() {
          document.getElementById("uploadFile").value = "";
          this.setState({
            progreso: 0,
            isUploading: false,
            someFile: true,
            uploadOk: true,
            filesSize: this.state.filesSize + file.size
          });
          var fileLocationAndName = { filename: file.name };
          await storageRef.getDownloadURL().then(url => {
            fileLocationAndName.path = url;
          });
          files.update({
            [file.name.split(".")[0]]: fileLocationAndName
          });
        }.bind(this)
      );
    } else {
      alert("LIMITE EXCEDIDO!! \n Solo tiene disponible: " + ((5000000 - filesSize) / 1000000).toFixed(1) + " MB");
      document.getElementById("uploadFile").value = "";
      this.setState({
        someFile: true
      });
    }
  };

  async openListFiles(e) {
    e.preventDefault();
    this.setState({ files: [] });
    const uid = localStorage.getItem("uid");
    const files = firebase
      .database()
      .ref()
      .child("files")
      .child(uid);
    await files.once("value").then(snapshot => {
      snapshot.forEach(snap => {
        var fileArray = [snap.val().filename, snap.val().path];
        this.state.files.push(fileArray);
        this.setState(this.state);
      });
    });
    this.setState({ openFileList: true });
  }

  handleClose = () => {
    this.setState({
      openFileList: false,
      uploadOk: false,
      openMessageSuccessfully: false
    });
  };

  newTimeGap = () => {
    const selector = document.getElementById("selector").value;
    const repetitions = document.getElementById("repetitions").value;
    this.setState({ timeGap: selector * repetitions });
  };

  handleChange = event => {
    if (event.target.value === "604800000") {
      this.setState({ repetition: ["1", "2", "3"] });
    }
    if (event.target.value === "2592000000") {
      this.setState({
        repetition: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
      });
    }
    document.getElementById("repetitions").value = "1";
    this.newTimeGap();
  };

  uploadButtonState = () => {
    if (document.getElementById("uploadFile").value === "") {
      this.setState({ someFile: true });
    } else {
      this.setState({ someFile: false });
    }
  };

  async getData() {
    const uid = localStorage.getItem("uid");
    await firebase
      .database()
      .ref()
      .child("files")
      .child(uid)
      .once("value")
      .then(snapshot => {
        if (snapshot.toJSON()) {
          snapshot.forEach(snap => {
            firebase
              .storage()
              .ref()
              .child("files")
              .child(uid)
              .child(snap.val().filename)
              .getMetadata()
              .then(filedata => {
                this.setState({
                  filesSize: this.state.filesSize + filedata.size
                });
              });
          });
        } else {
          this.setState({
            filesSize: 0
          });
        }
      });
  }

  render() {
    const {
      message,
      receiversText,
      subject,
      isLoading,
      emailVerification,
      openMessageSuccessfully,
      isUploading,
      progreso,
      openFileList,
      files,
      someFile,
      uploadOk,
      repetitionsInfo
    } = this.state;
    const dense = false;
    return (
      <div className="main-configure">
        <FormControl className="receiver-configure">
          <TextField
            id="outlined-email-input"
            label="Para:"
            value={receiversText}
            name="receiver"
            margin="normal"
            variant="outlined"
            onChange={event => this.verifyEmail(event)}
          />
          {!emailVerification ? (
            <FormHelperText id="component-helper-text">
              ¡Error! Separe con comas (' , ') o escriba correctamente el email.
            </FormHelperText>
          ) : null}
        </FormControl>
        <br />
        <TextField
          id="outlined-email-input"
          label="Asunto:"
          value={subject}
          name="subject"
          margin="normal"
          variant="outlined"
          className="subject-configure"
          onChange={event => this.setState({ subject: event.target.value })}
        />
        <br />
        <TextField
          id="outlined-multiline-flexible"
          label="Mensaje:"
          name="message"
          value={message}
          multiline
          margin="normal"
          variant="outlined"
          className="message-configure"
          rows="10"
          onChange={event => this.setState({ message: event.target.value })}
        />
        <br />
        <div className="time-configure">
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Verificación de la supervivencia cada:
              </Form.Label>
              <Col sm="2">
                <Form.Group controlId="repetitions">
                  <Form.Control as="select" onChange={this.newTimeGap}>
                    {this.state.repetition.map((repetition, id) => {
                      return (
                        <option key={id} value={id + 1}>
                          {repetition}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group controlId="selector">
                  <Form.Control as="select" onChange={this.handleChange}>
                    <option value="604800000">Semanas</option>
                    <option value="2592000000">Meses</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div className="final-configure">
          <Container>
            <Row>
              <Col>
                <div className="attachments-configure">
                  <form onSubmit={this.upload}>
                    <Row>
                      <Col>
                        <Input
                          type="file"
                          id="uploadFile"
                          className="attachInput-configure"
                          onChange={this.uploadButtonState}
                          disabled={this.state.filesSize === -1}
                        />
                        {isUploading && <ProgressBar animated now={progreso} />}
                      </Col>
                      <Col md="auto">
                        <Button type="submit" variant="success" disabled={someFile}>
                          Subir
                        </Button>
                      </Col>
                    </Row>
                  </form>
                  <a href="#listfiles" onClick={e => this.openListFiles(e)}>
                    Lista de archivos subidos
                  </a>
                </div>
              </Col>
              <Col md="auto">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={emailVerification === false || isUploading === true || !someFile}
                  onClick={this.update}
                >
                  {isLoading ? "Enviando…" : "¡LISTO!"}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        <Dialog
          open={uploadOk}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <List dense={dense}>
              <ListItem>
                <ListItemText primary="Archivos subido" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="CloudDone">
                    <CloudDoneIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="danger">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openFileList}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Lista de archivos"}</DialogTitle>
          <DialogContent>
            <List dense={dense}>
              {Object.keys(files).length > 0 ? (
                files.map(function(file, i) {
                  return (
                    <ListItem key={i}>
                      <a href={file[1]} target="_blank" rel="noopener noreferrer" download>
                        <ListItemText primary={file[0]} />
                      </a>
                      <ListItemSecondaryAction>
                        <IconButton disabled aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText primary="No has subido ningún archivo" />
                </ListItem>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="danger">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openMessageSuccessfully}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <h3>¡Felicitaciones! Haz completado tu mensaje. </h3> <br />
            <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
              <p>
                Este será enviado a <b>{receiversText}</b>. El mensaje de confirmación será enviado cada{" "}
                <b>{repetitionsInfo}</b>. Recuerda que tienes <b>1 semana</b> para confirmarlo de lo contrario será
                enviado.
              </p>
              <p>Cualquier duda puedes escribirnos a marantal2015@gmail.com y te responderé a la brevedad.</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="danger">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Configure;
