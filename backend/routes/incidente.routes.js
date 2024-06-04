"use strict";
const express = require("express");
const router = express.Router();
const incidenteController = require("../controllers/incidente.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// Apply authentication middleware to all routes in this router
router.use(authenticationMiddleware);

router.get("/todos", incidenteController.getIncidentes); // Ruta para obtener todos los incidentes
router.get("/dia", authorizationMiddleware.esAcademico || authorizationMiddleware.esGuardia, incidenteController.getIncidentesDia); // Ruta para obtener los incidentes de un día en específico
router.post("/crear", incidenteController.crearIncidente); // Ruta para crear un incidente
router.get('/informe', incidenteController.generarInforme); // Ruta para obtener informe de incidentes de un mes

module.exports = router;