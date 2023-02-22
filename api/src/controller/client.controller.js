const {client} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(client);
exports.Paginate = paginate(client);
exports.Create = create(client, ['fullName','address','phone','email','cuit','nroFax','province','city','obs']);
exports.GetById = findOne(client);
exports.Put = update(client, ['fullName','address','phone','email','cuit','nroFax','province','city','obs']);
exports.Destroy = destroy(client);