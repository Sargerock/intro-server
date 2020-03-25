import jwt from "jsonwebtoken";

import { AuthorizationError } from "../utils/errors";
import { SECRET } from "../config";
import { User } from "../db";
import { getAccessToken } from "../utils";

export default async (req, res, next) => {
	try {
		let accessToken = getAccessToken(req);

		const { sub } = jwt.verify(accessToken, SECRET);
		const user = await User.findOne({ where: { id: sub } });
		if (!user) throw new AuthorizationError();

		req.accessToken = accessToken;
		req.id = sub;
		next();
	} catch (e) {
		next(new AuthorizationError());
	}
};
