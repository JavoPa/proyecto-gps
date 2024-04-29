
const router = require('express').Router();
const usuarios = require('./request.router.js');


// middleware para manejar las rutas


router.get('/users',usuarios);


module.exports = router;