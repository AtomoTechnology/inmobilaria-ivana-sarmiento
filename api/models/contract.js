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
				type: DataTypes.DATEONLY,
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
				type: DataTypes.DATEONLY,
				validate: {
					notNull: {
						msg: 'La fecha fin es obligatoria',
					},
					notEmpty: {
						msg: 'La fecha fin es obligatoria',
					},
					isGreaterThanStartDate(value) {
						if (value <= this.startDate) {
							throw new Error('La fecha fin del contrato debe ser mayor a la fecha de inicio.')
						}
					},
				},
			},
			// commission: {
			// 	allowNull: false,
			// 	type: DataTypes.FLOAT,
			// 	validate: {
			// 		notNull: {
			// 			msg: 'La comisión es obligatoria',
			// 		},
			// 		notEmpty: {
			// 			msg: 'La comisión es obligatoria',
			// 		},
			// 	},
			// },
			state: {
				type: DataTypes.STRING,
				defaultValue: 'En curso',
				validate: {
					isIn: {
						args: [['En curso', 'Finalizado']],
						msg: 'El estado igresado no está permitido.',
					},
				},
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'El valor del contrato es obligatorio',
					},
					notEmpty: {
						msg: 'El valor del contrato es obligatorio',
					},
				},
			},
			booking: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			deposit: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			description: DataTypes.STRING,
			// stamped: {
			// 	allowNull: true,
			// 	type: DataTypes.FLOAT,
			// },
			// fees: {
			// 	allowNull: true,
			// 	type: DataTypes.FLOAT,
			// },
			// warrantyInquiry: {
			// 	allowNull: true,
			// 	type: DataTypes.FLOAT,
			// },
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
