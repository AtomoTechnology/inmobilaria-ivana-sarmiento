'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class PriceHistorial extends Model {
		static associate(models) {
			//  Relation
			PriceHistorial.belongsTo(models.Contract)
		}
	}
	PriceHistorial.init(
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
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			year: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			porcent: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: 'PriceHistorial',
			paranoid: true,
		}
	)
	return PriceHistorial
}
