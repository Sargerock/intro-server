import {Op} from "sequelize";

import {User} from "../models";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
	const userName = req.params.username;

	const user = await User.findOne({where: {userName}});
	if (!user) {
		return res.status(404).json({message: "User not found"});
	}

	res.status(200).json(user);
};

export const autocompleteUsername = async (req, res) => {
	const userName = req.params.username;

	const users = await User.findAll({
		where: {userName: {[Op.like]: `${userName}%`}},
		limit: 5,
	});

	res.status(200).json(users);
};

export const updateUser = async (req, res) => {
	const user = req.user;
	const {oldPassword, newPassword} = req.body;

	if (!(await bcrypt.compare(oldPassword, user.password))) {
		return res.status(409).json({errors: {oldPassword: "Incorrect password"}});
	}

	await user.update({password: newPassword});

	res.status(200).json({message: "Password changed"});
}
