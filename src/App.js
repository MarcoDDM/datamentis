import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import NotFound from "./views/notFound";
import Home from "./views/home";
import Configure from "./views/configure";
import AboutUs from "./views/aboutus";
import Terms from "./views/terms";
import Politics from "./views/politics";
import NewDate from "./views/newDate";
import NewUser from "./views/newUser";
import Footer from "./components/footer";
import "./App.css";

export class App extends Component {
  render() {
    const uid = localStorage.getItem("uid");
    return (
      <BrowserRouter>
        <div>
          <div className="container-app">
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/aboutus" component={AboutUs} exact />
              <Route path="/newuser" component={NewUser} exact />
              <Route path="/newdate" component={NewDate} exact />
              <Route path="/politics" component={Politics} exact />
              <Route path="/terms" component={Terms} exact />
              {uid && <Route path="/configure" component={Configure} exact />}
              <Route component={NotFound} />
            </Switch>
          </div>
          <hr />
          <div className="footer-app">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
