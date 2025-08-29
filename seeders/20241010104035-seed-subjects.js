'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subjects', [
      {
        name: 'Mathematics',
        subcode: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'English',
        subcode: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tamil',
        subcode: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Social',
        subcode: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Science',
        subcode: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};
