import {Op} from "sequelize";

import {Post, User, Tag} from "../models";
import {getTags} from "../utils/";

export const getPosts = async (req, res) => {
	const {sort, order, offset, limit, tag, mentionName} = req.query;
	const userName = req.params.userName;

	const query = {
		attributes: ["id", "text", "userId", "createdAt"],
		include: [
			{
				model: User,
				attributes: ["userName"],
				[userName && "where"]: {userName}
			},
			{
				model: Tag,
				attributes: ["tag"],
				[tag && "where"]: {tag: {[Op.iLike]: tag}}
			}
		],
		[mentionName && "where"]: {text: {[Op.regexp]: `(\\s|^)@${mentionName}(\\W|$)`}},
		order: [[sort || "createdAt", order || "desc"]],
		offset,
		limit,
	}

	const {rows, count} = await Post.findAndCountAll(query);

	res.status(200).json({posts: rows, totalCount: count});
};

export const createPost = async (req, res) => {
	const {user} = req;
	const {text} = req.body;

	const post = await user.createPost({text: text.replace(/>>>/g, "")});

	const tags = await Promise.all(
		getTags(text).map(async (tagName) => {
			const [tag] = await Tag.findOrCreate({where: {tag: tagName}});
			return tag;
		})
	);
	post.setTags(tags);

	res.status(201).json({
		...post.toJSON(),
		user,
	});
};

export const deletePost = async (req, res) => {
	const post = req.post;
	const postId = req.params.id;

	post.destroy();

	res.status(200).json({id: postId});
};

export const updatePost = async (req, res) => {
	const post = req.post;
	const text = req.body.text;

	const tags = await Promise.all(
		getTags(text).map(async (tagName) => {
			const [tag] = await Tag.findOrCreate({where: {tag: tagName}});
			return tag;
		})
	);

	await post.setTags(tags);
	await post.update({text: text.replace(/>>>/g, "")});

	res.status(200).json(post);
};

export const autocompleteTag = async (req, res) => {
	const tag = req.params.tag;

	const users = await Tag.findAll({
		where: {tag: {[Op.like]: `${tag}%`}},
		limit: 5,
	});

	res.status(200).json(users);
};
