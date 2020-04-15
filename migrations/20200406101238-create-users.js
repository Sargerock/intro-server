"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("users", {
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
				type: Sequelize.STRING(128),
				allowNull: false,
			},
			createdAt: {
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			updatedAt: {
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable("users");
	},
};
