const {propertyType} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(propertyType);
exports.Paginate = paginate(propertyType);
exports.Create = create(propertyType, ['description']);
exports.GetById = findOne(propertyType);
exports.Put = update(propertyType, ['description']);
exports.Destroy = destroy(propertyType);