const {
	Contract,
	Client,
	Assurance,
	ClientExpense,
	OwnerExpense,
	Property,
	sequelize,
	PriceHistorial,
	Eventuality,
} = require('../../models')
const { Op } = require('sequelize')

const { all, paginate, findOne, update, destroy } = require('../Generic/FactoryGeneric')
const AppError = require('../../helpers/AppError')
const { catchAsync } = require('../../helpers/catchAsync')
const { addDays } = require('../../helpers/date')

exports.GetAll = all(Contract, {
	include: [{ model: Client }, { model: Property }],
})
exports.Paginate = paginate(Contract, {
	include: [{ model: Client }, { model: Property }],
})

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction()
	try {
		const { PropertyId, amount, assurances } = req.body

		const p = await Property.findOne(
			{ where: { [Op.and]: [{ id: PropertyId }, { state: 'Libre' }] } },
			{ transaction: transact }
		)
		if (!p) return next(new AppError('Existe un contrato vigente para este inmueble', 400))
		const cont = await Contract.create(req.body)

		if (assurances.length > 0) {
			for (let j = 0; j < assurances.length; j++) {
				assurances[j].ContractId = cont.id
				await Assurance.create(assurances[j], { transaction: transact })
			}
		}
		await Property.update({ state: 'Ocupado' }, { where: { id: PropertyId } }, { transaction: transact })
		await PriceHistorial.create({ ContractId: cont.id, amount: amount, year: 1, percent: 0 }, { transaction: transact })
		// const isExist = await Contract.findOne({
		// 	where: {
		// 		[Op.and]: [{ PropertyId: PropertyId }, { state: 'Finalizado' }],
		// 	},
		// })

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

exports.GetById = findOne(Contract, {
	include: [
		{ model: Client },
		{ model: Property },
		{ model: Assurance },
		{ model: PriceHistorial },
		{ model: Eventuality },
		{ model: ClientExpense },
		{ model: OwnerExpense },
	],
})
exports.Put = update(Contract, [
	'PropertyId',
	'ClientId',
	'startDate',
	'endDate',
	'nroPartWater',
	'nroPartMuni',
	'nroPartAPI',
	'commission',
	'state',
	'description',
	'stamped',
	'fees',
	'warrantyInquiry',
])
exports.Destroy = destroy(Contract)

exports.ExpiredContracts = catchAsync(async (req, res, next) => {
	const days = req.params.days * 1
	console.log(days)
	console.log(addDays(Date(), days))

	const docs = await Contract.findAll({
		where: {
			endDate: {
				[Op.and]: {
					[Op.gt]: Date(), // should greater then today
					[Op.lte]: addDays(Date(), days), // should greater then today
				},
			},
		},
	})

	return res.json({
		data: docs,
		ok: true,
	})
})
