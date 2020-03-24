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
	const { id, email } = jwt.verify(accessToken, SECRET);
	req.accessToken = accessToken;
	req.id = id;
	req.email = email;

	next();
};
