export default (sequelize, type) => {
	return sequelize.define("post", {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		text: {
			type: type.STRING(512),
			allowNull: false
		}
	});
};
