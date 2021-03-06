const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("./middlewares");
const db = require("../database/dbConfig");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;

  // hashes password
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db("users")
    .insert(user)
    .then(function(ids) {
      db("users")
        .where({ id: ids[0] })
        .first()
        .then(user => {
          // generates the token
          const token = generateToken(user);

          // attaches the token to the response
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
}

function login(req, res) {
  // implement user login
  const credentials = req.body;

  db("users")
    .where({ username: credentials.username })
    .first()
    .then(function(user) {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        // generate the token
        const token = generateToken(user);

        // attaches token to the response
        res.send(token);
      } else {
        return res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
