const express = require("express");
const app = express();
const { getFilms } = require("./controllers/films.controllers");
const { getDirectorById } = require("./controllers/directors.controllers");
const {
	handlePSQLErrors,
	handleCustomErrors,
	handleInternalServerError,
} = require("./controllers/errors.controllers");

app.use(express.json());

app.get("/api", (req, res, next) => {
	res.send({ msg: "api up and running" });
});

app.get("/api/films", getFilms);
app.get("/api/directors/:director_id", getDirectorById);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalServerError);

module.exports = app;
