'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Remove the column
        await queryInterface.removeColumn('students', 'mark_code'); // Replace 'columnToDelete' with the actual column name
        
    },

    down: async (queryInterface, Sequelize) => {
        // Re-add the column if you need to rollback
        await queryInterface.addColumn('students', 'mark_code', {
            type: Sequelize.STRING, // Change to the original type
            allowNull: true, // Set according to your needs
        });
    }
};
