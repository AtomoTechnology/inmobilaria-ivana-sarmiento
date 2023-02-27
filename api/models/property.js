'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.Zone);
      Property.belongsTo(models.PropertyType);
      Property.belongsTo(models.Owner);

      //  Relation
      Property.hasMany(models.Contract);
    }
  }
  Property.init(
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
      ZoneId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'La zona es obligatorio',
          },
          notEmpty: {
            msg: 'La zona es obligatorio',
          },
        },
      },
      PropertyTypeId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'El tipo de propiedad es obligatorio',
          },
          notEmpty: {
            msg: 'El tipo de propiedad es obligatorio',
          },
        },
      },
      OwnerId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        validate: {
          notNull: {
            msg: 'El dueño es obligatorio',
          },
          notEmpty: {
            msg: 'El dueño es obligatorio',
          },
        },
      },
      street: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'La calle es obligatoria',
          },
          notEmpty: {
            msg: 'La calle es obligatoria',
          },
        },
      },
      number: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: 'El numero de la calle es obligatorio',
          },
          notEmpty: {
            msg: 'El numero de la calle es obligatorio',
          },
        },
      },
      floor: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      dept: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      isFor: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'Alquiler',
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'Libre',
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Property',
    }
  );
  return Property;
};
