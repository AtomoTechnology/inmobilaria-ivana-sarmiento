const {
	PaymentOwner,
	Eventuality,
	Client,
	Property,
	sequelize
} = require('../../models')

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

exports.GetAll = all(PaymentOwner, {
	include: [{
			model: Eventuality,
		},
		{
			model: Property,
		},
	],
})
exports.Paginate = paginate(PaymentOwner, {
	include: [{
			model: Eventuality,
		},
		{
			model: Property,
		},
	],
})

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction()
	try {
		const cont = await PaymentOwner.create(req.body, {
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

exports.GetById = findOne(PaymentOwner, {
	include: [{
			model: Eventuality,
		},
		{
			model: Property,
		},
		{
			model: Eventuality,
		},
	],
})

exports.Put = update(PaymentOwner, [
	'PaymentTypeId',
	'insurance',
	'compensation',
	'admExpenses',
	'recharge',
	'total',
	'month',
	'year',
	'totalPro',
	'eventualityDetails',
	'ExpenseDetails',
])
exports.Destroy = destroy(PaymentOwner)