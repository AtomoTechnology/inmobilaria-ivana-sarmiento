const {
    Claim
} = require('../../models');
const {
    all,
    paginate,
    create,
    findOne,
    update,
    destroy
} = require('../Generic/FactoryGeneric');

exports.GetAll = all(Claim);
exports.Paginate = paginate(Claim);
exports.Create = create(Claim, ['PropertyId', 'details', 'description']);
exports.GetById = findOne(Claim);
exports.Put = update(Claim, ['details', 'state', 'description']);
exports.Destroy = destroy(Claim);