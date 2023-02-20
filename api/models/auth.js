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
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordChangedAt: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'auth',
  });
  auth.prototype.changePasswordAfter = function (jwtIat) {
    if (this.passwordChangedAt) {
      const changePassword = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return jwtIat < changePassword;
    }
    return false;
  };


  return auth;
};