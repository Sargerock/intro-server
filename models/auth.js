export default (sequelize, type) => {
	return sequelize.define("auth", {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		refreshToken: {
			type: type.STRING,
			unique: true,
			allowNull: false
		},
		accessToken: {
			type: type.STRING,
			unique: true,
			allowNull: false
		}
	});
};
