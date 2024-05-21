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
/*
// Define el middleware de autenticación para todas las rutas
function logRequest(req, res, next) { //funcion temporal mientras desarrollan el middleware de autenticacion********
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }
  
router.use(logRequest); //funcion temporal mientras desarrollan el middleware de autenticacion********
*/
router.use(authenticationMiddleware);

// creacion de usuarios

router.get("/precrear",authorizationMiddleware.esAdmin, usuarioController.preCreacion); // valida con api externa si es estuidante academico o funcionario
router.post("/crear", authorizationMiddleware.esAdmin ,usuarioController.crearUsuario); //Crear un usuario

// Define las rutas para los accesos a jaula
router.post("/acceder", accesoController.registrarIngreso); //Generar token para ingresar a una jaula
router.post("/validar", accesoController.validarToken); //Validar token para ingresar a una jaula
//router.post("/salir", accesoController.salir); //Generar token para salir de una jaula

module.exports = router;