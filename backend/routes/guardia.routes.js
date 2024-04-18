const express = require('express');
const router = express.Router();
const guardiaController = require('../controllers/guardia.controller.js');

router.post('/', guardiaController.create);
router.get('/', guardiaController.findAll);
router.get('/:guardiaId', guardiaController.findOne);
router.put('/:guardiaId', guardiaController.update);
router.delete('/:guardiaId', guardiaController.delete);

module.exports = router;
