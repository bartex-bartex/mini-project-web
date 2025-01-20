'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Appointments', {
      fields: ['date', 'time'],
      type: 'unique',
      name: 'unique_date_time_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Appointments', 'unique_date_time_constraint');
  }
};