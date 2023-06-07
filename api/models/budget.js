'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Budget extends Model {
		static associate(models) {
			//  Relation
			Budget.belongsTo(models.Property)
		}
	}
	Budget.init(
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
						msg: 'Debe seleccionar una propiedad',
					},
					notEmpty: {
						msg: 'Debe seleccionar una propiedad',
					},
				},
			},
			state: {
				allowNull: false,
				type: DataTypes.STRING(10),
				defaultValue: 'Abierto',
				validate: {
					isIn: [['Abierto', 'Cerrado']],
				},
			},
			details: {
				type: DataTypes.TEXT('long'),
				allowNull: true,
				get: function () {
					if (!this.getDataValue('details')) return []
					return JSON.parse(this.getDataValue('details'))
				},
				set: function (value) {
					return this.setDataValue('details', JSON.stringify(value))
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'La descripción no puede ser nulo.',
					},
					notEmpty: {
						msg: 'La descripción no puede ser nulo.',
					},
				},
			},
		},
		{
			sequelize,
			paranoid: true,
			modelName: 'Budget',
			tableName: 'Budgets',
		}
	)
	return Budget
}
