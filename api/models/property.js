'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Property extends Model {
		static associate(models) {
			Property.belongsTo(models.Zone)
			Property.belongsTo(models.PropertyType)
			Property.belongsTo(models.Owner)

			//  Relation
			Property.hasMany(models.Contract)
			Property.hasMany(models.Visit)
			Property.hasMany(models.Claim)
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
			ZoneId: {
				allowNull: false,
				type: DataTypes.BIGINT,
				validate: {
					notNull: {
						msg: 'La zona es obligatoria',
					},
					notEmpty: {
						msg: 'La zona es obligatoria',
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
				type: DataTypes.STRING(100),
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
				type: DataTypes.STRING(5),
				validate: {
					notNull: {
						msg: 'El número de la calle es obligatorio',
					},
					notEmpty: {
						msg: 'El número de la calle es obligatorio',
					},
				},
			},
			floor: {
				allowNull: true,
				type: DataTypes.STRING(2),
			},
			dept: {
				allowNull: true,
				type: DataTypes.STRING(2),
			},
			isFor: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: 'Alquiler',
				validate: {
					isIn: {
						args: [['Venta', 'Alquiler']],
						msg: 'El valor ingresado no está permitido.',
					},
				},
			},
			nroPartWater: DataTypes.STRING,
			nroPartMuni: DataTypes.STRING,
			nroPartAPI: DataTypes.STRING,
			nroPartGas: DataTypes.STRING,
			state: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: 'Libre',
				validate: {
					isIn: {
						args: [['Libre', 'Ocupado']],
						msg: 'El estado ingresado no está permitido.',
					},
				},
			},
			description: DataTypes.STRING,
			folderNumber: {
				allowNull: true,
				type: DataTypes.STRING,
				unique: {
					msg: 'El número de carpeta debe ser único.',
				},
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ['street', 'number', 'floor', 'dept'],
					name: 'uniqueKeyProperty',
				},
			],
			sequelize,
			modelName: 'Property',
			paranoid: true,
		}
	)
	return Property
}
