"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("settlements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "groups",
          key: "id",
        },
      },
      paid_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
      },
      paid_to: {
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      date: {
        type: Sequelize.DATE,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("settlements");
  },
};
