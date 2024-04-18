var express = require('express');
var router = express.Router();

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de jaulas */
const jaulaRoutes = require("./jaula.routes.js"); // Make sure the path is correct

/** Enrutador de guardias */
const guardiaRoutes = require("./guardia.routes.js"); // Add this line

/** Enrutador de bicicletas */
const bicicletaRoutes = require("./bicicleta.routes.js"); // Add this line

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para las jaulas /api/jaulas
router.use("/jaulas", authenticationMiddleware, jaulaRoutes);
// Define las rutas para los guardias /api/guardias
router.use("/guardias", authenticationMiddleware, guardiaRoutes);
// Define las rutas para las bicicletas /api/bicicletas
router.use("/bicicletas", authenticationMiddleware, bicicletaRoutes);

module.exports = router;
