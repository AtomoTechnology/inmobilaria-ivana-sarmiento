const { DataTypes } = require('sequelize');
const { dbConnect } = require('./index');

const zona = dbConnect.define(
  'zona',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        msg: 'Ya existe otra zona con ese nombre.',
      },
      validate: {
        notNull: {
          msg: 'El nombre no puede ser nulo.',
        },
        notEmpty: {
          msg: 'El nombre no puede ser vacio.',
        },
        len: {
          args: [2, 50],
          msg: 'El nombre debe tener entre 3 a 50 caracteres.',
        },
      },
    },
  },
  {
    tableName: 'zones',
  }
);
module.exports = zona;
