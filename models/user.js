import Sequelize from "sequelize";

import { hashPassword } from "../utils";

export class User extends Sequelize.Model {
	toJSON() {
		const { id, userName } = this.get();
		return { id, userName };
	}
}

export const initUser = sequelize => {
	User.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userName: {
				type: Sequelize.STRING(32),
				unique: true,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(64),
				unique: true,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING(64),
				allowNull: false
			}
		},
		{
			hooks: {
				beforeCreate: async user => {
					user.password = await hashPassword(user.password);
				}
			},
			sequelize,
			modelName: "user"
		}
	);

	// User.prototype.toJSON = function() {
	// 	const { id, userName } = this.get();
	// 	return { id, userName };
	// };
};
