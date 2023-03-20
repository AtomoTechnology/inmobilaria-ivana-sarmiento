'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class DebtOwner extends Model {
		static associate(models) {
			//  Relation
			DebtOwner.belongsTo(models.Contract)
		}
	}
	DebtOwner.init(
		{
			id: {
				primaryKey: true,
				allowNull: false,
				type: DataTypes.BIGINT,
				autoIncrement: true,
			},
			ContractId: {
				allowNull: false,
				type: DataTypes.BIGINT,
				validate: {
					notNull: {
						msg: 'El contrato es obligatorio',
					},
					notEmpty: {
						msg: 'El contrato es obligatorio',
					},
				},
			},

			year: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'El año de pago es obligatorio',
					},
					notEmpty: {
						msg: 'El año de pago es obligatorio',
					},
				},
			},
			rentingAmount: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'El monto del alquiler  es obligatorio',
					},
					notEmpty: {
						msg: 'El  monto del alquiler es obligatorio',
					},
				},
			},
			month: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'El mes de pago es obligatorio',
					},
					notEmpty: {
						msg: 'El mes de pago es obligatorio',
					},
				},
			},
			paid: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			total: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			expenseDetails: {
				type: DataTypes.TEXT('long'),
				get: function () {
					if (!this.getDataValue('expenseDetails')) return null
					return JSON.parse(this.getDataValue('expenseDetails'))
				},
				set: function (value) {
					return this.setDataValue('expenseDetails', JSON.stringify(value || ''))
				},
			},
		},
		{
			paranoid: true,
			sequelize,
			modelName: 'DebtOwner',
		}
	)
	return DebtOwner
}
