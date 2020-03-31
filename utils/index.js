import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET, EXPIRES_ACCESS, EXPIRES_REFRESH } from "../config";
import { ValidationError } from "./errors";

export const hashPassword = async password => {
	return await bcrypt.hash(password, 10);
};

export const createTokens = payload => {
	const accessToken = createToken(payload, EXPIRES_ACCESS);
	const refreshToken = createToken(payload, EXPIRES_REFRESH);

	return { accessToken, refreshToken };
};

export const createToken = (payload, expiresIn) => {
	return jwt.sign(payload, SECRET, { expiresIn });
};

export const getAccessToken = request => {
	let accessToken = request.header("Authorization");
	if (!accessToken) {
		throw new ValidationError("Access token is required");
	}
	return accessToken.replace("Bearer ", "");
};

export const createRequestValidator = (
	bodySchema,
	paramsSchema,
	querySchema
) => async (req, res, next) => {
	try {
		if (bodySchema) await bodySchema.validate(req.body, { abortEarly: false });
		if (paramsSchema)
			await paramsSchema.validate(req.params, { abortEarly: false });
		if (querySchema)
			await querySchema.validate(req.query, { abortEarly: false });
		next();
	} catch (e) {
		const errors = {};
		e.inner.forEach(err => (errors[err.path] = err.message));
		next(new ValidationError(errors));
	}
};
