import { HandledError } from ".";

export default (err, req, res, next) => {
	console.log(err);
	if (err instanceof HandledError) {
		res.status(err.status).json({ message: err.message });
	} else {
		res.status(500).json({ message: "Internal server error" });
	}
};
