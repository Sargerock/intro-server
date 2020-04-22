import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {User} from "../models";
import {TOKEN_EXPIRE_TIME, JWT_SECRET} from "../config";

export const signUp = async (req, res) => {
	const user = req.body;

	const {id} = await User.create(user);
	const accessToken = jwt.sign({id}, JWT_SECRET, {expiresIn: TOKEN_EXPIRE_TIME});

	res.status(201).json({accessToken});
};

export const signIn = async (req, res) => {
	const {email, password} = req.body;

	const user = await User.findOne({where: {email}});
	const isAuthorized = user ? bcrypt.compareSync(password, user.password) : false;

	if (!isAuthorized) {
		return res.status(422).json({errors: {password: "Incorrect email or password"}});
	} else {
		const accessToken = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: TOKEN_EXPIRE_TIME});

		res.status(201).json({accessToken});
	}
};

export const getAuthenticatedUser = async (req, res) => {
	res.status(200).json(req.user);
};
