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
            name: 'purchasing',
          },
          {
            id: 3,
            name: 'warehouse',
          },
          {
            id: 4,
            name: 'HCGA',
          },
          {
            id: 5,
            name: 'PLANT',
          },
          {
            id: 6,
            name: 'SHE',
          },
          {
            id: 7,
            name: 'PRODUKSI',
          },
          {
            id: 8,
            name: 'ENGINEERING',
          },
          {
            id: 9,
            name: 'TDC',
          },
          {
            id: 10,
            name: 'FA-LOG',
          },
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
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};
