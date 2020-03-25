import jwt from "jsonwebtoken";

import { ValidationError } from "../utils/errors";
import { SECRET } from "../config";

export default (req, res, next) => {
	let accessToken = req.header("x-access-token");
	if (!accessToken) {
		next(new ValidationError());
		return;
	}
	accessToken = accessToken.replace("Bearer ", "");
	try {
		const { sub } = jwt.verify(accessToken, SECRET);
		req.accessToken = accessToken;
		req.id = sub;

		next();
	} catch (e) {
		res.status(401).send("Unauthorized");
	}
};
