const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const ShoppingCart = require('./shoppingCartModel');
const Schedule = require('./scheduleModel');

const ShoppingCartItem = sequelize.define('ShoppingCartItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ShoppingCart,
      key: 'id',
    },
  },
  scheduleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Schedule,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

module.exports = ShoppingCartItem;