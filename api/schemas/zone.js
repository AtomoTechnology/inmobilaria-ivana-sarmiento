'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class zone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      zone.hasMany(models.property);
    }
  }
  zone.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique:{
          name: true,
          msg: "El nombre debe ser único"
        },
      allowNull: false,
      validate:{
        
      }
    }
  }, {
    sequelize,
    modelName: 'zone',
  });
  return zone;
};