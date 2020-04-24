import avatarSchema from "../utils/schemas/avatar-schema";

export const avatarUploadGuard = async (req, res, next) => {
	if (!req.files) {
		return res.status(422).send({errors: {avatar: "No files were uploaded"}});
	}
	await avatarSchema.validate(req.files, { abortEarly: false })
	next();
}