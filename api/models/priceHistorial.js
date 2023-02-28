'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceHistorial extends Model {
    static associate(models) {
      //  Relation
      PriceHistorial.belongsTo(models.Contract);
    }
  }
  PriceHistorial.init(
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
      },
      amount: {
        type: DataTypes.FLOAT ,
        allowNull: false,
      },
      year:{
        type: DataTypes.INTEGER ,
        allowNull: false,
      },
      porcent: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'PriceHistorial',
    }
  );
  return PriceHistorial;
};
