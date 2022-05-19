const db = require("../db/index");

exports.fetchDirectorById = (id) => {
	return db
		.query(
			`SELECT directors.*, AVG(films.rating)::INT AS avg_film_rating
			FROM directors 
			LEFT JOIN films ON directors.director_id = films.director_id
			WHERE directors.director_id = $1
			GROUP BY directors.director_id`,
			[id]
		)
		.then(({ rows }) => {
			if (!rows.length) {
				return Promise.reject({ status: 404, msg: "not found" });
			}
			return rows[0];
		});
};
