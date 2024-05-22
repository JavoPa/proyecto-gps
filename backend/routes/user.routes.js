"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/* Controladores */
const accesoController = require("../controllers/acceso.controller.js");

const usuarioController = require("../controllers/usuario.controller.js");

const bicicletaController = require("../controllers/bicicleta.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

router.use(authenticationMiddleware);

// creacion de usuarios

router.post("/crear", usuarioController.crearUsuario); //Crear un usuario

// Define las rutas para los accesos a jaula
router.post("/acceder", accesoController.registrarIngreso); //Generar token para ingresar a una jaula
//router.post("/salir", accesoController.salir); //Generar token para salir de una jaula

// Define las rutas post acceso a jaula
router.get("/bicicleta", bicicletaController.getBicicleta); //Ver detalles de la bicicleta del estudiante
router.post("/bicicleta", bicicletaController.createBicicleta); //Definir detalles de la bicicleta del estudiante
router.put("/bicicleta", bicicletaController.updateBicicleta); //Actualizar detalles de la bicicleta del estudiante
router.get('/usersbici', authorizationMiddleware, usuarioController.indexUsuariosConBicicleta);
router.get('/:id', authorizationMiddleware, usuarioController.getUsuario);


module.exports = router;