const express = require("express");
const guardiaController = require("../controllers/Guardias.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);


router.get("/guardias/", guardiaController.getGuardias);
router.get("/guardias/:id", guardiaController.getGuardiaById);
router.post("/guardias/", guardiaController.createGuardia);
router.put("/guardias/:id", guardiaController.updateGuardia);
router.delete("/guardias/:id", guardiaController.deleteGuardia);


module.exports = router;