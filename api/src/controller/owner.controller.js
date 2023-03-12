const { Owner, Property } = require('../../models')

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric')

exports.GetAll = all(Owner, { include: [{ model: Property }] })
exports.Paginate = paginate(Owner)
exports.Create = create(Owner, [
	'fullName',
	'address',
	'phone',
	'email',
	'cuit',
	'nroFax',
	'province',
	'city',
	'obs',
	'fixedPhone',
	'codePostal',
])
exports.GetById = findOne(Owner)
exports.Put = update(Owner, [
	'fullName',
	'address',
	'phone',
	'email',
	'cuit',
	'nroFax',
	'province',
	'city',
	'obs',
	'fixedPhone',
	'codePostal',
])
exports.Destroy = destroy(Owner)
