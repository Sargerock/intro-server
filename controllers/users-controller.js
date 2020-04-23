import {Op} from "sequelize";
import bcrypt from "bcrypt";
import path from "path"
import fs from "fs";

import {User} from "../models";

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

export const updateAvatar = async (req, res) => {
	const user = req.user;

	if (!req.files) {
		return res.status(422).send("No files were uploaded");
	}

	const avatar = req.files.avatar;
	const fileName = user.userName + Date.now() + avatar.name.substr(avatar.name.lastIndexOf('.'));

	if(user.avatarUrl !== "uploads/avatars/default.png"){
		try{
			fs.unlinkSync(path.resolve(__dirname, `../${user.avatarUrl}`));
		} catch (e) {
			console.log(e.message);
		}
	}
	await avatar.mv(path.resolve(__dirname, `../uploads/avatars/${fileName}`));
	await user.update({avatarUrl: `uploads/avatars/${fileName}`});

	res.status(201).json({avatarUrl: user.avatarUrl});
}
