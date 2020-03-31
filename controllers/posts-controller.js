import { Post } from "../models/post";
import { User } from "../models/user";
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
	const { user } = req;
	const { text } = req.body;

	const post = await user.createPost({ text });

	res.status(201).json({
		...post.toJSON(),
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
	const text = req.body.text;

	const post = await Post.findOne({ where: { id: postId, userId } });
	if (!post) {
		next(new HandledError("Not found", 404));
		return;
	}

	await post.update({ text });

	res.status(200).json(post);
};
