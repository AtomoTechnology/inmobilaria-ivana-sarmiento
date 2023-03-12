const { OwnerExpense } = require('../../models')
const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric')

exports.GetAll = all(OwnerExpense)
exports.Paginate = paginate(OwnerExpense)
exports.Create = create(OwnerExpense, ['date', 'amount', 'description', 'ContractId'])
exports.GetById = findOne(OwnerExpense)
exports.Put = update(OwnerExpense, ['date', 'amount', 'description', 'ContractId'])
exports.Destroy = destroy(OwnerExpense)
