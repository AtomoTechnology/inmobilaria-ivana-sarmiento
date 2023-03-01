const {Contract,Client,Assurance,Property,sequelize,PriceHistorial} = require('../../models');
const { Op } = require('sequelize');

const { all, paginate, create, findOne, update, destroy } = require('../Generic/FactoryGeneric');
const AppError = require('../../helpers/AppError');
const { catchAsync } = require('../../helpers/catchAsync');

exports.GetAll = all(Contract,
    {
        include : 
        [ 
            { model: Client},
            { model: Property}
        ]
    });
exports.Paginate = paginate(Contract,
    {
        include : 
        [ 
            { model: Client},
            { model: Property}
        ]
    });
exports.Create = create(Contract, ['PropertyId','ClientId','startDate','endDate','nroPartWater','nroPartMuni','nroPartAPI','commission','state','description','stamped','fees','warrantyInquiry']);

exports.Post = 
catchAsync(async (req, res, next) => {
    console.log("Ingreso")
    const transact = await sequelize.transaction();
    try 
    {  
         console.log(req.body)
        const {PropertyId,ClientId,startDate,endDate,nroPartWater,nroPartMuni,nroPartAPI,commission,state,description,stamped,fees,warrantyInquiry,assurances} = req.body;          
                 
        const isExist = await Contract.findOne({
            where: {
                [Op.and]: [
                    {  PropertyId: PropertyId },
                    {  state: "Finalizado" }
                ]
            }
        });

        if(isExist !== null){            
            return next(new AppError("Existe un contrato vigente para este inmueble", 400));
        }
        
        const cont = await Contract.create({
            PropertyId: PropertyId,ClientId: ClientId,startDate: startDate,
            endDate: endDate,nroPartWater: nroPartWater,nroPartMuni: nroPartMuni,
            nroPartAPI: nroPartAPI,commission: commission,state: state,
            description: description,stamped: stamped,fees: fees, warrantyInquiry: warrantyInquiry
        }, { transaction: transact });

        if(assurances !== undefined){
            if(assurances.length > 0){
                for (let index = 0; index < assurances.length; index++) {
                    assurances[index].ContractId = cont.id
                    await Assurance.create(assurances[index], { transaction: transact });
                }      
            } 
        }   

        //Para insertar el historial
        const history = await PriceHistorial.create({
            ContractId: cont.id,amount: amount,year: 1,
            porcent: 0
        }, { transaction: transact });
        
        await transact.commit();  
        return res.json({
            code: 200,
            status: 'success',
            ok: true,
            message: 'El registro fue guardado con exito',
            data: cont,
        });    
    } 
    catch (error) 
    {
        await transact.rollback(); 
        throw error;
    }
  });



exports.GetById = findOne(Contract, {
  include: [ 
    { model: Client },
    { model: Property},            
    { model: Assurance}],
});
exports.Put = update(Contract, [
  'PropertyId',
  'ClientId',
  'startDate',
  'endDate',
  'nroPartWater',
  'nroPartMuni',
  'nroPartAPI',
  'commission',
  'state',
  'description',
  'stamped',
  'fees',
  'warrantyInquiry',
]);
exports.Destroy = destroy(Contract);
