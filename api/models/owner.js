'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    static associate(models) {
      Owner.hasMany(models.Property);
    }
  }
  Owner.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName:{
      type: DataTypes.STRING ,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre completo es obligatorio',
        },
        notEmpty: {
          msg: 'El nombre completo es obligatorio',
        },
      },
    },
    address: {
      type: DataTypes.STRING ,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'La dirección es obligatoria',
        },
        notEmpty: {
          msg: 'La dirección es obligatoria',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique:  {
        msg: 'Ya existe un propietario con ese telefóno.',
      } ,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El telefóno es obligatorio',
        },
        notEmpty: {
          msg: 'El telefóno es obligatorio',
        },
      },
    },
    email: {
      type: DataTypes.STRING ,
      unique:  {
        msg: 'Ya existe un propietario con ese email.',
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El email es obligatorio',
        },
        notEmpty: {
          msg: 'El email es obligatorio',
        },
      },
    },
    cuit:  {
      type: DataTypes.STRING ,
      unique:  {
        msg: 'Ya existe un propietario con ese C.U.I.T/C.U.I.L.',
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El C.U.I.T/C.U.I.L es obligatorio',
        },
        notEmpty: {
          msg: 'El C.U.I.T/C.U.I.L es obligatorio',
        },
      },
    },
    nroFax: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    obs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Owner',
  });
  return Owner;
};