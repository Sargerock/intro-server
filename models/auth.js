import Sequelize from "sequelize";

export class Auth extends Sequelize.Model {}

export default (sequelize) => {
	Auth.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			refreshToken: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			accessToken: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
		},
		{ sequelize, modelName: "auth" }
	);

	return Auth;
};
