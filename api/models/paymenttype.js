'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentType extends Model {
    static associate(models) {
      // define association here
      PaymentType.hasMany(models.PaymentClient);
    }
  }
  PaymentType.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(80),
      unique: {
        msg: 'Ya existe un tipo de pago con ese nombre.',
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre de tipo de pago es obligatorio',
        },
        notEmpty: {
          msg: 'El nombre de tipo de pago es obligatorio',
        },
        len: {
          args: [1, 80],
          msg: 'El nombre de tipo de pago debe tener entre 1 y 80 caracteres',
        }
      },
    }
  }, {
    paranoid: true,
    sequelize,
    tableName : 'paymenttypes',
    modelName: 'PaymentType',
  });
  return PaymentType;
};