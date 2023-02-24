'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.Property);
      Contract.belongsTo(models.Client);
      //  Relation
      Contract.hasMany(models.Eventuality);
    }
  }
  Contract.init(
    {
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
      PropertyId:{
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'El propietario es obligatorio',
          },
          notEmpty: {
            msg: 'El propietario es obligatorio',
          },
        },
      },
      ClientId:{
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'El cliente es obligatorio',
          },
          notEmpty: {
            msg: 'El cliente es obligatorio',
          },
        },
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: {
            msg: 'La fecha del comienzo es obligatoria',
          },
          notEmpty: {
            msg: 'La fecha del comienzo es obligatoria',
          },
        },
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: {
            msg: 'La fecha fin es obligatoria',
          },
          notEmpty: {
            msg: 'La fecha fin es obligatoria',
          },
        },
      },
      nroPartWater: DataTypes.STRING,
      nroPartMuni: DataTypes.STRING,
      nroPartAPI: DataTypes.STRING,
      commision: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'La comisión es obligatoria',
          },
          notEmpty: {
            msg: 'La comisión es obligatoria',
          },
        },
      },
      status: DataTypes.STRING,
      description: DataTypes.STRING,
      stamped: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'la sellada es obligatoria',
          },
          notEmpty: {
            msg: 'La sellada es obligatoria',
          },
        },
      },
      fees: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'El honorario es obligatorio',
          },
          notEmpty: {
            msg: 'El honorario es obligatorio',
          },
        },
      },
      warrantyInquiry: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'la consulta de garantía es obligatoria',
          },
          notEmpty: {
            msg: 'La consulta de garantía es obligatoria',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Contract',
    }
  );
  return Contract;
};
