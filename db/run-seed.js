const seed = require("./seed");

seed().then(() => db.end());
