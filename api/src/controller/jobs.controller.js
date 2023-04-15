const {
    DebtClient,
    Contract,
    ClientExpense,
    Client,
    PaymentClient,
    DebtOwner,
    sequelize,
    Property,
    PriceHistorial,
    PaymentOwner,
    Owner,
    OwnerExpense,
    JobLog,
} = require('../../models')


const {
    catchAsync
} = require('../../helpers/catchAsync')
const {
    Op
} = require('sequelize')
const {
    monthsInSpanish
} = require('../../helpers/variablesAndConstantes')


exports.jobDebtsClients = catchAsync(async (req, res, next) => {
    console.log("Ingreso en el job")
    const transact = await sequelize.transaction()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    console.log('MONTH ::: ', monthsInSpanish[month - 1])

    try {
        const docs = await PaymentClient.findAll({
            where: {
                [Op.and]: {
                    month: monthsInSpanish[month - 1],
                    year,
                },
            },
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('ContractId')), 'ContractId']
            ],
        }, {
            transaction: transact
        })


        // if (docs.length === 0) {
        // 	console.log('entra acaaa...')
        // 	await transact.rollback();
        // 	return;
        // }
        console.log('FECHAS ::: ', (new Date(year, month - 1, new Date(year, month, 0).getDate())))
        console.log('DOCS ::: ', docs)

        // ids de los contratos que pagaron el mes anterior
        let ids = []
        if (docs.length > 0) {
            console.log('entreooooooooo')
            ids = docs.map(doc => doc.ContractId)
        }
        console.log('IDS ::: ', ids)

        const docs2 = await Contract.findAll({
            where: {
                id: {
                    [Op.notIn]: ids,
                },
                state: 'En curso',
                startDate: { [Op.lt]: new Date(year, month - 1, new Date(year, month, 0).getDate()) },
                endDate: { [Op.gt]: new Date() },

            },
            include: [{
                model: ClientExpense
            }, {
                model: Property
            }, {
                model: PriceHistorial
            }],
        }, {
            transaction: transact
        })

        for (let k = 0; k < docs2.length; k++) {
            const exist = await DebtClient.findOne({
                where: {
                    year,
                    month,
                    ContractId: docs2[k].id
                }
            })
            if (!exist) {
                await DebtClient.create({
                    description: 'ALQUILER ' + docs2[k].Property.street +
                        ' ' +
                        docs2[k].Property.number +
                        ' ' +
                        docs2[k].Property.dept +
                        '-' +
                        docs2[k].Property.floor +
                        ' ' +
                        monthsInSpanish[month - 1] +
                        ' ' +
                        year,
                    amount: docs2[k].PriceHistorials.sort((a, b) => a.amount - b.amount)[docs2[k].PriceHistorials.length - 1]
                        .amount,
                    year,
                    month,
                    rent: true,
                    ContractId: docs2[k].id,
                }, {
                    transaction: transact
                })
                for (let l = 0; l < docs2[k].ClientExpenses.length; l++) {
                    await DebtClient.create({
                        description: docs2[k].ClientExpenses[l].description + ' ' + monthsInSpanish[month - 1] + ' ' + year,
                        amount: docs2[k].ClientExpenses[l].amount,
                        year,
                        month,
                        ContractId: docs2[k].id,
                    }, {
                        transaction: transact
                    })
                }
            }
        }

        await JobLog.create({
            type: 'debts',
            state: 'success',
            message: 'DEBTS CLIENT JOB DONE SUCCESSFULLY.',

        })
        await transact.commit()
        res.json({
            ok: true,
            message: 'Operación realizada con éxito.',
            result: docs2.length,
            data: docs2
        })

    } catch (error) {
        await transact.rollback()
        await JobLog.create({
            type: 'debts',
            state: 'fail',
            message: error?.message || 'Something went wrong.',
        })
    }
})


exports.jobDebtsOwner = catchAsync(async (req, res, next) => {
    console.log("Ingreso en el job");
    const transact = await sequelize.transaction();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    console.log("MONTH ::: ", monthsInSpanish[month - 1]);

    try {
        const docs = await PaymentOwner.findAll(
            {
                where: {
                    [Op.and]: {
                        month: monthsInSpanish[month - 1],
                        year,
                    },
                },
                attributes: [
                    [sequelize.fn("DISTINCT", sequelize.col("OwnerId")), "OwnerId"],
                ],
            },
            {
                transaction: transact,
            }
        );
        // console.log("DOCS ::: ", docs);
        // id OWNERS QUE COBRARON EN EL MES ANTERIOR
        let ids = [];
        if (docs.length > 0) {
            console.log("entreooooooooo");
            ids = docs.map((doc) => doc.OwnerId);
        }
        console.log("IDS11 OWNERS QUE COBRARON EN EL MES ANTERIOR ::: ", ids);

        // get owner who did not receive payment last month
        const docs2 = await Owner.findAll(
            {
                where: {
                    id: {
                        [Op.notIn]: ids,
                    },
                },
                include: [
                    {
                        model: Property,
                    },
                ],
            },
            {
                transaction: transact,
            }
        );
        // ids  de los owners que no recibieron pago
        let ids2 = [];
        if (docs2.length > 0) {
            console.log("entreooooooooo2222222222");
            ids2 = docs2.map((doc) => doc.id);
        }

        console.log("IDS222 OWNERS QUE  NOOO COBRARON EN EL MES ANTERIOR ::: ", ids2);


        const properties = await Property.findAll({
            where: {
                OwnerId: {
                    [Op.in]: ids2,
                },
                state: "Ocupado",
                // TODO ::: state: 'Ocupado' should i add this?
            },
            attributes: ['id', 'street', 'number', 'dept', 'floor']
        })


        // las propiedades impagas de los owners que no recibieron pago
        let ids3 = [];
        if (properties.length > 0) {
            console.log("entreooooooooo3333");
            ids3 = properties.map((doc) => doc.id);
        }
        console.log("IDS3333 propiedades QUE NOOO  COBRARON EN EL MES ANTERIOR ::: ", ids3);
        const contractNotPaid = await Contract.findAll(
            {
                where: {
                    PropertyId: {
                        [Op.in]: ids3,
                    },
                    state: "En curso",
                    startDate: {
                        [Op.lt]: new Date(
                            year,
                            month - 1,
                            new Date(year, month, 0).getDate()
                        ),
                    },
                    endDate: { [Op.gt]: new Date() },
                    // TODO ::: endDate should i add this? endDate < Date().now()
                },
                include: [
                    {
                        model: OwnerExpense,
                    },
                    {
                        model: Property,
                        include: [{ model: Owner, attributes: ['id', 'commision'] }],
                    },
                    {
                        model: PriceHistorial,
                    },
                ],
            },
            {
                transaction: transact,
            }
        );

        for (let k = 0; k < contractNotPaid.length; k++) {
            const exist = await DebtOwner.findOne({
                where: {
                    year,
                    month,
                    ContractId: contractNotPaid[k].id,
                },
            });
            if (!exist) {
                await DebtOwner.create(
                    {
                        description:
                            "ALQUILER " +
                            contractNotPaid[k].Property.street +
                            " " +
                            contractNotPaid[k].Property.number +
                            " " +
                            contractNotPaid[k].Property.dept +
                            "-" +
                            contractNotPaid[k].Property.floor +
                            " " +
                            monthsInSpanish[month - 1] +
                            " " +
                            year,
                        amount: contractNotPaid[k].PriceHistorials.sort(
                            (a, b) => a.amount - b.amount
                        )[contractNotPaid[k].PriceHistorials.length - 1].amount,
                        year,
                        month,
                        rent: true,
                        ContractId: contractNotPaid[k].id,
                    },
                    {
                        transaction: transact,
                    }
                );
                await DebtOwner.create(
                    {
                        description:
                            "HONORARIOS " +
                            contractNotPaid[k].Property.street +
                            " " +
                            contractNotPaid[k].Property.number +
                            " " +
                            contractNotPaid[k].Property.dept +
                            "-" +
                            contractNotPaid[k].Property.floor +
                            " " +
                            monthsInSpanish[month - 1] +
                            " " +
                            year,
                        amount: contractNotPaid[k].PriceHistorials.sort(
                            (a, b) => a.amount - b.amount
                        )[contractNotPaid[k].PriceHistorials.length - 1].amount * (-1) * (contractNotPaid[k].Property.Owner.commision / 100),
                        year,
                        month,
                        ContractId: contractNotPaid[k].id,
                    },
                    {
                        transaction: transact,
                    }
                );
                for (let l = 0; l < contractNotPaid[k].OwnerExpenses.length; l++) {
                    await DebtOwner.create(
                        {
                            description:
                                contractNotPaid[k].OwnerExpenses[l].description +
                                " " +
                                monthsInSpanish[month - 1] +
                                " " +
                                year,
                            amount: contractNotPaid[k].OwnerExpenses[l].amount,
                            year,
                            month,
                            ContractId: contractNotPaid[k].id,
                        },
                        {
                            transaction: transact,
                        }
                    );
                }
            }
        }
        // return res.json({ docs, docs2, properties, contractNotPaid });	

        await JobLog.create({
            type: "debts",
            state: "success",
            message: "DEBTS OWNER JOB DONE SUCCESSFULLY.",
        });
        await transact.commit();
        // next()
        // return res.json(
        // 	contractNotPaid
        // )
        return res.json({
            ok: true,
            message: 'Operación realizada con éxito.',
            result: contractNotPaid.length,
            contractNotPaid
            // data: docs2
        })
    } catch (error) {
        await JobLog.create({
            type: "debts",
            state: "fail",
            message: error.message || "Something went wrong.",
        });
        await transact.rollback();

        // throw error
    }
});
