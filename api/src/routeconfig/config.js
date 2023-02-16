var router=require('express').Router();

const paymenttype = require('../route/paymenttype.router');

router.use('/api/v1/paymenttypes', paymenttype);
// router.use('/api/v1/businesses', business);
// router.use('/api/v1/auth',  require('../Route/auth.router'));
// router.use('/api/v1/locations',  require('../Route/location.router'));
// router.use('/api/v1/documenttypes', require('../Route/documentType.router'));
// router.use('/api/v1/roles', require('../Route/role.router'));
// router.use('/api/v1/hangers', require('../Route/hanger.router'));
// router.use('/api/v1/kayaks', require('../Route/kayak.router'));
// router.use('/api/v1/kayaktypes', require('../Route/kayaktype.router'));
// router.use('/api/v1/contacts', require('../Route/contact.router'));

module.exports = router;
