var router = require('express').Router()
const ctrlJobs = require("./../controller/jobs.controller");

router.use('/api/v1/paymenttypes', require('../route/paymenttype.router'))
router.use('/api/v1/zones', require('../route/zone.router'))
router.use('/api/v1/auth', require('../route/auth.router'))
router.use('/api/v1/propertytypes', require('../Route/propertyType.router'))
router.use('/api/v1/owners', require('../Route/owner.router'))
router.use('/api/v1/clients', require('../Route/client.router'))
router.use('/api/v1/properties', require('../Route/property.router'))
router.use('/api/v1/contracts', require('../Route/contract.router'))
router.use('/api/v1/eventualities', require('../Route/eventuality.router'))
router.use('/api/v1/price-historial', require('../Route/historyPrice.router'))
router.use('/api/v1/assurances', require('../Route/assurance.router'))
router.use('/api/v1/visits', require('../Route/visit.router'))
router.use('/api/v1/claims', require('../Route/claim.router'))
router.use('/api/v1/client-expenses', require('../Route/clientExpense.router'))
router.use('/api/v1/owner-expenses', require('../Route/ownerExpense.router'))
router.use('/api/v1/config', require('../Route/config.router'))
router.use('/api/v1/payment-clients', require('../Route/paymentClient.router'))
router.use('/api/v1/payment-owners', require('../Route/paymentOwner.router'))
router.use('/api/v1/debt-clients', require('../Route/debtClient.router'))
router.use('/api/v1/debt-owners', require('../Route/debtOwner.router'))


router.post('/api/v1/jobs-debts-clients', ctrlJobs.jobDebtsClients)
router.post('/api/v1/jobs-debts-owners', ctrlJobs.jobDebtsOwner)

module.exports = router
