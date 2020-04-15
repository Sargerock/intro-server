"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("posts-tags", {
			postId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			tagId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
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
		return queryInterface.dropTable("posts-tags");
	},
};
