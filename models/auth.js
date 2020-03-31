import Sequelize from "sequelize";

export class Auth extends Sequelize.Model {}

export const initAuth = sequelize => {
	Auth.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			refreshToken: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			accessToken: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			}
		},
		{ sequelize, modelName: "auth" }
	);
};
