import { Post, User } from "../db";
import { HandledError } from "../utils/errors";

export const getPosts = async (req, res) => {
	const { sort, order, offset, limit } = req.query;

	const { rows, count } = await Post.findAndCountAll({
		attributes: ["id", "text", "userId"],
		include: [{ model: User, attributes: ["userName"] }],
		order: [[sort || "createdAt", order || "desc"]],
		offset,
		limit
	});

	res.status(200).json({ posts: rows, totalCount: count });
};

export const createPost = async (req, res) => {
	const { id } = req;
	const { text } = req.body;

	const user = await User.findOne({ where: { id } });
	const post = await user.createPost({ text });

	res.status(201).json({
		id: post.id,
		text: post.text,
		userId: post.userId,
		user: { userName: user.userName }
	});
};

export const deletePost = async (req, res, next) => {
	const userId = req.id;
	const postId = req.params.id;

	const post = await Post.findOne({ where: { id: postId, userId } });
	if (!post) {
		next(new HandledError("Not found", 404));
		return;
	}
	post.destroy();

	res.status(200).json({ id: postId });
};

export const updatePost = async (req, res, next) => {
	const userId = req.id;
	const postId = req.params.id;
	const newPost = req.body;

	const post = await Post.findOne({ where: { id: postId, userId } });
	if (!post) {
		next(new HandledError("Not found", 404));
		return;
	}

	await post.update({ ...newPost });

	res.status(200).json(post);
};
