const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Schedule = require('./scheduleModel');
const User = require('./userModel');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
  },
  scheduleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Schedule,
      key: 'id',
    },
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visitType: {
    type: DataTypes.ENUM('initial', 'follow-up', 'chronic', 'prescription'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'reserved', 'cancelled'),
    defaultValue: 'available',
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientGender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  patientAge: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  doctorNotes: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  updatedAt: 'updatedAt',
});

module.exports = Appointment;