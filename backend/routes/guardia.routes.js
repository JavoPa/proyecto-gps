"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/* Controladores */
const accesoController = require("../controllers/acceso.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

router.use(authenticationMiddleware);

// Define las rutas para los guardias
router.post("/validar", authorizationMiddleware.esGuardia, accesoController.validarToken); //Validar token para ingresar a una jaula
router.post("/accesoInvitado", authorizationMiddleware.esGuardia, accesoController.ingresoInvitado); //Registrar acceso manual de invitado a una jaula
router.get("/bicicleta/:id", authorizationMiddleware.esGuardia, accesoController.obtenerBicicletaPorId); //Ver detalles de la bicicleta del estudiante por id
router.get("/estudiante/:id", authorizationMiddleware.esGuardia, accesoController.obtenerEstudiantePorId); //Ver detalles del estudiante por id