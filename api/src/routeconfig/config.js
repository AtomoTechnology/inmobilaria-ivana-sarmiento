var router = require('express').Router();

router.use('/api/v1/paymenttypes', require('../route/paymenttype.router'));
router.use('/api/v1/zones', require('../route/zone.router'));
router.use('/api/v1/auth', require('../route/auth.router'));
router.use('/api/v1/propertytypes', require('../Route/propertyType.route'));
router.use('/api/v1/owners', require('../Route/owner.router'));
router.use('/api/v1/clients', require('../Route/client.router'));
router.use('/api/v1/properties', require('../Route/property.router'));
router.use('/api/v1/contracts', require('../Route/contract.router'));
router.use('/api/v1/eventualities', require('../Route/eventuality.router'));
router.use('/api/v1/assurances', require('../Route/assurance.route'));
router.use('/api/v1/payments', require('../Route/payment.route'));
router.use('/api/v1/visits', require('../Route/visit.router'));

module.exports = router;