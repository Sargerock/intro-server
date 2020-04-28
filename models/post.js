import Sequelize from "sequelize";

import sequelize from "../db";
import {getTags} from "../utils";

export class Post extends Sequelize.Model {
	static associate(models) {
		this.belongsTo(models.User);
		this.belongsToMany(models.Tag, {through: "posts-tags"});
	}

	async setTagsFromText(text) {
		const tags = await Promise.all(
			getTags(text).map(async (tagName) => {
				const [tag] = await sequelize.model("tag").findOrCreate({where: {tag: tagName}});
				return tag;
			})
		);
		this.setTags(tags);
	}
}

Post.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: Sequelize.STRING(512),
			allowNull: false,
		},
	},
	{sequelize, modelName: "post"}
);
