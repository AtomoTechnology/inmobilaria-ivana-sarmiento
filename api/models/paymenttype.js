'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentType extends Model {
    static associate(models) {
      // define association here
      PaymentType.hasMany(models.Payment);
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
      type: DataTypes.STRING,
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
      },
    }
  }, {
    sequelize,
    modelName: 'PaymentType',
  });
  return PaymentType;
};