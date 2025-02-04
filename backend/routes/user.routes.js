"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/* Controladores */
const accesoController = require("../controllers/acceso.controller.js");

const usuarioController = require("../controllers/usuario.controller.js");

const bicicletaController = require("../controllers/bicicleta.controller.js");

const historialController = require("../controllers/historial.controller.js")

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

router.get("/verificar",authorizationMiddleware.esAcademico, usuarioController.verificarIntranet); // valida con api externa si es estuidante academico o funcionario
router.post("/crear", authorizationMiddleware.esAdmin ,usuarioController.crearUsuario); //Crear un usuario
router.get("/allUsers", usuarioController.getUsuarios); // Obtener todos los usuarios
router.delete("/delete/:id", authorizationMiddleware.esAdmin, usuarioController.eliminarUsuario); // Eliminar un usuario
router.put("/update/:id", authorizationMiddleware.esAdmin, usuarioController.editarUsuario); // Actualizar un usuario

// Define las rutas para los accesos a jaula
router.post("/acceder", accesoController.registrarIngreso); //Generar token para ingresar a una jaula
router.get("/accesoActivo", accesoController.getAccesoActivo); //Verificar si el usuario tiene un token activo
router.put("/salir", accesoController.registrarSalida); //Generar token para salir de una jaula

// Define las rutas post acceso a jaula
router.get("/bicicleta", bicicletaController.getBicicleta); //Ver detalles de la bicicleta del estudiante
router.post("/bicicleta", bicicletaController.createBicicleta); //Definir detalles de la bicicleta del estudiante
router.put("/bicicleta", bicicletaController.updateBicicleta); //Actualizar detalles de la bicicleta del estudiante

router.get("/historial" , historialController.getHistorialUsuario);

// Ruta para las notificaciones
router.post("/notif", usuarioController.enviarNotif);


module.exports = router;