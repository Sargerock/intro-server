import postQuerySchema from "../utils/schemas/post-query-schema";
import { ValidationError } from "../utils/errors";

export default async (req, res, next) => {
	try {
		await postQuerySchema.validate(req.query);
		next();
	} catch (e) {
		next(new ValidationError("Incorrect query params"));
	}
};
