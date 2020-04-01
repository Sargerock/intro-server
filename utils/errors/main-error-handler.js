import { HandledError } from ".";

export default (err, req, res, next) => {
	console.log(err);
	if (err instanceof HandledError) {
		res.status(err.status).json({ message: err.message, errors: err.errors });
	} else if (err.name === "ValidationError") {
		const errors = {};
		err.inner.forEach(err => (errors[err.path] = err.message));
		res.status(400).json({ message: err.message, errors });
	} else if (err.name === "TokenExpiredError") {
		res.status(401).json({ message: err.message });
	} else {
		res.status(500).json({ message: "Internal server error" });
	}
};
