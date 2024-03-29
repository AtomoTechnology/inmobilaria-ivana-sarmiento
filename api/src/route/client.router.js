const router=require('express').Router();
const ctrl= require('../controller/client.controller');
const validador = require('../../helpers/validador');

router.use(validador.protect);
router.get('/', ctrl.GetAll);
router.get('/paginate', ctrl.Paginate);
//Get by id
router.get('/:id', ctrl.GetById);

//Create
router.post('/', ctrl.Create);

//Update
router.put('/:id',ctrl.Put);

//Delete
router.delete('/:id', ctrl.Destroy);
module.exports = router;
