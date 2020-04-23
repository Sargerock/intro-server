import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../db";

export class User extends Sequelize.Model {
	toJSON() {
		const {id, userName, avatarUrl} = this.get();
		return {id, userName, avatarUrl};
	}

	static associate(models) {
		this.hasMany(models.Post);
	}
}

User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userName: {
			type: Sequelize.STRING(32),
			unique: true,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING(64),
			unique: true,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING(64),
			allowNull: false,
		},
		avatarUrl: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "uploads/avatars/default.png"
		}
	},
	{
		hooks: {
			beforeCreate: async (user) => {
				user.password = await bcrypt.hash(user.password, 10);
			},
			beforeUpdate: async (user, options) => {
				if (options.fields.includes("password")) {
					user.password = await bcrypt.hash(user.password, 10);
				}
			}
		},
		sequelize,
		modelName: "user",
	}
);
