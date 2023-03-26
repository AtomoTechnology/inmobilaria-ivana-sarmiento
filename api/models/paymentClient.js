'use strict'
const {
	Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class PaymentClient extends Model {
		static associate(models) {
			//  Relation
			PaymentClient.belongsTo(models.Contract)
			PaymentClient.belongsTo(models.PaymentType)
		}
	}
	PaymentClient.init({
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

		recharge: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
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
			type: DataTypes.STRING(15),
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
		total: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'El total de pago es obligatorio',
				},
				notEmpty: {
					msg: 'El total de pago es obligatorio',
				},
			},
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
	}, {
		paranoid: true,
		sequelize,
		modelName: 'PaymentClient',
	})
	return PaymentClient
}