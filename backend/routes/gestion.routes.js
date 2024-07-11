const express = require("express");
const guardiaController = require("../controllers/gestion.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);


router.get("/guardias/", authorizationMiddleware.esAdmin, guardiaController.getGuardias);
router.get("/guardias/:id", authorizationMiddleware.esAdmin, guardiaController.getGuardiaById);
router.post("/guardias/", authorizationMiddleware.esAdmin, guardiaController.createGuardia);
router.put("/guardias/:id", authorizationMiddleware.esAdmin, guardiaController.updateGuardia);
router.delete("/guardias/:id", authorizationMiddleware.esAdmin, guardiaController.deleteGuardia);


module.exports = router;