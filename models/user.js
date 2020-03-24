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
				type: type.STRING,
				unique: true,
				allowNull: false
			},
			email: {
				type: type.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type: type.STRING,
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
