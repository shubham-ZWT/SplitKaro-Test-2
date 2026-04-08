"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "expense_split",
      [
        //Expense 1 equal
        {
          expense_id: 1,
          member_id: 1,
          amount_owed: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 1,
          member_id: 2,
          amount_owed: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 1,
          member_id: 3,
          amount_owed: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 1,
          member_id: 4,
          amount_owed: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        //Expense 2 equal
        {
          expense_id: 2,
          member_id: 1,
          amount_owed: 750,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 2,
          member_id: 2,
          amount_owed: 750,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 2,
          member_id: 3,
          amount_owed: 750,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 2,
          member_id: 4,
          amount_owed: 750,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        //Expense 3 exact
        {
          expense_id: 3,
          member_id: 1,
          amount_owed: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 3,
          member_id: 3,
          amount_owed: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 3,
          member_id: 3,
          amount_owed: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 3,
          member_id: 4,
          amount_owed: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        //Expense 4 Percentage (30,30,20,20)
        {
          expense_id: 4,
          member_id: 1,
          amount_owed: 900,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 4,
          member_id: 2,
          amount_owed: 900,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 4,
          member_id: 3,
          amount_owed: 600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          expense_id: 4,
          member_id: 4,
          amount_owed: 600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */

    await queryInterface.bulkDelete("expense_split", null, {});
  },
};
