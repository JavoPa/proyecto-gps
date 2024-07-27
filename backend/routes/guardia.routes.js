"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/* Controladores */
const accesoController = require("../controllers/acceso.controller.js");
const bicicletaController = require("../controllers/bicicleta.controller.js");
const userController = require("../controllers/usuario.controller.js");
const historialController = require("../controllers/historial.controller.js")
const usuarioController = require("../controllers/usuario.controller.js");
const jaulaController = require("../controllers/jaula.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

router.use(authenticationMiddleware);

// Define las rutas para los guardias
router.post("/validar/:token", authorizationMiddleware.esGuardia, accesoController.validarToken); //Validar token para ingresar a una jaula
router.post("/accesoInvitado", authorizationMiddleware.esGuardia, accesoController.ingresoInvitado); //Registrar acceso manual de invitado a una jaula
router.get("/bicicleta/:id", authorizationMiddleware.esGuardia, bicicletaController.getBicicletaById); //Ver detalles de la bicicleta del estudiante por id
router.get("/estudiante/:id", authorizationMiddleware.esGuardia, userController.getUserById); //Ver detalles del estudiante por id
router.post("/bicicleta/:id", authorizationMiddleware.esGuardia, bicicletaController.updateBicicletaUsuario); //Registrar bicicleta de un estudiante
router.get("/historial", authorizationMiddleware.esGuardia, historialController.getAllHistorial); //Ver el historial completo de accesos
router.post("/accesoGuardia", authorizationMiddleware.esGuardia, accesoController.ingresoGuardia); //Registrar acceso del guardia a una jaula   
router.post('/salidaGuardia', authorizationMiddleware.esGuardia, accesoController.salidaGuardia); //Registrar salida del guardia de una jaula
router.get("/jaulaAsignada", authorizationMiddleware.esGuardia, jaulaController.getJaulaAsignada);

router.get("/usuariosbicicletas", authorizationMiddleware.esGuardia, usuarioController.indexUsuariosConBicicleta);
router.get("/usuario/:id", authorizationMiddleware.esGuardia, usuarioController.getUsuario);

module.exports = router;