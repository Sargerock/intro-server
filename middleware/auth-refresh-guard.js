import jwt from "jsonwebtoken";

import { AuthorizationError } from "../utils/errors";
import { SECRET } from "../config";
import { getAccessToken } from "../utils";
import { User } from "../models/user";

export default async (req, res, next) => {
	let accessToken = getAccessToken(req);

	const { id } = jwt.verify(accessToken, SECRET, {
		ignoreExpiration: true,
	});
	jwt.verify(req.body.refreshToken, SECRET);

	const user = await User.findOne({ where: { id } });
	if (!user) throw new AuthorizationError();

	req.accessToken = accessToken;
	req.id = id;

	next();
};
