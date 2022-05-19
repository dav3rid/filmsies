const { fetchDirectorById } = require("../models/directors.models");

exports.getDirectorById = (req, res, next) => {
	const { director_id } = req.params;
	fetchDirectorById(director_id)
		.then((director) => {
			res.status(200).send({ director });
		})
		.catch((err) => {
			next(err);
		});
};
