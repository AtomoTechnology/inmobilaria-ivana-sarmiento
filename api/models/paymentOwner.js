'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentOwner extends Model {
    static associate(models) {
      //  Relation
      PaymentOwner.belongsTo(models.Owner);
      PaymentOwner.belongsTo(models.PaymentType);
    }
  }
  PaymentOwner.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    OwnerId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      validate: {
        notNull: {
          msg: 'El propietario es obligatorio',
        },
        notEmpty: {
          msg: 'El propietario es obligatorio',
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
    month: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El mes de pago es obligatorio",
        },
        notEmpty: {
          msg: "El mes de pago es obligatorio",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El año de pago es obligatorio",
        },
        notEmpty: {
          msg: "El año de pago es obligatorio",
        },
      },
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El total de pago es obligatorio",
        },
        notEmpty: {
          msg: "El total de pago es obligatorio",
        },
      },
    },
    expenseDetails: {
      type: DataTypes.TEXT("long"),
      get: function () {
        if (!this.getDataValue("expenseDetails")) return null;
        return JSON.parse(this.getDataValue("expenseDetails"));
      },
      set: function (value) {
        return this.setDataValue(
          "expenseDetails",
          JSON.stringify(value || "")
        );
      },
    },
    eventualityDetails: {
      type: DataTypes.TEXT("long"),
      get: function () {
        if (!this.getDataValue("eventualityDetails")) return null;
        return JSON.parse(this.getDataValue("eventualityDetails"));
      },
      set: function (value) {
        return this.setDataValue(
          "eventualityDetails",
          JSON.stringify(value || "")
        );
      },
    },
    createdAt: DataTypes.DATEONLY,
  }, {
    indexes: [
      {
        unique: true,
        fields: ["OwnerId", "month", "year"],
      },
    ],
    paranoid: true,
    sequelize,
    tableName : 'paymentowners',
    modelName: 'PaymentOwner',
  });
  return PaymentOwner;
};