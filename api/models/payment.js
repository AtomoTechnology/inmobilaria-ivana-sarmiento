'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      //  Relation
      Payment.belongsTo(models.Contract);
      Payment.belongsTo(models.PaymentType);
    }
  }
  Payment.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ContractId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'El contrato es obligatorio',
          },
          notEmpty: {
            msg: 'El contrato es obligatorio',
          },
        },
      },
      PaymentTypeId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'El forma de pago es obligatorio',
          },
          notEmpty: {
            msg: 'El forma de pago es obligatorio',
          },
        },
      },
      insurance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      water: {
        type: DataTypes.STRING(30),
        allowNull:false,
      },
      TGI: {
        type: DataTypes.STRING ,
        allowNull: false,
      },
      compensation: {
        type: DataTypes.STRING ,
        allowNull: false,
      },
      bankingExpenses:{
        type: DataTypes.STRING ,
        allowNull: false,
      },
      admExpenses:{
        type: DataTypes.STRING ,
        allowNull: false,
      },
      recharge:{
        type: DataTypes.STRING ,
        allowNull: false,
      },
      total:{
        type: DataTypes.STRING ,
        allowNull: false,
      },
      totalPro: {
        type: DataTypes.STRING ,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
    }
  );
  return Payment;
};
