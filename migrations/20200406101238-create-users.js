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
				type: Sequelize.STRING(64),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("users");
	},
};
