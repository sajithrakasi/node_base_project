'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('students', 'deletedAt', {
            type: Sequelize.DATE,
            allowNull: true, // This allows the column to be null for non-deleted rows
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('students', 'deletedAt');
    }
};
