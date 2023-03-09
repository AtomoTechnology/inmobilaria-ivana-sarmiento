const {
    Visit
} = require('../../models');
const {
    all,
    paginate,
    create,
    findOne,
    update,
    destroy
} = require('../Generic/FactoryGeneric');

exports.GetAll = all(Visit);
exports.Paginate = paginate(Visit);
exports.Create = create(Visit, ['PropertyId', 'date', 'fullName', 'phone', 'description']);
exports.GetById = findOne(Visit);
exports.Put = update(Visit, ['PropertyId', 'date', 'fullName', 'phone', 'description']);
exports.Destroy = destroy(Visit);