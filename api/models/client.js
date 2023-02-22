'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName:{
      type: DataTypes.STRING ,
      allowNull:{
        name: false,
        msg: "Nombre completo requerido"
      }
    },
    address: {
      type: DataTypes.STRING ,
      allowNull:{
        name: false,
        msg: "Direccion requerida"
      }
    },
    phone: {
      type: DataTypes.STRING ,
      allowNull:{
        name: false,
        msg: "Telefóno requerido"
      }
    },
    email: {
      type: DataTypes.STRING ,
      allowNull:{
        name: false,
        msg: "Email requerido"
      }
    },
    cuit:{
      type: DataTypes.STRING ,
      allowNull:{
        name: false,
        msg: "C.U.I.T/C.U.I.L requerido"
      }
    },
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    obs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};