const express = require('express');

const horasController = require("../controllers/horas.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);

router.post('/', authorizationMiddleware.esAdmin, horasController.createHorario);
router.get('/', horasController.getHorarios);
router.put('/:id', authorizationMiddleware.esAdmin, horasController.updateHorario);

module.exports = router;