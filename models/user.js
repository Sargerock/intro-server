import { hashPassword } from "../utils";

export default (sequelize, type) => {
	return sequelize.define(
		"user",
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userName: {
				type: type.STRING(32),
				unique: true,
				allowNull: false
			},
			email: {
				type: type.STRING(64),
				unique: true,
				allowNull: false
			},
			password: {
				type: type.STRING(64),
				allowNull: false
			}
		},
		{
			hooks: {
				beforeCreate: async user => {
					user.password = await hashPassword(user.password);
				}
			}
		}
	);
};
