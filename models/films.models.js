const db = require("../db/index");

exports.fetchFilms = (sort_by = "year_of_release", director_id) => {
	const queryVals = [];
	let queryStr = `SELECT * FROM films`;

	if (director_id) {
		queryStr += ` WHERE director_id = $1`;
		queryVals.push(director_id);
	}

	const validSortBy = [
		"year_of_release",
		"duration",
		"director_id",
		"box_office",
	];

	if (!validSortBy.includes(sort_by)) {
		return Promise.reject({ status: 400, msg: "bad request" });
	}

	queryStr += ` ORDER BY ${sort_by}`;

	return db.query(queryStr, queryVals).then(({ rows }) => {
		return rows;
	});
};
