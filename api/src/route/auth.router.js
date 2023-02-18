const router = require('express').Router();
const ctrl = require('../controller/auth.controller');
const validador = require('../../helpers/validador');

router.get('/', [validador.verifyToken], ctrl.GetAll);
//Get by id
router.get('/:id', [validador.verifyToken], ctrl.GetById);

//Create
router.post('/', [validador.verifyToken, validador.IsmailValid, validador.isPassValid], ctrl.Post);
router.post('/signin', [validador.IsValidDataLogin], ctrl.SignIn);

// //Update
// router.put('/:id', ctrl.Put);

// //Delete
// router.delete('/:id', ctrl.Delete);
module.exports = router;
