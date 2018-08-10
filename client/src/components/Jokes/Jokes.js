import React, { Component } from "react";
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
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>
              {joke.setup} {joke.punchline}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Jokes;
