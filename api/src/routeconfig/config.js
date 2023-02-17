var router=require('express').Router();

const paymenttype = require('../route/paymenttype.router');
const zone = require('../route/zone.router');

router.use('/api/v1/paymenttypes', paymenttype);
router.use('/api/v1/zones', zone);
router.use('/api/v1/auth',  require('../route/auth.router'));
// router.use('/api/v1/locations',  require('../Route/location.router'));
// router.use('/api/v1/documenttypes', require('../Route/documentType.router'));
// router.use('/api/v1/roles', require('../Route/role.router'));
// router.use('/api/v1/hangers', require('../Route/hanger.router'));
// router.use('/api/v1/kayaks', require('../Route/kayak.router'));
// router.use('/api/v1/kayaktypes', require('../Route/kayaktype.router'));
// router.use('/api/v1/contacts', require('../Route/contact.router'));

module.exports = router;