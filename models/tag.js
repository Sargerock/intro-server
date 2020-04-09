import Sequelize from "sequelize";

export class Tag extends Sequelize.Model {}

export default (sequelize) => {
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

	Tag.associate = (models) => {
		Tag.belongsToMany(models.post, { through: "posts-tags" });
	};

	return Tag;
};
