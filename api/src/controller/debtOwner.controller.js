const {
	DebtOwner,
	Contract,
	sequelize,
	Property,
	PriceHistorial,
	PaymentOwner,
	Owner,
	OwnerExpense,
	OwnerRentPaid,
	JobLog,
} = require("../../models");

const { all, findOne, update, destroy } = require("../Generic/FactoryGeneric");
const { catchAsync } = require("../../helpers/catchAsync");
const { monthsInSpanish } = require("../../helpers/variablesAndConstantes");
const { Op } = require("sequelize");

exports.GetAll = all(DebtOwner, {
	include: [
		{
			model: Contract,
		},
	],
});

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction();
	try {
		const cont = await DebtOwner.create(req.body, {
			transaction: transact,
		});

		await transact.commit();
		return res.json({
			code: 200,
			status: "success",
			ok: true,
			message: "El registro fue guardado con exito",
			data: cont,
		});
	} catch (error) {
		await transact.rollback();
		throw error;
	}
});

exports.GetById = findOne(DebtOwner, {
	include: [
		{
			model: Contract,
		},
	],
});

exports.Put = update(DebtOwner, ["month", "year", "ExpenseDetails"]);

exports.Destroy = destroy(DebtOwner);

exports.jobDebtsOwner = catchAsync(async (req, res, next) => {
	const month = req.query.month ? req.query.month : new Date().getMonth()
	const year = req.query.year ? req.query.year : new Date().getFullYear()

	const docs = await PaymentOwner.findAll(
		{
			where: {
				month: monthsInSpanish[month - 1],
				year,
				paidCurrentMonth: true,

			},
			attributes: [[sequelize.fn("DISTINCT", sequelize.col("OwnerId")), "OwnerId"]],
		}
	);


	let ids = [];
	if (docs.length > 0) ids = docs.map((doc) => doc.OwnerId);


	const docs2 = await Owner.findAll(
		{
			where: { id: { [Op.notIn]: ids } },
			// include: [{ model: Property }]
		}
	);

	let ids2 = [];
	if (docs2.length > 0) ids2 = docs2.map((doc) => doc.id)



	const properties = await Property.findAll({
		where: { OwnerId: { [Op.in]: ids2 }, state: "Ocupado" },
		attributes: ['id', 'street', 'number', 'dept', 'floor']
	})

	let ids3 = [];
	if (properties.length > 0) ids3 = properties.map((doc) => doc.id);


	const contractNotPaid = await Contract.findAll(
		{
			where: {
				PropertyId: { [Op.in]: ids3 },
				state: "En curso",
				startDate: { [Op.lt]: new Date(year, month - 1, new Date(year, month, 0).getDate()), },
				endDate: { [Op.gt]: new Date() },
			},
			include: [
				{ model: OwnerExpense },
				{ model: Property, include: [{ model: Owner, attributes: ['id', 'commision'] }] },
				{ model: PriceHistorial }
			]
		}

	);

	const transact = await sequelize.transaction();
	try {
		for (let k = 0; k < contractNotPaid.length; k++) {
			const exist = await DebtOwner.findOne({ where: { year, month, ContractId: contractNotPaid[k].id, }, });
			const exist2 = await OwnerRentPaid.findOne({ where: { year, month: monthsInSpanish[month - 1], ContractId: contractNotPaid[k].id, OwnerId: contractNotPaid[k].Property.Owner.id }, });

			if (!exist && !exist2) {
				await DebtOwner.create(
					{
						description:
							"ALQUILER " +
							contractNotPaid[k].Property.street +
							" " +
							contractNotPaid[k].Property.number +
							" " +
							contractNotPaid[k].Property.floor +
							" " +
							contractNotPaid[k].Property.dept +
							"-" +
							monthsInSpanish[month - 1] +
							"/" +
							year,
						amount: contractNotPaid[k].PriceHistorials.sort(
							(a, b) => a.amount - b.amount
						)[contractNotPaid[k].PriceHistorials.length - 1].amount,
						year,
						month,
						rent: true,
						ContractId: contractNotPaid[k].id,
					},
					{ transaction: transact, }
				);
				await DebtOwner.create(
					{
						description:
							"HONORARIOS " +
							contractNotPaid[k].Property.street +
							" " +
							contractNotPaid[k].Property.number +
							" " +
							contractNotPaid[k].Property.floor +
							" " +
							contractNotPaid[k].Property.dept +
							"-" +
							monthsInSpanish[month - 1] +
							"/" +
							year,
						amount: contractNotPaid[k].PriceHistorials.sort(
							(a, b) => a.amount - b.amount
						)[contractNotPaid[k].PriceHistorials.length - 1].amount * (-1) * (contractNotPaid[k].Property.Owner.commision / 100),
						year,
						month,
						ContractId: contractNotPaid[k].id,
					},
					{ transaction: transact, }
				);
				for (let l = 0; l < contractNotPaid[k].OwnerExpenses.length; l++) {
					await DebtOwner.create(
						{
							description:
								contractNotPaid[k].OwnerExpenses[l].description +
								" " +
								monthsInSpanish[month - 1] +
								" " +
								year,
							amount: contractNotPaid[k].OwnerExpenses[l].amount,
							year,
							month,
							ContractId: contractNotPaid[k].id,
						},
						{ transaction: transact, }
					);
				}
			}
		}

		await JobLog.create({ type: "debts", state: "success", message: "DEBTS OWNER JOB DONE SUCCESSFULLY.", }, { transaction: transact, });
		await transact.commit();
		// return res.json({
		// 	status: "success",
		// 	contractNotPaid
		// })

	} catch (error) {
		await JobLog.create({ type: "debts", state: "fail", message: error.message || "Something went wrong.", });
		await transact.rollback();
	}
});
