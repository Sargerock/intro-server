"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("posts_tags", {
			PostId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			TagId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
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
		return queryInterface.dropTable("posts_tags");
	},
};
