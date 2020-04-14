import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models";
import { TOKEN_EXPIRE_TIME, JWT_SECRET } from "../config";

export const signUp = async (req, res) => {
	const user = req.body;

	const { id } = await User.create(user);
	const accessToken = jwt.sign({ id }, JWT_SECRET, TOKEN_EXPIRE_TIME);

	res.status(201).json({ accessToken });
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email } });
	if (!user) {
		res
			.status(409)
			.json({ errors: { password: "Incorrect email or password" } });
		return;
	}
	if (!(await bcrypt.compare(password, user.password))) {
		res
			.status(409)
			.json({ errors: { password: "Incorrect email or password" } });
		return;
	}
	const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, TOKEN_EXPIRE_TIME);

	res.status(201).json({ accessToken });
};

export const getAuthenticatedUser = async (req, res) => {
	res.status(200).json(req.user);
};
