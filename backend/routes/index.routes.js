var express = require('express');
var router = express.Router();

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");
/** Enrutador de incidentes  */
const incidenteRoutes = require("./incidente.routes.js");
/** Enrutador de guardias */
const guardiaRoutes = require("./guardia.routes.js");
/** Enrutador de horas */
const horasRoutes = require("./horas.routes.js");

const jaulaRoutes = require("./jaula.routes.js");

/** Enrutador gestion guardias */
const gestionRoutes = require("./gestion.routes.js");


/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para los incidentes /api/incidentes
router.use("/incidentes", incidenteRoutes);
// Define las rutas para los guardias /api/guardias
router.use("/guardias", authenticationMiddleware, guardiaRoutes);
// Define las rutas para las jaulas
router.use("/jaulas", authenticationMiddleware, jaulaRoutes);
// Define las rutas para los horarios /api/horarios
router.use("/horarios", authenticationMiddleware, horasRoutes);
// Define las rutas para ver a los guardias /api/admin/
router.use("/Admin", authenticationMiddleware, gestionRoutes);
module.exports = router;
