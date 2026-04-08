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
      "expenses",
      [
        {
          id: 1,
          group_id: 1,
          paid_by: 1,
          amount: 2000,
          description: "Train ticket",
          split_type: "equal",
          date: new Date("2026-04-01"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          group_id: 1,
          paid_by: 2,
          amount: 3000,
          description: "Food",
          split_type: "equal",
          date: new Date("2026-04-02"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          group_id: 1,
          paid_by: 3,
          amount: 5000,
          description: "Things",
          split_type: "exact",
          date: new Date("2026-04-02"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          group_id: 1,
          paid_by: 4,
          amount: 3000,
          description: "Scootyy",
          split_type: "percentage",
          date: new Date("2026-04-03"),
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
     *
     */
    await queryInterface.bulkDelete("expenses", null, {});
  },
};
