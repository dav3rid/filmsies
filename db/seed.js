const db = require("./index");
const format = require("pg-format");

const seed = ({ filmData, directorData }) => {
	return db
		.query("DROP TABLE IF EXISTS films;")
		.then(() => {
			return db.query("DROP TABLE IF EXISTS directors;");
		})
		.then(() => {
			return db.query(`CREATE TABLE directors (
            	director_id SERIAL PRIMARY KEY, 
            	director_name VARCHAR(255) NOT NULL
        	)`);
		})
		.then(() => {
			return db.query(`CREATE TABLE films (
                film_id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                year_of_release INT,
                plot TEXT,
                rating DECIMAL,
                box_office BIGINT,
                duration INT,
                director_id INT references directors(director_id)
            )`);
		})
		.then(() => {
			const formattedDirectors = directorData.map(({ director_name }) => {
				return [director_name];
			});

			const queryStr = format(
				`INSERT INTO directors 
            	(director_name)
            	VALUES
            	%L`,
				formattedDirectors
			);

			return db.query(queryStr);
		})
		.then(() => {
			const formattedFilms = filmData.map(
				({
					title,
					year_of_release,
					plot,
					rating,
					duration,
					box_office,
					director_id,
				}) => {
					return [
						title,
						year_of_release,
						plot,
						rating,
						duration,
						box_office,
						director_id,
					];
				}
			);
			const queryStr = format(
				`INSERT INTO films 
				(title, year_of_release, plot, rating, duration, box_office, director_id)
				VALUES
				%L`,
				formattedFilms
			);

			return db.query(queryStr);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = seed;
