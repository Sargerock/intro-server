import { Post, User } from "../db";

export const getPosts = async (req, res) => {
	const { sort, order, offset, limit } = req.query;

	const posts = await Post.findAll({
		attributes: ["id", "text", "userId"],
		order: [[sort || "createdAt", order || "desc"]],
		offset,
		limit
	});

	res.status(200).json(posts);
};

export const createPost = async (req, res) => {
	const { id } = req;
	const { text } = req.body;

	const user = await User.findOne({ where: { id } });
	const post = await user.createPost({ text });

	res.status(201).json(post);
};

export const deletePost = async (req, res) => {
	const userId = req.id;
	const postId = req.params.id;

	const post = await Post.findOne({ where: { id: postId, userId } });
	if (!post) {
		res.status(404).send("Not found");
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
		res.status(404).send("Not found");
		return;
	}

	await post.update({ ...newPost }, { attributes: ["id", "text", "userId"] });

	res.status(200).json(post);
};
