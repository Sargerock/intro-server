import jwt from "jsonwebtoken";

import { AuthorizationError } from "../utils/errors";
import { SECRET } from "../config";
import { User } from "../models/user";
import { getAccessToken } from "../utils";

export default async (req, res, next) => {
	try {
		let accessToken = getAccessToken(req);

		const { id } = jwt.verify(accessToken, SECRET);
		const user = await User.findOne({ where: { id } });
		if (!user) throw new AuthorizationError();

		req.accessToken = accessToken;
		req.id = id;
		req.user = user;
		next();
	} catch (e) {
		next(new AuthorizationError());
	}
};
