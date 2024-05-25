"use strict";
const express = require("express");
const router = express.Router();
const incidenteController = require("../controllers/incidente.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

router.use(authenticationMiddleware);

// Ruta para obtener todos los incidentes
router.get("/todos", incidenteController.getIncidentes);
router.get("/dia", incidenteController.getIncidentesDia);
router.post("/crear", incidenteController.crearIncidente);

module.exports = router;