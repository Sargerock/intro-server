import bcrypt from "bcrypt";

import { User, Auth } from "../models";
import { ValidationError, AuthorizationError } from "../utils/errors";
import { createTokens, createToken } from "../utils";
import { EXPIRES_ACCESS } from "../config";

export const signUp = async (req, res) => {
	const { userName, email, password } = req.body;

	const user = await User.create({
		userName,
		email,
		password,
	});

	const { accessToken, refreshToken } = createTokens({ id: user.id });
	Auth.create({ refreshToken, accessToken });

	res.status(201).json({ accessToken, refreshToken });
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ where: { email } });
	if (!user) throw new ValidationError(null, "Incorrect email or password");
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new ValidationError(null, "Incorrect email or password");

	const { accessToken, refreshToken } = createTokens({ id: user.id });
	Auth.create({ refreshToken, accessToken });

	res.status(201).json({ accessToken, refreshToken });
};

export const signOut = async (req, res) => {
	const { accessToken } = req;

	const auth = await Auth.findOne({ where: { accessToken } });
	if (!auth) throw new HandledError("Not found", 404);

	auth.destroy();

	res.status(200).send("Ok");
};

export const refresh = async (req, res) => {
	const { accessToken, id } = req;
	const refreshToken = req.body.refreshToken;

	const auth = await Auth.findOne({ where: { refreshToken } });
	if (!auth) throw new AuthorizationError();

	if (auth.accessToken !== accessToken) {
		auth.destroy();
		throw new AuthorizationError();
	}
	auth.accessToken = createToken({ id }, EXPIRES_ACCESS);
	auth.save();
	res.status(200).json({ accessToken: auth.accessToken });
};

export const getUser = async (req, res) => {
	const { user } = req;
	res.status(200).json(user);
};
