const { DebtClient, Contract, Property, ClientExpense, Client, sequelize, PriceHistorial, JobLog, PaymentClient, } = require('../../models')

const { all, findOne, update, destroy } = require('../Generic/FactoryGeneric')
const { catchAsync } = require('../../helpers/catchAsync')
const { Op } = require('sequelize')
const { monthsInSpanish } = require('../../helpers/variablesAndConstantes')

exports.GetAll = all(DebtClient, {
	// include: [
	// 	{
	// 		model: Contract,
	// 		include: { model: Property },
	// 	},
	// ],
})

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction()
	try {
		const cont = await DebtClient.create(req.body, {
			transaction: transact
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

exports.GetById = findOne(DebtClient, {
	include: [{
		model: Contract,
	},],
})

exports.Put = update(DebtClient, ['month', 'year', 'ExpenseDetails'])

exports.Destroy = destroy(DebtClient)

exports.jobDebtsClients = catchAsync(async (req, res, next) => {
	// TODO :: generate debts for a specific month and year and alose an specific client

	console.log("Ingreso en el job")
	const month = req.query.month ? req.query.month : new Date().getMonth()
	const year = req.query.year ? req.query.year : new Date().getFullYear()
	console.log('MONTH ::: ', monthsInSpanish[month - 1])

	// return


	const docs = await PaymentClient.findAll({
		where: {
			[Op.and]: {
				month: monthsInSpanish[month - 1],
				year,
				paidCurrentMonth: true,
			},
		},
		attributes: [[sequelize.fn('DISTINCT', sequelize.col('ContractId')), 'ContractId']],
	})

	let ids = []
	if (docs.length > 0) ids = docs.map(doc => doc.ContractId)
	console.log('IDS :: ', ids)

	const docs2 = await Contract.findAll({
		where: {
			id: {
				[Op.notIn]: ids,
			},
			state: 'En curso',
			startDate: { [Op.lt]: new Date(year, month - 1, new Date(year, month, 0).getDate()) },
			endDate: { [Op.gt]: new Date() },
		},
		include: [
			{ model: ClientExpense },
			{ model: Property },
			{ model: PriceHistorial }
		],
	})



	const transact = await sequelize.transaction()

	try {

		for (let k = 0; k < docs2.length; k++) {
			const exist = await DebtClient.findOne({
				where: {
					year,
					month,
					ContractId: docs2[k].id
				}
			})
			if (!exist) {

				await DebtClient.create({
					description: 'ALQUILER ' + docs2[k].Property.street + ' ' + docs2[k].Property.number + ' ' +
						docs2[k].Property.floor + ' ' + docs2[k].Property.dept + ' ' + monthsInSpanish[month - 1] + '/' + year,
					amount: docs2[k].PriceHistorials.sort((a, b) => a.amount - b.amount)[docs2[k].PriceHistorials.length - 1].amount,
					year,
					month,
					rent: true,
					ContractId: docs2[k].id,
				}, { transaction: transact })

				for (let l = 0; l < docs2[k].ClientExpenses.length; l++) {
					await DebtClient.create({
						description: docs2[k].ClientExpenses[l].description + ' ' + monthsInSpanish[month - 1] + '/' + year,
						amount: docs2[k].ClientExpenses[l].amount,
						year,
						month,
						ContractId: docs2[k].id,
					},
						{ transaction: transact }
					)
				}
			}
		}

		await JobLog.create({ type: 'debts', state: 'success', message: 'DEBTS CLIENT JOB DONE SUCCESSFULLY.' })
		await transact.commit()

	} catch (error) {
		await JobLog.create({
			type: 'debts',
			state: 'fail',
			message: error?.message || 'Something went wrong.',
		})
		await transact.rollback()
	}
})