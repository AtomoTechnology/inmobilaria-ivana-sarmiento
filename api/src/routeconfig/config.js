var router = require('express').Router();

router.use('/api/v1/paymenttypes', require('../route/paymenttype.router'));
router.use('/api/v1/zones', require('../route/zone.router'));
router.use('/api/v1/auth', require('../route/auth.router'));
router.use('/api/v1/propertytypes',  require('../Route/property.router'));

// router.use('/api/v1/documenttypes', require('../Route/documentType.router'));
// router.use('/api/v1/roles', require('../Route/role.router'));
// router.use('/api/v1/hangers', require('../Route/hanger.router'));
// router.use('/api/v1/kayaks', require('../Route/kayak.router'));
// router.use('/api/v1/kayaktypes', require('../Route/kayaktype.router'));
// router.use('/api/v1/contacts', require('../Route/contact.router'));

module.exports = router;
