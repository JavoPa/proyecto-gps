

const router = require('express').Router();
const userController = require('../controllers/user.controller.js');

router.post('/obtener', userController.obtenerUsuarios);

module.exports = router;