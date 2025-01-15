'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add the date and time columns to the Appointments table
    await queryInterface.addColumn('Appointments', 'date', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Appointments', 'time', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove the appointmentTime column from the Appointments table
    await queryInterface.removeColumn('Appointments', 'appointmentTime');
  },

  async down (queryInterface, Sequelize) {
    // Add the appointmentTime column back to the Appointments table
    await queryInterface.addColumn('Appointments', 'appointmentTime', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // Remove the date and time columns from the Appointments table
    await queryInterface.removeColumn('Appointments', 'date');
    await queryInterface.removeColumn('Appointments', 'time');
  }
};