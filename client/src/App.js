import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Jokes from "./components/Jokes/Jokes";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  handleSignOut = event => {
    localStorage.removeItem("jwt");
    this.props.history.push("/signin");
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {localStorage.getItem("jwt") && (
            <button onClick={this.handleSignOut}>Sign Out</button>
          )}
        </div>

        <Route
          exact
          path="/signup"
          render={() =>
            localStorage.getItem("jwt") ? <Redirect to="/jokes" /> : <SignUp />
          }
        />
        <Route
          exact
          path="/signin"
          render={() =>
            localStorage.getItem("jwt") ? <Redirect to="/jokes" /> : <SignIn />
          }
        />
        <Route path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default withRouter(App);
