import bcrypt from "bcrypt";

import { User } from "../models/user";
import { Auth } from "../models/auth";
import { ValidationError, AuthorizationError } from "../utils/errors";
import { createTokens, createToken } from "../utils";
import { EXPIRES_ACCESS } from "../config";

export const signUp = async (req, res, next) => {
	const { userName, email, password } = req.body;

	const user = await User.create({
		userName,
		email,
		password
	});

	const { accessToken, refreshToken } = createTokens({ id: user.id });
	Auth.create({ refreshToken, accessToken });

	res.status(201).json({ accessToken, refreshToken });
};

export const signIn = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ where: { email } });
	if (!user) throw new ValidationError("Incorrect email or password");
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new ValidationError("Incorrect email or password");

	const { accessToken, refreshToken } = createTokens({ id: user.id });
	Auth.create({ refreshToken, accessToken });

	res.status(201).json({ accessToken, refreshToken });
};

export const signOut = async (req, res, next) => {
	const { accessToken } = req;

	const auth = await Auth.findOne({ where: { accessToken } });
	if (!auth) {
		next(new HandledError("Not found", 404));
		return;
	}
	auth.destroy();

	res.status(200).send("Ok");
};

export const refresh = async (req, res, next) => {
	const { accessToken, id } = req;
	const refreshToken = req.body.refreshToken;

	const auth = await Auth.findOne({ where: { refreshToken } });
	if (!auth) {
		next(new AuthorizationError());
		return;
	}
	if (auth.accessToken !== accessToken) {
		auth.destroy();
		next(new AuthorizationError());
		return;
	}
	auth.accessToken = createToken({ id }, EXPIRES_ACCESS);
	auth.save();
	res.status(200).json({ accessToken: auth.accessToken });
};

export const getUser = async (req, res) => {
	const { user } = req;
	res.status(200).json(user);
};
