import userSchema from "../utils/schemas/user-schema";
import { ValidationError } from "../utils/errors";

export default async (req, res, next) => {
	try {
		await userSchema.validate(req.body);
		next();
	} catch (e) {
		next(new ValidationError());
	}
};
