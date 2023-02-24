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
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
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