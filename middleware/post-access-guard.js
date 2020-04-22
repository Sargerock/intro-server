import {Post} from "../models";

export const postAccessGuard = async (req, res, next) => {
	const userId = req.user.id;
	const postId = req.params.id;

	const post = await Post.findOne({where: {id: postId}});
	if (!post) {
		return res.status(404).json({message: "Post not found"});
	}

	if (post.userId !== userId) {
		return res.status(403).json({message: "Forbidden"});
	}

	req.post = post;
	next();
};
