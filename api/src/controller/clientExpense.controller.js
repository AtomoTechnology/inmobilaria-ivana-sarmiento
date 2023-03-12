const { ClientExpense } = require('../../models')
const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric')

exports.GetAll = all(ClientExpense)
exports.Paginate = paginate(ClientExpense)
exports.Create = create(ClientExpense, ['date', 'amount', 'description', 'ContractId'])
exports.GetById = findOne(ClientExpense)
exports.Put = update(ClientExpense, ['date', 'amount', 'description', 'ContractId'])
exports.Destroy = destroy(ClientExpense)
