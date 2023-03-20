const {
	PaymentClient,
	Eventuality,
	DebtClient,
	Client,
	Property,
	PaymentType,
	Contract,
	sequelize,
} = require('../../models')

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric')
const { catchAsync } = require('../../helpers/catchAsync')

exports.GetAll = all(PaymentClient, {
	include: [
		{
			model: Contract,
			include: { model: Property },
		},
		{
			model: PaymentType,
		},
	],
})
exports.Paginate = paginate(PaymentClient, {
	include: [
		{
			model: Contract,
		},
		{
			model: PaymentType,
		},
	],
})

exports.Post = catchAsync(async (req, res, next) => {
	// console.log(req.body)
	// return
	const transact = await sequelize.transaction()
	try {
		const payment = await PaymentClient.create(req.body, {
			transaction: transact,
		})

		if (req.body.expenseDetails.length > 0) {
			for (let j = 0; j < req.body.expenseDetails.length; j++) {
				if (req.body.expenseDetails[j].debt) {
					await DebtClient.update(
						{ paid: true, paidDate: new Date() },
						{ where: { id: req.body.expenseDetails[j].id } }
					)
				}
			}
		}

		if (req.body.eventualityDetails.length > 0) {
			for (let j = 0; j < req.body.eventualityDetails.length; j++) {
				await Eventuality.update({ clientPaid: true }, { where: { id: req.body.eventualityDetails[j].id } })
			}
		}

		await transact.commit()
		return res.json({
			code: 200,
			status: 'success',
			ok: true,
			message: 'El registro fue guardado con exito',
			data: payment,
		})
	} catch (error) {
		await transact.rollback()
		throw error
	}
})

exports.GetById = findOne(PaymentClient, {
	include: [
		{
			model: Contract,
		},
		{
			model: PaymentType,
		},
	],
})

exports.Put = update(PaymentClient, [
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
exports.allDebt = (req, res, next) => {}

exports.Destroy = destroy(PaymentClient)
