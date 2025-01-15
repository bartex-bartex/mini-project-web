'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add the status column to the Appointments table
    await queryInterface.addColumn('Appointments', 'status', {
      type: Sequelize.ENUM('available', 'reserved', 'cancelled'),
      defaultValue: 'available',
      allowNull: false,
    });

    // Remove the status column from the Schedules table
    await queryInterface.removeColumn('Schedules', 'status');
  },
    
  async down (queryInterface, Sequelize) {
    // Add the status column back to the Schedules table
    await queryInterface.addColumn('Schedules', 'status', {
      type: Sequelize.ENUM('available', 'reserved', 'cancelled'),
      defaultValue: 'available',
      allowNull: false,
    });

    // Remove the status column from the Appointments table
    await queryInterface.removeColumn('Appointments', 'status');
  }
};