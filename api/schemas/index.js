const { Sequelize } = require('sequelize');

// exports.dbConnect = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db/ATESPIEDSJESUS.SQLIte3',
// });

exports.dbConnect = new Sequelize('maranidb', 'root', 'jhm.ok', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});
