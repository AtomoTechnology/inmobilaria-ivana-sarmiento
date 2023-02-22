const {property} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(property);
exports.Paginate = paginate(property);
exports.Create = create(property, ['ZoneId','PropertyTypeId','OwnerId','street','number','floor','dept','isFor','status','description']);
exports.GetById = findOne(property);
exports.Put = update(property, ['ZoneId','PropertyTypeId','OwnerId','street','number','floor','dept','isFor','status','description']);
exports.Destroy = destroy(property);