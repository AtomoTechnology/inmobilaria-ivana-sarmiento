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
			type: {
				allowNull: false,
				type: DataTypes.STRING(11),
				validate: {
					notNull: {
						msg: 'El tipo no puede ser nulo.',
					},
					notEmpty: {
						msg: 'El tipo no puede ser nulo.',
					},
					isIn: {
						args: [['Factura', 'Recibo', 'Presupuesto', 'Expensas extraordinarias']],
						msg: 'El tipo no es valido.',
					}
				},

			},
			description: DataTypes.TEXT('long'),
			category: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'La categoria no puede ser nula.',
					},
					notEmpty: {
						msg: 'La categoria no puede ser nula.',
					},
					isIn: {
						args: [['Plomeria', 'Gasista', 'Electricista', 'Pintura', 'Albañileria', 'Materiales']],
						msg: 'La categoria no es valida.',
					},
				},
			},
			photo: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Budget',
			tableName: 'budgets',
		}
	)
	return Budget
}
