const {Contract,Client,Assurance} = require('../../models');
const { Sequelize } = require('sequelize');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');
const AppError = require('../../helpers/AppError');

exports.GetAll = all(Contract,
    {
        include : 
        [ 
            { model: Client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Paginate = paginate(Contract,
    {
        include : 
        [ 
            { model: Client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Create = create(Contract, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commission','state','description','stamped','fees','warrantyInquiry']);

exports.Post = async (req, res, next) =>{
    const transact = await sequelize.transaction();
    const {PropertyId,ClientId,startDate,endDate,nroPartWater,nroPartMuni,nroPartAPI,commission,state,description,stamped,fees,warrantyInquiry,assurance} = req.body;
    try 
    {  

        if(assurance.length === 0){
            await transact.rollback();
            return next(new AppError("No se puede insertar un contrato sin sus garantes", 400));
        }
            
        const cont = await Contract.create({
            PropertyId: PropertyId,ClientId: ClientId,startDate: startDate,
            endDate: endDate,nroPartWater: nroPartWater,nroPartMuni: nroPartMuni,
            nroPartAPI: nroPartAPI,commission: commission,state: state,
            description: description,stamped: stamped,fees: fees, warrantyInquiry: warrantyInquiry
        }, { transaction: transact });

        assurance.forEach(function (value) {
            value.ContractId = cont.id;
            Assurance.create({value}, { transaction: transact });
        });         
        await transact.commit();      
    } 
    catch (error) 
    {
        await transact.rollback(); 
        return next(new AppError(error.message, 400));
    }
}

exports.GetById = findOne(Contract,
    {
        include : 
        [ 
            { model: Client, attributes : ['fullName','address','phone','email']  }
        ]
    });
exports.Put = update(Contract, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commission','state','description','stamped','fees','warrantyInquiry']);
exports.Destroy = destroy(Contract);