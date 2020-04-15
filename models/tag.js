import Sequelize from "sequelize";
import sequelize from "../db";

export class Tag extends Sequelize.Model {
	static associate(models) {
		this.belongsToMany(models.Post, { through: "posts-tags" });
	}
}

Tag.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		tag: {
			type: Sequelize.STRING(64),
			allowNull: false,
		},
	},
	{ sequelize, modelName: "tag" }
);
