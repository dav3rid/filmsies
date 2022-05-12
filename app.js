const express = require("express");
const app = express();
const { getFilms } = require("./controllers/films.controllers");

app.use(express.json());

app.get("/api/films", getFilms);

module.exports = app;
