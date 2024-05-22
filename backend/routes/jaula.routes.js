const express = require('express');
const router = express.Router();


const jaulaController = require("../controllers/jaula.controller.js");
router.post('/', jaulaController.crearJaula);

router.get('/', jaulaController.listarJaulas);  
router.get('/:id', jaulaController.getJaula);

module.exports = router;
