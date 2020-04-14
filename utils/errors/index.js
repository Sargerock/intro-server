export const errorHandler = (err, req, res, next) => {
	if (err.name === "ValidationError") {
		const errors = err.inner.reduce(
			(acc, error) => ({
				...acc,
				[error.path]: [...(acc[error.path] || []), error.message + "\n"],
			}),
			{}
		);
		res.status(422).json({ message: "Validation error", errors });
	} else if (err.name === "TokenExpiredError") {
		res.status(401).json({ message: err.message });
	} else {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};
