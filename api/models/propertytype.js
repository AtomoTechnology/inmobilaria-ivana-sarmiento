'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertyType extends Model {
    static associate(models) {
      PropertyType.hasMany(models.Property);
    }
  }
  PropertyType.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Ya existe una descripción con esas caracteristica.',
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La descripcion no puede ser nula.',
        },
        notEmpty: {
          msg: 'La descripcion no puede ser vacia.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PropertyType',
  });
  return PropertyType;
};