import { ValidationError } from ".";

export default (err, req, res, next) => {
	if (err instanceof ValidationError) {
		res.status(400).send(err.message);
		return;
	} else if (err.name === "ValidationError") {
		res.status(400).send("Wrong data provided");
		return;
	}
	console.log(err);
	res.status(500).send("Internal server error");
};
