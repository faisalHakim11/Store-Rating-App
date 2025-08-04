const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('ratingdb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});
module.exports = sequelize;
