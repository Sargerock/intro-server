import { Post } from "../models";

export const postAccessGuard = async (req, res, next) => {
	const userId = req.user.id;
	const postId = req.params.id;

	const post = await Post.findOne({ where: { id: postId } });
	if (!post) {
		res.status(404).json({ message: "Post not found" });
		return;
	}

	if (post.userId !== userId) {
		res.status(403).json({ message: "Forbidden" });
		return;
	}

	req.post = post;
	next();
};
