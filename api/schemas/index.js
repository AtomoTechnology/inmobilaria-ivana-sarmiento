const { Sequelize } = require('sequelize');

exports.dbConnect = new Sequelize('iavanaDb', 'root', 'jhm.ok', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
