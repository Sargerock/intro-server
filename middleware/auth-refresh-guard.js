import jwt from "jsonwebtoken";

import { AuthorizationError } from "../utils/errors";
import { SECRET } from "../config";
import { getAccessToken } from "../utils";
import { User } from "../db";

export default async (req, res, next) => {
	try {
		let accessToken = getAccessToken(req);

		const { sub } = jwt.verify(accessToken, SECRET, {
			ignoreExpiration: true
		});
		jwt.verify(req.body.refreshToken, SECRET);

		const user = await User.findOne({ where: { id: sub } });
		if (!user) throw new AuthorizationError();

		req.accessToken = accessToken;
		req.id = sub;

		next();
	} catch (e) {
		next(new AuthorizationError());
	}
};
