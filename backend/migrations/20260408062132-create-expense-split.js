"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("expense_split", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      expense_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "expenses",
          key: "id",
        },
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "members",
          key: "id",
        },
      },
      amount_owed: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("expense_split");
  },
};
