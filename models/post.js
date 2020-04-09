import Sequelize from "sequelize";

export class Post extends Sequelize.Model {}

export default (sequelize) => {
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

	Post.associate = (models) => {
		Post.belongsTo(models.user);
		Post.belongsToMany(models.tag, { through: "posts-tags" });
	};

	return Post;
};
