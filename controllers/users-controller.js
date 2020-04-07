import { User } from "../models";
import { HandledError } from "../utils/errors";

export const getUser = async (req, res) => {
	const userName = req.params.username;

	const user = await User.findOne({ where: { userName } });
	if (!user) throw new HandledError("User not found.", 404);

	res.status(200).json(user);
};
