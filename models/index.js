import { Post } from "./post";
import { Tag } from "./tag";
import { User } from "./user";

const models = { Post, User, Tag };

Object.values(models)
	.filter((model) => typeof model.associate === "function")
	.forEach((model) => model.associate(models));

module.exports = models;
