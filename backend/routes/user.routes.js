"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/* Controladores */
const accesoController = require("../controllers/acceso.controller.js");
const usuarioController = require("../controllers/usuario.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

router.use(authenticationMiddleware);

// creacion de usuarios
router.post("/crear", usuarioController.crearUsuario); //Crear un usuario
// obtener todos los usuarios
router.get("/allUsers", usuarioController.getUsuarios);

// Define las rutas para los accesos a jaula
router.post("/acceder", accesoController.registrarIngreso); //Generar token para ingresar a una jaula
router.post("/validar", /*authorizationMiddleware.esGuardia,*/ accesoController.validarToken); //Validar token para ingresar a una jaula
router.post("/accesoInvitado", /*authorizationMiddleware.esGuardia,*/ accesoController.ingresoInvitado); //Registrar acceso manual de invitado a una jaula
//router.post("/salir", accesoController.salir); //Generar token para salir de una jaula

module.exports = router;
