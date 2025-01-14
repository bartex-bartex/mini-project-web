const { Sequelize } = require('sequelize');
const { dbUri } = require('./config');

const sequelize = new Sequelize(dbUri, {
  dialect: 'postgres',
});

module.exports = sequelize;