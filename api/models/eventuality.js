'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventuality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //  Relation      
      eventuality.belongsTo(models.contract);
    }
  }
  eventuality.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ContractId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    expiredDate:{
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'eventuality',
  });
  return eventuality;
};