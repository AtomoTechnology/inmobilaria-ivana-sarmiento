const router = require('express').Router()
const ctrl = require('../controller/contract.controller')
const validador = require('../../helpers/validador')

router.use(validador.protect)
router.get('/', ctrl.GetAll)
//Get by id
router.get('/:id', ctrl.GetById)
router.get('/expired-contracts/:days', ctrl.ExpiredContracts)
router.get('/historial/prices', ctrl.HistorialPrice)

//Create
router.post('/', ctrl.Post)

//Update
router.put('/:id', ctrl.Put)

//Delete
router.delete('/:id', ctrl.Destroy)
module.exports = router
