const seed = require("./seed");
const db = require("./index");
const devData = require("../data/dev-data/index");

seed(devData).then(() => db.end());
