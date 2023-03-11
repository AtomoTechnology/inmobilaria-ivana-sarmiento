'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Eventuality extends Model {
		static associate(models) {
			//  Relation
			Eventuality.belongsTo(models.Contract)
		}
	}
	Eventuality.init(
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
			clientAmount: {
				allowNull: false,
				type: DataTypes.FLOAT,
				validate: {
					notNull: {
						msg: 'La cantidad es obligatoria',
					},
					notEmpty: {
						msg: 'La cantidad es obligatoria',
					},
				},
			},
			ownerAmount: {
				allowNull: false,
				type: DataTypes.FLOAT,
				validate: {
					notNull: {
						msg: 'La cantidad es obligatoria',
					},
					notEmpty: {
						msg: 'La cantidad es obligatoria',
					},
				},
			},
			clientPaid: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			ownerPaid: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			description: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			expiredDate: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			modelName: 'Eventuality',
			paranoid: true,
		}
	)
	return Eventuality
}
