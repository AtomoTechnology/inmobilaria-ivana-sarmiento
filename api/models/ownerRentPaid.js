
'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class OwnerRentPaid extends Model {
        static associate(models) {

        }
    }
    OwnerRentPaid.init(
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.BIGINT,
                autoIncrement: true,
            },
            PaymentOwnerId: {
                allowNull: false,
                type: DataTypes.BIGINT,
                validate: {
                    notNull: {
                        msg: 'El pago es obligatorio',
                    },
                    notEmpty: {
                        msg: 'El pago es obligatorio',
                    },
                },
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
            OwnerId: {
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
            month: {
                type: DataTypes.STRING(15),
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "El mes de pago es obligatorio",
                    },
                    notEmpty: {
                        msg: "El mes de pago es obligatorio",
                    },
                },
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "El año de pago es obligatorio",
                    },
                    notEmpty: {
                        msg: "El año de pago es obligatorio",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: 'OwnerRentPaid',
            tableName: 'ownerrentpaids',
            // paranoid: true,
        }
    )
    return OwnerRentPaid
}
