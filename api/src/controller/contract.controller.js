const {
  Contract,
  Client,
  Assurance,
  ClientExpense,
  OwnerExpense,
  Property,
  sequelize,
  PriceHistorial,
  Owner,
  DebtOwner,
  DebtClient,
  Eventuality,
} = require("../../models");
const { Op } = require("sequelize");

const {
  all,
  paginate,
  findOne,
  update,
  destroy,
} = require("../Generic/FactoryGeneric");
const AppError = require("../../helpers/AppError");
const { catchAsync } = require("../../helpers/catchAsync");
const { addDays } = require("../../helpers/date");

exports.GetAll = all(Contract, {
  include: [
    { model: Client },
    { model: Property, include: { model: Owner } },
    { model: PriceHistorial },
    { model: Assurance, },
  ],
});
exports.Paginate = paginate(Contract, {
  include: [
    {
      model: Client,
    },
    {
      model: Property,
    },
  ],
});

exports.GetOwnerContracts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const properties = await Property.findAll({
    where: {
      OwnerId: id,
      // TODO ::: state: 'Ocupado' should i add this?
    },
    attributes: ['id']
  });
  const ids = properties.map((p) => p.id);
  const contracts = await Contract.findAll({
    where: {
      PropertyId: {
        [Op.in]: ids
      }
    },
    include: [
      { model: PriceHistorial },
      { model: Client },
      {
        model: Property,
        include: {
          model: Owner,
        },
      },
    ],
  });
  return res.json({
    code: 200,
    text: 'was there brothers....',
    status: "success",
    ok: true,
    results: contracts.length,
    message: "Lista de contratos",
    data: contracts,
  });
});

exports.Post = catchAsync(async (req, res, next) => {
  const { PropertyId, amount, assurances } = req.body;

  const p = await Property.findOne({ where: { id: PropertyId, state: "Libre" } });

  if (!p) return next(new AppError("Existe un contrato vigente para esta propiedad", 400));

  const result = await sequelize.transaction(async (t) => {

    const cont = await Contract.create(req.body, { transaction: t });

    const updPro = await Property.update(
      { state: "Ocupado" },
      { where: { id: PropertyId, }, transaction: t },
    );

    if (updPro[0] <= 0) {
      await t.rollback();
      return next(new AppError("No se pudo actualizar el estado de la propiedad", 400))
    }

    if (assurances !== undefined && assurances.length > 0) {
      for (let j = 0; j < assurances.length; j++) {
        assurances[j].ContractId = cont.id;
        await Assurance.create(assurances[j], { transaction: t });
      }
    }

    await PriceHistorial.create(
      {
        ContractId: cont.id,
        amount: amount,
        year: 1,
        percent: 0,
      },
      { transaction: t }
    );

    return res.json({
      code: 200,
      status: "success",
      ok: true,
      message: "El registro fue guardado con exito",
      data: cont,
    });

  });
});

exports.GetById = findOne(Contract, {
  include: [
    {
      model: Client,
    },
    {
      model: Property,
    },
    {
      model: Assurance,
    },
    {
      model: PriceHistorial,
    },
    {
      model: Eventuality,
    },
    {
      model: ClientExpense,
    },
    {
      model: OwnerExpense,
    },
  ],
});
exports.Put = update(Contract, [
  "PropertyId",
  "ClientId",
  "startDate",
  "endDate",
  "amount",
  "deposit",
  "booking",
  "state",
  "description"
]);
exports.Destroy = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const contract = await Contract.findOne({ where: { id } });
  if (!contract) return next(new AppError("No se encontró el contrato", 400));
  console.log('contract :: ', contract)
  const debts = await DebtClient.findAll({ where: { ContractId: id, paid: false } });
  if (debts.length > 0) return next(new AppError("No se puede eliminar el contrato, existen deudas pendientes", 400));

  const payments = await DebtOwner.findAll({ where: { ContractId: id, paid: false } },);
  if (payments.length > 0) return next(new AppError("No se puede eliminar el contrato, existen pagos pendientes", 400));

  const events = await Eventuality.findAll(
    {
      where: {
        PropertyId: contract.PropertyId,
        [Op.or]: { clientPaid: false, ownerPaid: false },
      },
    },
  );

  if (events.length > 0) return next(new AppError("No se puede eliminar el contrato, existen eventualidades sin pagar o cobrar", 400));


  const result = await sequelize.transaction(async (t) => {
    console.log('contract', contract)
    await Property.update(
      { state: "Libre" },
      {
        where: { id: contract.PropertyId },
        transaction: t
      },
    );

    await Contract.update({ state: 'Finalizado' }, { where: { id }, transaction: t });
    await Contract.destroy({ where: { id }, transaction: t });
    return res.json({
      ok: true,
      status: "success",
      message: "El registro fue eliminado con exito",
    });
  });

  // const transact = await sequelize.transaction();
  // try {    
  // } catch (error) {
  //   await transact.rollback();
  //   throw error;
  // }
});

exports.ExpiredContracts = catchAsync(async (req, res, next) => {
  const days = req.params.days * 1;

  const docs = await Contract.findAll({
    where: {
      [Op.or]: [
        sequelize.where(
          sequelize.fn(
            "datediff",
            sequelize.fn("NOW"),
            sequelize.col("startDate")
          ),
          {
            [Op.between]: [364 - days, 365],
          }
        ),
        sequelize.where(
          sequelize.fn(
            "datediff",
            sequelize.fn("NOW"),
            sequelize.col("startDate")
          ),
          {
            [Op.between]: [729 - days, 730],
          }
        ),
        sequelize.where(
          sequelize.fn(
            "datediff",
            sequelize.fn("NOW"),
            sequelize.col("startDate")
          ),
          {
            [Op.between]: [1094 - days, 1095],
          }
        ),
      ],
      state: "En curso",
    },
    include: [
      { model: Client },
      { model: Property, include: { model: Owner } },
      { model: PriceHistorial },
    ],
  });

  return res.json({
    results: docs.length,
    ok: true,
    status: "success",
    data: docs,
  });
});

exports.HistorialPrice = all(Contract, {
  include: [
    { model: PriceHistorial },
    { model: Property, include: { model: Owner } },
  ],
});

// para obtener las deudas pagas o impagas de los clientes
exports.DebtsClients = catchAsync(async (req, res, next) => {
  const docs = await Contract.findAll({
    include: [
      { model: Client },
      { model: Property, include: { model: Owner } },
      { model: PriceHistorial },
      { model: DebtClient },
    ],
  });

  return res.json({
    results: docs.length,
    ok: true,
    status: "success",
    data: docs,
  });
});

//  para obtener las deudas pagas o impagas de los propietarios
exports.DebtsOwners = catchAsync(async (req, res, next) => {
  const docs = await Contract.findAll({
    include: [
      { model: Client },
      { model: Property, include: { model: Owner } },
      { model: PriceHistorial },
      { model: DebtOwner },
    ],
  });

  return res.json({
    results: docs.length,
    ok: true,
    status: "success",
    data: docs,
  });
});
