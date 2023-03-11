const {
    PaymentClient,
    Eventuality,
    Client,
    Property,
    sequelize
} = require('../../models');

const {
    all,
    paginate,
    create,
    findOne,
    update,
    destroy
} = require('../Generic/FactoryGeneric');
const {
    catchAsync
} = require('../../helpers/catchAsync');

exports.GetAll = all(PaymentClient, {
    include: [{
            model: Eventuality
        },
        {
            model: Property
        },
        {
            model: Client
        }
    ]
});
exports.Paginate = paginate(PaymentClient, {
    include: [{
            model: Eventuality
        },
        {
            model: Property
        },
        {
            model: Client
        }
    ]
});

exports.Post =
    catchAsync(async (req, res, next) => {
        const transact = await sequelize.transaction();
        try {

            if (req.body.eventualityList !== undefined) {
                if (req.body.eventualityList.length > 0) {
                    req.body.eventualityJson = req.body.eventualityList.join(', ');
                }
            }
            const cont = await PaymentClient.create(req.body, {
                transaction: transact
            });

            await transact.commit();
            return res.json({
                code: 200,
                status: 'success',
                ok: true,
                message: 'El registro fue guardado con exito',
                data: cont,
            });
        } catch (error) {
            await transact.rollback();
            throw error;
        }
    });



exports.GetById = findOne(PaymentClient, {
    include: [{
            model: Eventuality
        },
        {
            model: Property
        },
        {
            model: Client
        },
        {
            model: Eventuality
        }
    ],
});

exports.Put = update(PaymentClient, [
    'PaymentTypeId',
    'insurance',
    'water',
    'TGI',
    'compensation',
    'bankingExpenses',
    'admExpenses',
    'recharge',
    'total',
    'totalPro',
    'eventualityJson'
]);
exports.Destroy = destroy(PaymentClient);