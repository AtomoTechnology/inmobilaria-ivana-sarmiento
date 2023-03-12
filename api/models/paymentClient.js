'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class PaymentClient extends Model {
		static associate(models) {
			//  Relation
			PaymentClient.belongsTo(models.Contract)
			PaymentClient.belongsTo(models.PaymentType)
		}
	}
	PaymentClient.init(
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
			PaymentTypeId: {
				allowNull: false,
				type: DataTypes.BIGINT,
				validate: {
					notNull: {
						msg: 'El forma de pago es obligatorio',
					},
					notEmpty: {
						msg: 'El forma de pago es obligatorio',
					},
				},
			},
			insurance: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			// water: {
			//   type: DataTypes.STRING(30),
			//   allowNull: false,
			// },
			// TGI: {
			//   type: DataTypes.STRING,
			//   allowNull: false,
			// },
			compensation: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			// bankingExpenses: {
			//   type: DataTypes.STRING,
			//   allowNull: false,
			// },
			admExpenses: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			recharge: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			total: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			totalPro: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ExpenseDetails: {
				type: DataTypes.TEXT('long'),
				get: function () {
					if (!this.getDataValue('ExpenseDetails')) return null
					return JSON.parse(this.getDataValue('ExpenseDetails'))
				},
				set: function (value) {
					return this.setDataValue('ExpenseDetails', JSON.stringify(value || ''))
				},
			},
			eventualityDetails: {
				type: DataTypes.TEXT('long'),
				get: function () {
					if (!this.getDataValue('eventualityDetails')) return null
					return JSON.parse(this.getDataValue('eventualityDetails'))
				},
				set: function (value) {
					return this.setDataValue('eventualityDetails', JSON.stringify(value || ''))
				},
			},
		},
		{
			paranoid: true,
			sequelize,
			modelName: 'PaymentClient',
		}
	)
	return PaymentClient
}
