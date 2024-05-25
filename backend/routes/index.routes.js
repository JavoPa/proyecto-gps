var express = require('express');
var router = express.Router();

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de incidentes  */
const incidenteRoutes = require("./incidente.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para los incidentes /api/incidentes
router.use("/incidentes", incidenteRoutes);

module.exports = router;
