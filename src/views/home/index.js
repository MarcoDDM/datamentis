import React, { Component } from "react";
import Register from "../../components/register";
import AboutUs from "../aboutus";
import "./index.css";

export class Home extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div>
        <h1 className="title-home">
          <b>No todos los secretos queremos llevarlos a la tumba</b>{" "}
        </h1>
        {!localStorage.getItem("uid") ? <Register /> : <AboutUs />}
      </div>
    );
  }
}

export default Home;
