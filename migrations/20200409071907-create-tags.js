"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("tags", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			tag: {
				type: Sequelize.STRING(64),
				unique: true,
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
		return queryInterface.dropTable("tags");
	},
};
