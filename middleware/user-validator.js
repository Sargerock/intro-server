import userSchema from "../utils/schemas/user-schema";

export default async (req, res, next) => {
	try {
		await userSchema.validate(req.body);
		next();
	} catch (e) {
		next(e);
	}
};
