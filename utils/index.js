import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { SECRET, EXPIRES_ACCESS, EXPIRES_REFRESH } from "../config";
import { Auth } from "../db";

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
