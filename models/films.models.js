const db = require("../db/index");

exports.fetchFilms = () => {
	return db.query(`SELECT * FROM films;`).then(({ rows }) => {
		return rows;
	});
};
