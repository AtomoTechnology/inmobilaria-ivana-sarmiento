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
		month: {
			type: DataTypes.STRING(30),
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
		year: {
			type: DataTypes.DATE,
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
		// TGI: {
		//   type: DataTypes.STRING,
		//   allowNull: false,
		// },
		// compensation: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// },
		// bankingExpenses: {
		//   type: DataTypes.STRING,
		//   allowNull: false,
		// },
		// admExpenses: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// },
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