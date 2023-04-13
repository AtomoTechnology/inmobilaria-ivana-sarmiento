const {
  PaymentClient,
  Eventuality,
  DebtClient,
  Client,
  Property,
  PaymentType,
  Contract,
  sequelize,
} = require("../../models");

const {
  all,
  paginate,
  create,
  findOne,
  update,
  destroy,
} = require("../Generic/FactoryGeneric");
const { catchAsync } = require("../../helpers/catchAsync");

exports.GetAll = all(PaymentClient, {
  include: [
    {
      model: Contract,
      include: [
        {
          model: Property,
        },
        {
          model: Client,
        },
      ],
    },
    {
      model: PaymentType,
    },
  ],
});
exports.Paginate = paginate(PaymentClient, {
  include: [
    {
      model: Contract,
    },
    {
      model: PaymentType,
    },
  ],
});

exports.Post = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  // return
  const transact = await sequelize.transaction();
  try {
    const payment = await PaymentClient.create(req.body, {
      transaction: transact,
    });
    console.log('BODYYY :::: ', req.body)
    console.log('PAID ::: ', req.body.paidTotal, ' TOTAL ::: ', req.body.total)
    if (req.body.paidTotal && req.body.paidTotal > 0 && req.body.paidTotal !== req.body.total) {
      // add a eventualities with the difference
      console.log('entro acaaaaaaa ')
      await Eventuality.create({
        description: 'Diferencia a favor sobre el cobro ' + req.body.month + '/' + req.body.year,
        ownerAmount: 0,
        clientAmount: req.body.total - req.body.paidTotal,
        amount: req.body.total - req.body.paidTotal,
        clientPaid: false,
        ownerPaid: true,
        expiredDate: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  //actual date plus 1 month
        ContractId: req.body.ContractId,
      }, {
        transaction: transact,
      });

    }
    if (req.body.expenseDetails.length > 0) {
      for (let j = 0; j < req.body.expenseDetails.length; j++) {
        if (req.body.expenseDetails[j].debt) {
          await DebtClient.update(
            {
              paid: true,
              paidDate: new Date(),
            },
            {
              where: {
                id: req.body.expenseDetails[j].id,
              },
            }
          );
        }
      }
    }

    if (req.body.eventualityDetails.length > 0) {
      for (let j = 0; j < req.body.eventualityDetails.length; j++) {
        await Eventuality.update(
          {
            clientPaid: true,
          },
          {
            where: {
              id: req.body.eventualityDetails[j].id,
            },
          }
        );
      }
    }

    await transact.commit();
    return res.json({
      code: 200,
      status: "success",
      ok: true,
      message: "El registro fue guardado con exito",
      data: payment,
    });
  } catch (error) {
    await transact.rollback();
    throw error;
  }
});

exports.GetById = findOne(PaymentClient, {
  include: [
    {
      model: Contract,
    },
    {
      model: PaymentType,
    },
  ],
});

exports.Put = update(PaymentClient, [
  "PaymentTypeId",
  "recharge",
  "total",
  "month",
  "year",
  "eventualityDetails",
  "ExpenseDetails",
]);
exports.allDebt = (req, res, next) => { };

exports.Destroy = catchAsync(async (req, res, next) => {
  const transact = await sequelize.transaction();
  try {
    const payment = await PaymentClient.findByPk(req.params.id, {
      transaction: transact,
    });

    if (payment.expenseDetails.length > 0) {
      for (let j = 0; j < payment.expenseDetails.length; j++) {
        if (
          payment.expenseDetails[j].debt &&
          !payment.expenseDetails[j].recharge
        ) {
          await DebtClient.update(
            {
              paid: false,
              paidDate: null,
            },
            {
              where: {
                id: payment.expenseDetails[j].id,
              },
            },
            { transaction: transact }
          );
        }
      }
    }

    if (payment.eventualityDetails.length > 0) {
      for (let j = 0; j < payment.eventualityDetails.length; j++) {
        await Eventuality.update(
          {
            clientPaid: false,
          },
          {
            where: {
              id: payment.eventualityDetails[j].id,
            },
          },
          { transaction: transact }
        );
      }
    }
    await PaymentClient.destroy(
      { where: { id: req.params.id }, force: true },
      { transaction: transact }
    );
    await transact.commit();
    return res.json({
      code: 200,
      status: "success",
      ok: true,
      message: "El registro fue eliminado con exito",
      //   data: payment,
    });
  } catch (error) {
    await transact.rollback();
    throw error;
  }
});
