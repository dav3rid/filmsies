process.env.NODE_ENV = "test";
const seed = require("../db/seed");
const testData = require("../data/test-data");
const db = require("../db");
const app = require("../app");
const request = require("supertest");
require("jest-sorted");

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
		test("200: Returns a list of films by the director queried", () => {
			return request(app)
				.get("/api/films?director_id=2")
				.expect(200)
				.then((response) => {
					expect(response.body.films).toHaveLength(2);
					response.body.films.forEach((film) => {
						expect(film.director_id).toBe(2);
					});
				});
		});
		test("400: Returns a bad request message when passed an invalid director id", () => {
			return request(app)
				.get("/api/films?director_id=katherine")
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toBe("bad request");
				});
		});
		test("404: Returns a not found message when the director doesn't exist", () => {
			return request(app)
				.get("/api/films?director_id=999999")
				.expect(404)
				.then((response) => {
					expect(response.body.msg).toBe("not found");
				});
		});
		test("200: Returns an empty array when the director exists but doesn't yet have any films", () => {
			return request(app)
				.get("/api/films?director_id=4")
				.expect(200)
				.then(({ body }) => {
					expect(body.films).toEqual([]);
				});
		});
		test("200: Returns the films sorted by the passed query", () => {
			return request(app)
				.get("/api/films?sort_by=duration")
				.expect(200)
				.then((response) => {
					expect(response.body.films).toBeSortedBy("duration");
				});
		});
		test("200: Films are sorted by year_of_release by default", () => {
			return request(app)
				.get("/api/films")
				.expect(200)
				.then((response) => {
					expect(response.body.films).toBeSortedBy("year_of_release");
				});
		});
		test("400: Returns a bad request message when passed an invalid sort by", () => {
			return request(app)
				.get("/api/films?sort_by=rottontomato")
				.expect(400)
				.then((response) => {
					expect(response.body.msg).toBe("bad request");
				});
		});
		test("what happens when we pass an incomplete query????", () => {
			return request(app)
				.get("/api/films?rose=magician")
				.expect(200)
				.then(({ body }) => {});
		});
	});
	describe("/api/directors/:director_id", () => {
		test("200: Returns the correct director", () => {
			return request(app)
				.get("/api/directors/3")
				.expect(200)
				.then(({ body }) => {
					expect(body.director).toEqual(
						expect.objectContaining({
							director_id: 3,
							director_name: "Bong Joon Ho",
						})
					);
				});
		});
		test("400: Returns a message when passed an invalid id", () => {
			return request(app)
				.get("/api/directors/bananas")
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).toBe("bad request");
				});
		});
		test("404: Returns a not found message when director isn't in the db", () => {
			return request(app)
				.get("/api/directors/999999999")
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).toBe("not found");
				});
		});
	});
});
