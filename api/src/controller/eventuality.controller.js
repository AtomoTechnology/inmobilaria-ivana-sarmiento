const {Contact,Eventuality} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(Eventuality,
    {
        include : 
        [ 
            { model: Contact, attributes : ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']  }
        ]
    });
exports.Paginate = paginate(Eventuality,
    {
        include : 
        [ 
            { model: Contact, attributes : ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']  }
        ]
    });
exports.Create = create(Eventuality, ['ContractId','amount','description','expiredDate']);
exports.GetById = findOne(Eventuality,
    {
        include : 
        [ 
            { model: Contact, attributes : ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']  }
        ]
    });
exports.Put = update(Eventuality, ['ContractId','amount','description','expiredDate']);
exports.Destroy = destroy(Eventuality);