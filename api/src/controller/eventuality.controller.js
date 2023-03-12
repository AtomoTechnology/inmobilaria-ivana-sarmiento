const { Contract, Eventuality } = require('../../models')

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric')

exports.GetAll = all(Eventuality, {
	// include: [{ model: Contract }],
})
exports.Paginate = paginate(Eventuality, {
	// include: [{ model: Contract }],
})
exports.Create = create(Eventuality, [
	'ContractId',
	'amount',
	'description',
	'expiredDate',
	'clientAmount',
	'ownerAmount',
])
exports.GetById = findOne(Eventuality, {
	// include: [{ model: Contract }],
})
exports.Put = update(Eventuality, ['ContractId', 'amount', 'description', 'expiredDate', 'clientAmount', 'ownerAmount'])
exports.Destroy = destroy(Eventuality)
