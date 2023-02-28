'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zone extends Model {
    static associate(models) {
      Zone.hasMany(models.Property);
    }
  }
  Zone.init({
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        name:true,
        msg: 'Ya existe otra zona con ese nombre.',
      },
      validate: {
        notNull: {
          msg: 'El nombre no puede ser nulo.',
        },
        notEmpty: {
          msg: 'El nombre no puede ser vacio.',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Zone',
  });
  return Zone;
};