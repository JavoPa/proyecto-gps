"use strict";
const express = require("express");
const router = express.Router();
const incidenteController = require("../controllers/incidente.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// Apply authentication middleware to all routes in this router
router.use(authenticationMiddleware);

router.get("/todos", incidenteController.getIncidentes); // Obtener todos los incidentes
router.get("/dia", authorizationMiddleware.esAcademico || authorizationMiddleware.esGuardia, incidenteController.getIncidentesDia); // Route to get incidents for a specific day, restricted to administrador and guardia

// Route to create an incident
router.post("/crear", incidenteController.crearIncidente);

module.exports = router;