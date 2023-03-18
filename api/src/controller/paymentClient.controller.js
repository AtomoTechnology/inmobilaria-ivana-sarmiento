const {
	PaymentClient,
	Contract,
	PropertyType,
	sequelize
} = require('../../models')
const {
	Op
} = require('sequelize')

const {
	all,
	paginate,
	create,
	findOne,
	update,
	destroy
} = require('../Generic/FactoryGeneric')
const {
	catchAsync
} = require('../../helpers/catchAsync')

exports.GetAll = all(PaymentClient, {
	include: [{
			model: Contract,
		},
		{
			model: PropertyType,
		},
	],
})
exports.Paginate = paginate(PaymentClient, {
	include: [{
			model: Contract,
		},
		{
			model: PropertyType,
		},
	],
})

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction()
	try {
		const cont = await PaymentClient.create(req.body, {
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

exports.GetById = findOne(PaymentClient, {
	include: [{
			model: Contract,
		},
		{
			model: PropertyType,
		},
		{
			model: Contract,
		},
	],
})

exports.Put = update(PaymentClient, [
	'PaymentTypeId',
	'recharge',
	'total',
	'month',
	'year',
	'totalPro',
	'eventualityDetails',
	'expenseDetails',
])
exports.allDebt = catchAsync(async (req, res, next) => {
	const docs = await PaymentClient.findAll({
		where: {

		},
	})
})

exports.Destroy = destroy(PaymentClient)