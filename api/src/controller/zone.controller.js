const { zone } = require('../../models');
const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(zone);
exports.Paginate = paginate(zone);
exports.Create = create(zone, ['name']);
exports.GetById = findOne(zone);
exports.Put = update(zone, ['name']);
exports.Destroy = destroy(zone);
