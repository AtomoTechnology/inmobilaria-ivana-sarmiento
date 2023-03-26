const {
	DebtClient,
	Contract,
	Property,
	ClientExpense,
	Client,
	sequelize,
	PriceHistorial,
	JobLog,
	PaymentClient,
} = require('../../models')

const {
	all,
	findOne,
	update,
	destroy
} = require('../Generic/FactoryGeneric')
const {
	catchAsync
} = require('../../helpers/catchAsync')
const {
	Op
} = require('sequelize')
const {
	monthsInSpanish
} = require('../../helpers/variablesAndConstantes')

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
	}, ],
})

exports.Put = update(DebtClient, ['month', 'year', 'ExpenseDetails'])

exports.Destroy = destroy(DebtClient)

exports.jobDebtsClients = catchAsync(async (req, res, next) => {
	console.log("Ingreso en el job")
	const transact = await sequelize.transaction()
	const month = new Date().getMonth() + 1
	const year = new Date().getFullYear()

	try {
		const docs = await PaymentClient.findAll({
			where: {
				[Op.and]: {
					month: monthsInSpanish[month - 1],
					year,
				},
			},

			attributes: [
				[sequelize.fn('DISTINCT', sequelize.col('ContractId')), 'ContractId']
			],
		}, {
			transaction: transact
		})

		if (docs.length === 0) {
			await transact.rollback();
			return;
		}
		const ids = docs.map((doc, i) => doc.ContractId)

		const docs2 = await Contract.findAll({
			where: {
				id: {
					[Op.notIn]: ids,
				},
			},
			include: [{
				model: ClientExpense
			}, {
				model: Property
			}, {
				model: PriceHistorial
			}],
		}, {
			transaction: transact
		})
		console.log("docs2: ", docs2)
		for (let k = 0; k < docs2.length; k++) {
			console.log('first ::: ', k)
			const exist = await DebtClient.findOne({
				where: {
					year,
					month,
					ContractId: docs2[k].id
				}
			})
			if (!exist) {
				await DebtClient.create({
					description: docs2[k].Property.street +
						' ' +
						docs2[k].Property.number +
						' ' +
						docs2[k].Property.dept +
						'-' +
						docs2[k].Property.floor +
						' ' +
						monthsInSpanish[month - 1] +
						' ' +
						year,
					amount: docs2[k].PriceHistorials.sort((a, b) => a.amount - b.amount)[docs2[k].PriceHistorials.length - 1]
						.amount,
					year,
					month,
					ContractId: docs2[k].id,
				}, {
					transaction: transact
				})
				for (let l = 0; l < docs2[k].ClientExpenses.length; l++) {
					await DebtClient.create({
						description: docs2[k].ClientExpenses[l].description + ' ' + monthsInSpanish[month - 1] + ' ' + year,
						amount: docs2[k].ClientExpenses[l].amount,
						year,
						rent : true,
						month,
						ContractId: docs2[k].id,
					}, {
						transaction: transact
					})
				}
			}
		}

		await JobLog.create({
			type: 'debts',
			state: 'success'
		})
		await transact.commit()
		// return res.json({
		// 	ok: true,
		// 	message: 'Operación realizada con éxito.',
		// 	result: docs2.length,
		// 	data: docs2
		// })
	} catch (error) {
		await transact.rollback()
		await JobLog.create({
			type: 'debts',
			state: 'fail',
			message: error.message || 'Something went wrong.',
		})
		throw error
	}
})