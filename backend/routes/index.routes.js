var express = require('express');
var router = express.Router();

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/usuarios
router.use("/users",authenticationMiddleware, userRoutes);

module.exports = router;
