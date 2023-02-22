var router = require('express').Router();

router.use('/api/v1/paymenttypes', require('../route/paymenttype.router'));
router.use('/api/v1/zones', require('../route/zone.router'));
router.use('/api/v1/auth', require('../route/auth.router'));
router.use('/api/v1/propertytypes',  require('../Route/propertyType.route'));
router.use('/api/v1/owners', require('../Route/owner.router'));
router.use('/api/v1/clients', require('../Route/client.router'));
router.use('/api/v1/properties', require('../Route/property.router'));
// router.use('/api/v1/kayaks', require('../Route/kayak.router'));
// router.use('/api/v1/kayaktypes', require('../Route/kayaktype.router'));
// router.use('/api/v1/contacts', require('../Route/contact.router'));

module.exports = router;
