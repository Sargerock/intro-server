import { Op } from "sequelize";

import { User } from "../models";

export const getUser = async (req, res) => {
	const userName = req.params.username;

	const user = await User.findOne({ where: { userName } });
	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}

	res.status(200).json(user);
};

export const findUsersAutocomplete = async (req, res) => {
	const userName = req.params.username;

	const users = await User.findAll({
		where: { userName: { [Op.like]: `${userName}%` } },
		limit: 5,
	});

	res.status(200).json(users);
};
