const router = require('express').Router();
const ctrl = require('../controller/auth.controller');
const validador = require('../../helpers/validador');

router.post('/signin', ctrl.SignIn);
router.use(validador.protect);

router.get('/', ctrl.GetAll);
//Get by id
router.get('/:id', ctrl.GetById);

//Create
router.post('/', ctrl.Post);

// //Update
// router.put('/:id', ctrl.Put);

// //Delete
// router.delete('/:id', ctrl.Delete);
module.exports = router;
