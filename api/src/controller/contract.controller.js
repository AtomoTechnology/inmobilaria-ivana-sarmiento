const {Contact,Client} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(Contact,
    {
        include : 
        [ 
            { model: Client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Paginate = paginate(Contact,
    {
        include : 
        [ 
            { model: Client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Create = create(Contact, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']);

exports.GetById = findOne(Contact,
    {
        include : 
        [ 
            { model: Client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Put = update(Contact, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']);
exports.Destroy = destroy(Contact);