'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('students', 'student_code', {
      type:  Sequelize.BIGINT,
      allowNull: false,
      unique: true,
    });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('students', 'student_code');
  }
};
