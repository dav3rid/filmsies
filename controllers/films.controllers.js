const { fetchFilms } = require("../models/films.models.js");

exports.getFilms = (req, res, next) => {
	fetchFilms().then((films) => {
		res.status(200).send({ films });
	});
};
