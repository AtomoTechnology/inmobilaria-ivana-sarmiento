'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      contract.belongsTo(models.property);
      contract.belongsTo(models.client);
      //  Relation      
      contract.hasMany(models.eventuality);
    }
  }
  contract.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    PropertyId:{
      allowNull: false,
      type: DataTypes.INTEGER, 
      references: {
        model: 'property',
        key: 'id'
      }
    },
    ClientId:{
      allowNull: false,
      type: DataTypes.INTEGER, 
      references: {
        model: 'client',
        key: 'id'
      }
    },
    startDate:{
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate:{
      allowNull: false,
      type: DataTypes.DATE
    },
    nroPartWater: DataTypes.STRING,
    nroPartMuni: DataTypes.STRING,
    nroPartAPI: DataTypes.STRING,
    commision:{
      allowNull: false,
      type: DataTypes.STRING
    },
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    stamped:{
      allowNull: false,
      type: DataTypes.STRING
    },
    fees:{
      allowNull: false,
      type: DataTypes.STRING
    },
    warrantyInquiry:{
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'contract',
  });
  return contract;
};