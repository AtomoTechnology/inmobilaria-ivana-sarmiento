const {
	Contract,
	Client,
	Assurance,
	ClientExpense,
	OwnerExpense,
	Property,
	sequelize,
	PriceHistorial,
	Owner,
	DebtOwner,
	DebtClient,
	Eventuality,

} = require('../../models')
const {
	Op
} = require('sequelize')

const {
	all,
	paginate,
	findOne,
	update,
	destroy
} = require('../Generic/FactoryGeneric')
const AppError = require('../../helpers/AppError')
const {
	catchAsync
} = require('../../helpers/catchAsync')
const {
	addDays
} = require('../../helpers/date')

exports.GetAll = all(Contract, {
	include: [
		{ model: Client },
		{ model: Property, include: { model: Owner } },
		{ model: PriceHistorial },
	],
})
exports.Paginate = paginate(Contract, {
	include: [{
		model: Client
	}, {
		model: Property
	}],
})

exports.Post = catchAsync(async (req, res, next) => {
	const transact = await sequelize.transaction()
	try {
		const {
			PropertyId,
			amount,
			assurances
		} = req.body

		const p = await Property.findOne({
			where: {
				[Op.and]: [{
					id: PropertyId
				}, {
					state: 'Libre'
				}]
			}
		}, {
			transaction: transact
		})
		if (!p) return next(new AppError('Existe un contrato vigente para este inmueble', 400))
		const cont = await Contract.create(req.body)

		if (assurances !== undefined && assurances.length > 0) {
			for (let j = 0; j < assurances.length; j++) {
				assurances[j].ContractId = cont.id
				await Assurance.create(assurances[j], {
					transaction: transact
				})
			}
		}
		await Property.update({
			state: 'Ocupado'
		}, {
			where: {
				id: PropertyId
			}
		}, {
			transaction: transact
		})
		await PriceHistorial.create({
			ContractId: cont.id,
			amount: amount,
			year: 1,
			percent: 0
		}, {
			transaction: transact
		})
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
	include: [{
			model: Client
		},
		{
			model: Property
		},
		{
			model: Assurance
		},
		{
			model: PriceHistorial
		},
		{
			model: Eventuality
		},
		{
			model: ClientExpense
		},
		{
			model: OwnerExpense
		},
	],
})
exports.Put = update(Contract, [
	'PropertyId',
	'ClientId',
	'startDate',
	'endDate',
	'amount',
	'deposit',
	'booking',
	'state',
	'description',
	// 'stamped',
	// 'fees',
	// 'warrantyInquiry',
])
// TODO :: valida que no haya deudas pendientes, ni pagos pendientes , cambiar ele estado del inmueble a libre
exports.Destroy = catchAsync(async (req, res, next) => {

	const id = req.params.id
	const transact = await sequelize.transaction()
	try {
		const contract = await Contract.findOne({ where: { id } }, { transaction: transact })
		if (!contract) return next(new AppError('No se encontro el contrato', 400))
		const debts = await DebtClient.findAll({ where: { ContractId: id, paid: false } }, { transaction: transact })
		if (debts.length > 0) return next(new AppError('No se puede eliminar el contrato, existen deudas pendientes', 400))
		const payments = await DebtOwner.findAll({ where: { ContractId: id, paid: false } }, { transaction: transact })
		if (payments.length > 0) return next(new AppError('No se puede eliminar el contrato, existen pagos pendientes', 400))
		const events = await Eventuality.findAll({ where: { ContractId: id, [Op.or]: { clientPaid: false, ownerPaid: false } } }, { transaction: transact })
		if (events.length > 0) return next(new AppError('No se puede eliminar el contrato, existen eventualidades sin pagar o cobrar', 400))

		await Property.update({ state: 'Libre' }, { where: { id: contract.PropertyId } }, { transaction: transact })
		await Contract.destroy({ where: { id } }, { transaction: transact })
		await transact.commit()
		return res.json({ ok: true, status: 'success', message: 'El registro fue eliminado con exito' })
	} catch (error) {
		await transact.rollback()
		throw error
	}


})

exports.ExpiredContracts = catchAsync(async (req, res, next) => {
	const days = req.params.days * 1

	const docs = await Contract.findAll({
		where: {
			endDate: {
				[Op.and]: {
					[Op.gt]: Date(),
					[Op.lte]: addDays(new Date().toDateString(), days),
				},
			},
		},
		// attributes : ['id','endDate']
		include: [{ model: Client }, { model: Property, include: { model: Owner } }, { model: PriceHistorial }],
	})

	return res.json({
		results: docs.length,
		ok: true,
		status: 'success',
		data: docs,
	})
})

exports.HistorialPrice = all(Contract, {
	include: [{ model: PriceHistorial }, { model: Property, include: { model: Owner } }],
})


exports.DebtsClients = catchAsync(async (req, res, next) => {

	const docs = await Contract.findAll({
			// where: {
			// 	'$DebtClients.paid$': false,
			// },
		// attributes : ['id','endDate']
		include: [{ model: Client }, { model: Property, include: { model: Owner } }, { model: PriceHistorial },{ model: DebtClient, }],
	})

	return res.json({
		results: docs.length,
		ok: true,
		status: 'success',
		data: docs,
	})
})
exports.DebtsOwners= catchAsync(async (req, res, next) => {

	const docs = await Contract.findAll({
			// where: {
			// 	'$DebtClients.paid$': false,
			// },
		// attributes : ['id','endDate']
		include: [{ model: Client }, { model: Property, include: { model: Owner } }, { model: PriceHistorial },{ model: DebtOwner, }],
	})

	return res.json({
		results: docs.length,
		ok: true,
		status: 'success',
		data: docs,
	})
})


