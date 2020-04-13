const { Op } = require("sequelize");

import { Post, User, Tag } from "../models";
import { HandledError } from "../utils/errors";

export const getPosts = async (req, res) => {
	const { sort, order, offset, limit, tag } = req.query;
	const userName = req.params.userName;

	const include = [
		{
			model: User,
			attributes: ["userName"],
		},
		{
			model: Tag,
			attributes: ["tag"],
		},
	];

	if (userName) include[0].where = { userName };
	if (tag) include[1].where = { tag };

	const { rows, count } = await Post.findAndCountAll({
		attributes: ["id", "text", "userId", "createdAt"],
		include: include,
		order: [[sort || "createdAt", order || "desc"]],
		offset,
		limit,
	});

	res.status(200).json({ posts: rows, totalCount: count });
};

export const createPost = async (req, res) => {
	const { user } = req;
	const { text, tags } = req.body;

	const post = await user.createPost({ text });

	if (tags) {
		for (let i = 0; i < tags.length; i++) {
			const [tag] = await Tag.findOrCreate({
				where: { tag: tags[i].toLowerCase() },
			});
			post.addTag(tag);
		}
	}

	res.status(201).json({
		...post.toJSON(),
		user: { userName: user.userName },
	});
};

export const deletePost = async (req, res) => {
	const userId = req.id;
	const postId = req.params.id;

	const post = await Post.findOne({ where: { id: postId, userId } });
	if (!post) throw new HandledError("Not found", 404);
	post.destroy();

	res.status(200).json({ id: postId });
};

export const updatePost = async (req, res) => {
	const userId = req.id;
	const postId = req.params.id;
	const { text, tags: reqTags } = req.body;

	const post = await Post.findOne({ where: { id: postId, userId } });
	if (!post) throw new HandledError("Not found", 404);

	if (reqTags) {
		const tags = [];
		for (let i = 0; i < reqTags.length; i++) {
			const [tag] = await Tag.findOrCreate({
				where: { tag: reqTags[i].toLowerCase() },
			});
			tags.push(tag);
		}
		await post.setTags(tags);
	}
	await post.update({ text });

	res.status(200).json(post);
};

export const findTags = async (req, res) => {
	const tag = req.params.tag;

	const users = await Tag.findAll({
		where: { tag: { [Op.like]: `${tag}%` } },
		limit: 5,
	});

	res.status(200).json(users);
};
