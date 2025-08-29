'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Update the data type of the column
        await queryInterface.changeColumn('students', 'name', {
            type: Sequelize.TEXT // Change this to the new data type you want
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Revert back to the original data type if rolling back
        await queryInterface.changeColumn('students', 'name', {
            type: Sequelize.STRING // Change this to the original data type
        });
    }
};
