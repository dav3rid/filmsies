process.env.NODE_ENV = "test";
const seed = require("../db/seed");
const testData = require("../data/test-data");
const db = require("../db");
const app = require("../app");
const request = require("supertest");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("/api", () => {
	describe("/api/films", () => {
		test("200: Returns a list of films", () => {
			return request(app)
				.get("/api/films")
				.expect(200)
				.then(({ body: { films } }) => {
					expect(films).toHaveLength(6);
					films.forEach((film) => {
						expect(film).toEqual(
							expect.objectContaining({
								film_id: expect.any(Number),
								title: expect.any(String),
								plot: expect.any(String),
								duration: expect.any(Number),
								box_office: expect.any(String),
								director_id: expect.any(Number),
								year_of_release: expect.any(Number),
								rating: expect.any(String),
							})
						);
					});
				});
		});
	});
});
