process.env.NODE_ENV = "test";
const seed = require("../db/seed");
const testData = require("../data/test-data");
const db = require("../db");

afterAll(() => {
	db.end();
});
beforeEach(() => {
	seed(testData);
});

describe("nonsense", () => {
	test("a test", () => {});
});
