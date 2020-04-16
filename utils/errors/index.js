export const errorHandler = (err, req, res, next) => {
	switch (err.name) {
		case "ValidationError":
			const errors = err.inner.reduce(
				(acc, error) => ({
					...acc,
					[error.path]: [...(acc[error.path] || []), error.message + "\n"],
				}),
				{}
			);
			res.status(422).json({ message: "Validation error", errors });
			break;
		case "JsonWebTokenError":
		case "TokenExpiredError":
			res.status(401).json({ message: err.message });
			break;
		default:
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
	}
};
