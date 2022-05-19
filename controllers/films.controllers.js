const { fetchFilms } = require("../models/films.models.js");
const { fetchDirectorById } = require("../models/directors.models");

exports.getFilms = (req, res, next) => {
	const { sort_by, director_id } = req.query;

	const promises = [fetchFilms(sort_by, director_id)];

	if (director_id) {
		promises.push(fetchDirectorById(director_id));
	}

	Promise.all(promises)
		.then(([films]) => {
			res.status(200).send({ films });
		})
		.catch((err) => {
			next(err);
		});
};
