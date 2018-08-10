import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";

import "./SignUp.css";

class SignUp extends Component {
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
      .post("http://localhost:5000/api/register", this.state)
      .then(response => {
        const token = response.data;
        localStorage.setItem("jwt", token);
        window.location.reload();
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Form inline className="SignUp" onSubmit={this.handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="username" className="mr-sm-2">
              Username
            </Label>
            <Input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              placeholder="thomas"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="password" className="mr-sm-2">
              Password
            </Label>
            <Input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="knows"
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Sign Up</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SignUp;
