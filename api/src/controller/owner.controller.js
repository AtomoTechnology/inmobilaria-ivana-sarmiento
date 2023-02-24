const {Owner} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(Owner);
exports.Paginate = paginate(Owner);
exports.Create = create(Owner, ['fullName','address','phone','email','cuit','nroFax','province','city','obs']);
exports.GetById = findOne(Owner);
exports.Put = update(Owner, ['fullName','address','phone','email','cuit','nroFax','province','city','obs']);
exports.Destroy = destroy(Owner);