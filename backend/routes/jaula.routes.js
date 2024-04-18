const express = require('express');
const router = express.Router();
const jaulaController = require('../controllers/jaula.controller.js');

router.post('/', jaulaController.create);
router.get('/', jaulaController.findAll);
router.get('/:jaulaId', jaulaController.findOne);
router.put('/:jaulaId', jaulaController.update);
router.delete('/:jaulaId', jaulaController.delete);

module.exports = router;
