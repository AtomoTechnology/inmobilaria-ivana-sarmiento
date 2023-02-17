const router=require('express').Router();
const ctrl= require('../controller/auth.controller');
const validador = require('../../helpers/validador');

router.get('/', ctrl.GetAll);
//Get by id
router.get('/:id', ctrl.GetById);

//Create
router.post('/',[validador.IsmailValid,validador.isPassValid], ctrl.Post);
router.post('/signin',[validador.IsValidDataLogin], ctrl.SignIn);

// //Update
// router.put('/:id', ctrl.Put);

// //Delete
// router.delete('/:id', ctrl.Delete);
module.exports = router;
