const express = require('express');
const router = express.Router();
const bicicletaController = require('../controllers/bicicleta.controller.js');

router.post('/', bicicletaController.create);
router.get('/', bicicletaController.findAll);
router.get('/:bicicletaId', bicicletaController.findOne);
router.put('/:bicicletaId', bicicletaController.update);
router.delete('/:bicicletaId', bicicletaController.delete);

module.exports = router;
