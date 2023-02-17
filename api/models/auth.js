'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  auth.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    restPassword: DataTypes.STRING,
    changePassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'auth',
  });
  return auth;
};