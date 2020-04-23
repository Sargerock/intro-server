'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "avatarUrl", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "uploads/avatars/default.png"
    })
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn("users", "avatarUrl")
  }
};
