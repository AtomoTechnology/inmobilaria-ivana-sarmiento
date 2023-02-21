require('dotenv').config();
const {owner} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(owner);
exports.Paginate = paginate(owner);
exports.Create = create(owner, ['fullName','address','phone','email','cuit','nrofax','country','province','city','obs']);
exports.GetById = findOne(owner);
exports.Put = update(owner, ['fullName','address','phone','email','cuit','nrofax','country','province','city','obs']);
exports.Destroy = destroy(owner);