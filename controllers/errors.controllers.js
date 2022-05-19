exports.handleCustomErrors = (err, req, res, next) => {
	res.status(err.status).send({ msg: err.msg });
};

exports.handleInternalServerError = (err, req, res, next) => {
	res.status(500).send({ msg: "internal server error" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
	if (err.code === "22P02") {
		res.status(400).send({ msg: "bad request" });
	} else {
		next(err);
	}
};
