import Sequelize from "sequelize";

export class Post extends Sequelize.Model {}

export const initPost = sequelize => {
	Post.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			text: {
				type: Sequelize.STRING(512),
				allowNull: false
			}
		},
		{ sequelize, modelName: "post" }
	);
};
