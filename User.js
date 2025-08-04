const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  role: { type: DataTypes.ENUM('admin', 'user', 'store-owner'), defaultValue: 'user' },
});
module.exports = User;
