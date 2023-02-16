const router=require('express').Router();
const ctrl= require('../controller/auth.controller');

router.get('/', ctrl.GetAll);
//Get by id
router.get('/:id', ctrl.GetById);

//Create
router.post('/', ctrl.Post);
router.post('/signin', ctrl.SignIn);

// //Update
// router.put('/:id', ctrl.Put);

// //Delete
// router.delete('/:id', ctrl.Delete);
module.exports = router;
