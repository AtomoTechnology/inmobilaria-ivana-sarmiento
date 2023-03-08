const router = require('express').Router();
const ctrl = require('../controller/auth.controller');
const validador = require('../../helpers/validador');

router.post('/signin', ctrl.SignIn);
router.use(validador.protect);

router.get('/', ctrl.GetAll);
//Get by id
router.get('/:id', ctrl.GetById);

//Create
router.post('/', ctrl.SignUp);

router.put('/', ctrl.forgotPassword);
router.delete('/:id', ctrl.resetPassword);
router.delete('/:id', ctrl.updatePassword);

module.exports = router;
