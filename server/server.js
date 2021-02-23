"use strict";
const express = require("express");
const path = require("path");
const logger = require("morgan");

const cors = require("cors");
const movies = require("./movies.json");
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/movies", (req, res) => {
  const { search = "", start, end } = req.query;

  // TODO: add params validation
  // TODO: create a movie service here
  // Maybe collect some analytics, search terms, to optimize user experience.

  const searchAsLower = search.toLowerCase();
  const matchedMovies = search
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchAsLower) ||
          movie.synopsis.toLowerCase().includes(searchAsLower)
      )
    : movies;

  res.send(matchedMovies.slice(Number.parseInt(start), Number.parseInt(end)));
});

app.get("/movies/:id", (req, res) => {
  // should return 404 when not found
  res.send(movies.filter((movie) => movie.id === req.params.id)[0]);
});

app.listen(3001, function () {
  console.log(`app listening on port ${3001}!`);
});

module.exports = app;
