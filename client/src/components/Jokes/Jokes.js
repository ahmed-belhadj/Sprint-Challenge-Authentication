import React, { Component } from "react";
import { Card, CardTitle, CardText, CardFooter, CardColumns } from "reactstrap";

import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const requestOptions = { headers: { Authorization: token } };
    axios
      .get("http://localhost:5000/api/jokes", requestOptions)
      .then(response => this.setState({ jokes: response.data }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="Jokes">
        <h1>Jokes</h1>
        <CardColumns>
          {this.state.jokes.map(joke => (
            <Card body key={joke.id}>
              <CardTitle>{joke.setup}</CardTitle>
              <CardText>{joke.punchline}</CardText>
              <CardFooter>{joke.type}</CardFooter>
            </Card>
          ))}
        </CardColumns>
      </div>
    );
  }
}

export default Jokes;
