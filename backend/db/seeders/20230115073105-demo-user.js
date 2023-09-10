'use strict';
const bcypt = require('bcrypt');

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
    try {
      await queryInterface.bulkInsert(
        'roles',
        [
          {
            id: 1,
            name: 'admin',
          },
          {
            id: 2,
            name: 'editor',
          },
          {
            id: 3,
            name: 'viewer',
          }
        ],
        {}
      );

      await queryInterface.bulkInsert(
        'users',
        [
          {
            name: 'Admin',
            email: 'admin@admin.com',
            username: 'admin',
            password: bcypt.hashSync('12345', 10),
            role_id: 1,
          },
        ],
        {}
      );
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {}, {});
    await queryInterface.bulkDelete('roles', {}, {});
  },
};
