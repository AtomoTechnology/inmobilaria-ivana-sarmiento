<<<<<<< HEAD
const { property } = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(property);
exports.Paginate = paginate(property);
exports.Create = create(property, [
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
exports.GetById = findOne(property);
exports.Put = update(property, [
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
exports.Destroy = destroy(property);
=======
const {property,zone,propertyType,owner} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(property,
    {
        inclued : 
        [ 
            { model: zone, attributes : ['name']  }, 
            { model: propertyType, attributes:['description']}, 
            { model: owner, attributes:['fullName','phone','email']}
        ]
    });
exports.Paginate = paginate(property,
    {
        inclued : 
        [ 
            { model: zone, attributes : ['name']  }, 
            { model: propertyType, attributes:['description']}, 
            { model: owner, attributes:['fullName','phone','email']}
        ]
    });
exports.Create = create(property, ['ZoneId','PropertyTypeId','OwnerId','street','number','floor','dept','isFor','status','description']);
exports.GetById = findOne(property,
    {
        inclued : 
        [ 
            { model: zone, attributes : ['name']  }, 
            { model: propertyType, attributes:['description']}, 
            { model: owner, attributes:['fullName','phone','email']}
        ]
    });
exports.Put = update(property, ['ZoneId','PropertyTypeId','OwnerId','street','number','floor','dept','isFor','status','description']);
exports.Destroy = destroy(property);
>>>>>>> a8bfa1d6c30240e94f4c823eebcf5bddfefa4240
