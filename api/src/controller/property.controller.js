const { Property, Zone, PropertyType, Owner } = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(Property, {
  include: [
    { model: Zone, attributes: ['name'] },
    { model: PropertyType, attributes: ['description'] },
    { model: Owner, attributes: ['fullName', 'phone', 'email'] },
  ],
});
exports.Paginate = paginate(Property, {
  include: [
    { model: Zone, attributes: ['name'] },
    { model: PropertyType, attributes: ['description'] },
    { model: Owner, attributes: ['fullName', 'phone', 'email'] },
  ],
});
exports.Create = create(Property, [
  'ZoneId',
  'PropertyTypeId',
  'OwnerId',
  'street',
  'number',
  'floor',
  'dept',
  'isFor',
  'status',
  'description',
]);
exports.GetById = findOne(Property, {
  include: [
    { model: Zone, attributes: ['name'] },
    { model: PropertyType, attributes: ['description'] },
    { model: Owner, attributes: ['fullName', 'phone', 'email'] },
  ],
});
exports.Put = update(Property, [
  'ZoneId',
  'PropertyTypeId',
  'OwnerId',
  'street',
  'number',
  'floor',
  'dept',
  'isFor',
  'status',
  'description',
]);
exports.Destroy = destroy(Property);
