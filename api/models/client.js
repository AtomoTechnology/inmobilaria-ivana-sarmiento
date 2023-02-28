'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //  Relation      
      Client.hasMany(models.Contract);
    }
  }
  Client.init({
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
      allowNull:false,
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
      type: DataTypes.STRING ,
      unique:  {
        name:true,
        msg: 'Ya existe un cliente con ese telefóno.',
      },
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
        name:true,
        msg: 'Ya existe un cliente con ese email.',
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
    cuit:{
      type: DataTypes.STRING,
      unique:  {
        name:true,
        msg: 'Ya existe un cliente con ese C.U.I.T/C.U.I.L.',
      } ,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El C.U.I.T/C.U.I.L es obligatoria',
        },
        notEmpty: {
          msg: 'El C.U.I.T/C.U.I.L es obligatoria',
        },
      },
    },
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    obs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};