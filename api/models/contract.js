'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Contract extends Model {
		static associate(models) {
			Contract.belongsTo(models.Property)
			Contract.belongsTo(models.Client)

			//  Relation
			Contract.hasMany(models.Eventuality)
			Contract.hasMany(models.PriceHistorial)
			Contract.hasMany(models.Assurance)
			Contract.hasMany(models.ClientExpense)
			Contract.hasMany(models.OwnerExpense)
			Contract.hasMany(models.PaymentClient)
			Contract.hasMany(models.PaymentOwner)
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
			PropertyId: {
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
			ClientId: {
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
			commission: {
				allowNull: false,
				type: DataTypes.FLOAT,
				validate: {
					notNull: {
						msg: 'La comisión es obligatoria',
					},
					notEmpty: {
						msg: 'La comisión es obligatoria',
					},
				},
			},
			state: {
				type: DataTypes.STRING,
				defaultValue: 'En curso',
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			description: DataTypes.STRING,
			stamped: {
				allowNull: true,
				type: DataTypes.FLOAT,
			},
			fees: {
				allowNull: true,
				type: DataTypes.FLOAT,
			},
			warrantyInquiry: {
				allowNull: true,
				type: DataTypes.FLOAT,
			},
		},
		{
			indexes: [
				{
					unique: true,
					fields: ['PropertyId', 'ClientId', 'startDate', 'endDate'],
				},
			],
			sequelize,
			modelName: 'Contract',
			paranoid: true,
		}
	)
	return Contract
}
