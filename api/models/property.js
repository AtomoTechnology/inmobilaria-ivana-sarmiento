'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       property.belongsTo(models.zone);
       property.belongsTo(models.propertyType);
       property.belongsTo(models.owner);
    }
  }
  property.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ZoneId:{
      allowNull: false,
      type: DataTypes.INTEGER, 
      references: {
        model: 'zone',
        key: 'id'
      }
    },
    PropertyTypeId:{
      allowNull: false,
      type: DataTypes.INTEGER, 
      references: {
        model: 'propertyType',
        key: 'id'
      }
    },
    OwnerId: {
      allowNull: false,
      type: DataTypes.INTEGER, 
      references: {
        model: 'owner',
        key: 'id'
      }
    },
    street:{
      allowNull: false,
      type: DataTypes.STRING
    },
    number:{
      allowNull: false,
      type: DataTypes.STRING
    },
    floor: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dept: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isFor:{
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue:"Alquiler"
    },
    status:{
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue:"Libre"
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'property',
  });
  return property;
};