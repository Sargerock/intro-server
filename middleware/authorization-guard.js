import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import { User } from "../models/user";

export const authorizationGuard = async (req, res, next) => {
	let accessToken;
	try {
		accessToken = req.header("Authorization").split(" ")[1];
	} catch (e) {
		res.status(401).json({ message: "Token not provided" });
		return;
	}

	const { id } = jwt.verify(accessToken, JWT_SECRET);
	const user = await User.findOne({ where: { id } });
	if (!user) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	req.accessToken = accessToken;
	req.user = user;
	next();
};
