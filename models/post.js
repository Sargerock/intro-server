import Sequelize from "sequelize";
import sequelize from "../db";

export class Post extends Sequelize.Model {
	static associate(models) {
		this.belongsTo(models.User);
		this.belongsToMany(models.Tag, { through: "posts-tags" });
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
	{ sequelize, modelName: "post" }
);
