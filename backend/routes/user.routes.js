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
// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);
