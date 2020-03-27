import bcrypt from "bcrypt";

import { User, Auth } from "../db";
import { ValidationError, AuthorizationError } from "../utils/errors";
import { createTokens, createToken } from "../utils";
import { EXPIRES_ACCESS } from "../config";

export const signUp = async (req, res, next) => {
	const { userName, email, password } = req.body;
	try {
		const user = await User.create({
			userName,
			email,
			password
		});

		const tokens = createTokens({ sub: user.id });

		res.status(201).json({ ...tokens });
	} catch (e) {
		next(new ValidationError("Email already in use"));
	}
};

export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			next(new ValidationError("Incorrect email or password"));
			return;
		}

		const tokens = createTokens({ sub: user.id });

		res.status(201).json({ ...tokens });
	} catch (e) {
		next(new ValidationError());
	}
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
	auth.accessToken = createToken({ sub: id }, EXPIRES_ACCESS);
	auth.save();
	res.status(200).json({ accessToken: auth.accessToken });
};

export const getUser = async (req, res) => {
	const { id } = req;
	const { userName } = await User.findByPk(id);

	res.status(200).json({ id, userName });
};
