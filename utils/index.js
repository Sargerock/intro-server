import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SECRET, EXPIRES_ACCESS, EXPIRES_REFRESH } from "../config";
import { Auth } from "../db";
import { ValidationError } from "./errors";

export const hashPassword = async password => {
	return await bcrypt.hash(password, 10);
};

export const createTokens = payload => {
	const accessToken = createToken(payload, EXPIRES_ACCESS);
	const refreshToken = createToken(payload, EXPIRES_REFRESH);

	Auth.create({ refreshToken, accessToken });

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
		if (bodySchema) await bodySchema.validate(req.body);
		if (paramsSchema) await paramsSchema.validate(req.params);
		if (querySchema) await querySchema.validate(req.query);
		next();
	} catch (e) {
		next(new ValidationError());
	}
};
