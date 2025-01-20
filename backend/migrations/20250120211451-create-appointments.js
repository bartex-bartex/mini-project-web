'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      scheduleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Schedules',
          key: 'id',
        },  
        onDelete: 'CASCADE',
      },
      patientId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slots: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      visitType: {
        type: Sequelize.ENUM('initial', 'follow-up', 'chronic', 'prescription'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('available', 'reserved', 'cancelled'),
        defaultValue: 'available',
      },
      patientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patientGender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      patientAge: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
      },
      doctorNotes: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointments');
  },
};