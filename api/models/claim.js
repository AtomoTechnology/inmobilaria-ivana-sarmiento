'use strict';
const {
  json
} = require('body-parser');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    static associate(models) {
      //  Relation
      Claim.belongsTo(models.Property);
    }
  }
  Claim.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    PropertyId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      validate: {
        notNull: {
          msg: 'Debe seleccionar una propiedad',
        },
        notEmpty: {
          msg: 'Debe seleccionar una propiedad',
        },
      },
    },
    state: {
      allowNull: true,
      type: DataTypes.STRING(150),
      defaultValue: "Abierto",
      validate: {
        isIn: [
          ['Abierto', 'Cerrado']
        ]
      }
    },
    details: {
      type: DataTypes.TEXT('long'),
      get: function () {
        return JSON.parse(this.getDataValue("details"));
      },
      set: function (value) {
        return this.setDataValue("details", JSON.stringify(value));
      }
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    paranoid: true,
    sequelize,
    modelName: 'Claim',
  });
  return Claim;
};