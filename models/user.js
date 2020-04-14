import Sequelize from "sequelize";
import bcrypt from "bcrypt";

export class User extends Sequelize.Model {
	toJSON() {
		const { id, userName } = this.get();
		return { id, userName };
	}
}

export default (sequelize) => {
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
		},
		{
			hooks: {
				beforeCreate: async (user) => {
					user.password = await bcrypt.hash(user.password, 10);
				},
			},
			sequelize,
			modelName: "user",
		}
	);

	User.associate = (models) => {
		User.hasMany(models.post);
	};
	return User;
};
