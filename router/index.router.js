
const router = require('express').Router();
const consulta = require('./request.router.js');


// middleware para manejar las rutas

router.use('/users',consulta);

module.exports = router;