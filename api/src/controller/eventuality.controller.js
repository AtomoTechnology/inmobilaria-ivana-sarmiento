const {contact,eventuality} = require('../../models');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');

exports.GetAll = all(eventuality,
    {
        inclued : 
        [ 
            { model: contact, attributes : ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']  }
        ]
    });
exports.Paginate = paginate(eventuality,
    {
        inclued : 
        [ 
            { model: contact, attributes : ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']  }
        ]
    });
exports.Create = create(eventuality, ['ContractId','amount','description','expiredDate']);
exports.GetById = findOne(eventuality,
    {
        inclued : 
        [ 
            { model: contact, attributes : ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commision','status','description','stamped','fees','warrantyInquiry']  }
        ]
    });
exports.Put = update(eventuality, ['ContractId','amount','description','expiredDate']);
exports.Destroy = destroy(eventuality);