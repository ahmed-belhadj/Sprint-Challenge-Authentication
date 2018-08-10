import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state)
      .then(response => {
        const token = response.data;
        localStorage.setItem("jwt", token);
        window.location.reload();
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="SignIn">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
