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
      "members",
      [
        {
          id: 1,
          group_id: 1,
          name: "Shubham",
          email: "shubham@gmail.com",
          phone: "9925097714",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          group_id: 1,
          name: "Yash",
          email: "yash@gmail.com",
          phone: "7777777777",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          group_id: 1,
          name: "Sahal",
          email: "sahal@gmail.com",
          phone: "6666666666",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          group_id: 1,
          name: "Meet",
          email: "meet@gmail.com",
          phone: "5555555555",
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
    await queryInterface.bulkDelete("members", null, {});
  },
};
