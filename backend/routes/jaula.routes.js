const express = require('express');
const router = express.Router();
const { getJaula } = require('../controllers/jaula.controller');

router.get('/', listarJaulas);  
router.get('/:id', getJaula);

module.exports = router;
