const {contact,client} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(contact,
    {
        inclued : 
        [ 
            { model: client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Paginate = paginate(contact,
    {
        inclued : 
        [ 
            { model: client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Create = create(contact, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']);
exports.GetById = findOne(contact,
    {
        inclued : 
        [ 
            { model: client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Put = update(contact, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']);
exports.Destroy = destroy(contact);