const {
	PaymentOwner,
	Eventuality,
	Owner,
	Client,
	Property,
	OwnerRentPaid,
	Contract,
	PaymentType,
	DebtOwner,
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
	include: [
		{
			model: Owner,
			// include: {
			// 	model: Property,
			// },
		},
		{
			model: PaymentType,
		},
	],
})
exports.Paginate = paginate(PaymentOwner, {
	include: [{
		model: Contract,
		include: {
			model: Property,
		},
	},
	{
		model: PaymentType,
	},
	],
})

exports.Post = catchAsync(async (req, res, next) => {

	const transact = await sequelize.transaction();
	try {

		let paidAll = 0
		for (let j = 0; j < req.body.expenseDetails.length; j++) {
			if (req.body.expenseDetails[j].paidCurrentMonth !== undefined && req.body.expenseDetails[j].paidCurrentMonth === true) {
				paidAll = paidAll + 1
			}
		}

		req.body.paidCurrentMonth = paidAll === req.body.totalContract
		const payment = await PaymentOwner.create(req.body, {
			transaction: transact,
		});

		if (req.body.expenseDetails.length > 0) {
			for (let j = 0; j < req.body.expenseDetails.length; j++) {
				if (req.body.expenseDetails[j].debt) {
					await DebtOwner.update(
						{
							paid: true,
							paidDate: new Date(),
						},
						{
							where: {
								id: req.body.expenseDetails[j].id,
							},
							transaction: transact,
						}
					);
				}

				if (req.body.expenseDetails[j].paidCurrentMonth) {
					await OwnerRentPaid.create(
						{
							amount: req.body.expenseDetails[j].amount,
							description: req.body.expenseDetails[j].description,
							ContractId: req.body.expenseDetails[j].ContractId,
							OwnerId: req.body.OwnerId,
							month: req.body.month,
							year: req.body.year,
							PaymentOwnerId: payment.id,
						},
						{ transaction: transact, }
					);
				}
			}
		}

		if (req.body.eventualityDetails.length > 0) {
			for (let j = 0; j < req.body.eventualityDetails.length; j++) {
				await Eventuality.update(
					{
						ownerPaid: true,
					},
					{
						where: {
							id: req.body.eventualityDetails[j].id,
						},
						transaction: transact,
					}
				);
			}
		}

		await transact.commit();
		return res.json({
			code: 200,
			status: "success",
			ok: true,
			message: "El registro fue guardado con exito",
		});
	} catch (error) {
		await transact.rollback();
		throw error;
	}
})

exports.GetById = findOne(PaymentOwner, {
	include: [{
		model: Contract,
		include: {
			model: Property,
		},
	},
	{
		model: PaymentType,
	},
	],
})

exports.Put = update(PaymentOwner, [
	'PaymentTypeId',
	'OwnerId',
	'total',
	'month',
	'year',
	'eventualityDetails',
	'ExpenseDetails',
	'obs'

])
exports.Destroy = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction();
	try {
		const payment = await PaymentOwner.findByPk(req.params.id, {
			transaction: transact,
		});

		if (payment.expenseDetails.length > 0) {
			for (let j = 0; j < payment.expenseDetails.length; j++) {
				if (
					payment.expenseDetails[j].debt
				) {
					await DebtOwner.update(
						{
							paid: false,
							paidDate: null,
						},
						{
							where: {
								id: payment.expenseDetails[j].id,
							},
						},
						{ transaction: transact }
					);
				}
			}
		}

		if (payment.eventualityDetails.length > 0) {
			for (let j = 0; j < payment.eventualityDetails.length; j++) {
				await Eventuality.update(
					{
						ownerPaid: false,
					},
					{
						where: {
							id: payment.eventualityDetails[j].id,
						},
					},
					{ transaction: transact }
				);
			}
		}
		await PaymentOwner.destroy(
			{ where: { id: req.params.id }, force: true },
			{ transaction: transact }
		);
		await transact.commit();
		return res.json({
			code: 200,
			status: "success",
			ok: true,
			message: "El registro fue eliminado con exito",
			//   data: payment,
		});
	} catch (error) {
		await transact.rollback();
		throw error;
	}
});
