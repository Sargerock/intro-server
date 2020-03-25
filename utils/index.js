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
	let accessToken = request.header("x-access-token");
	if (!accessToken) {
		throw new ValidationError("Access token is required");
	}
	return accessToken.replace("Bearer ", "");
};

export const createBodyValidator = schema => async (req, res, next) => {
	try {
		await schema.validate(req.body);
		next();
	} catch (e) {
		next(new ValidationError());
	}
};
