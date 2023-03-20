const { DebtOwner, Contract, sequelize } = require('../../models')

const { all, findOne, update, destroy } = require('../Generic/FactoryGeneric')
const { catchAsync } = require('../../helpers/catchAsync')

exports.GetAll = all(DebtOwner, {
	include: [
		{
			model: Contract,
		},
	],
})

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction()
	try {
		const cont = await DebtOwner.create(req.body, {
			transaction: transact,
		})

		await transact.commit()
		return res.json({
			code: 200,
			status: 'success',
			ok: true,
			message: 'El registro fue guardado con exito',
			data: cont,
		})
	} catch (error) {
		await transact.rollback()
		throw error
	}
})

exports.GetById = findOne(DebtOwner, {
	include: [
		{
			model: Contract,
		},
	],
})

exports.Put = update(DebtOwner, ['month', 'year', 'ExpenseDetails'])

exports.Destroy = destroy(DebtOwner)
