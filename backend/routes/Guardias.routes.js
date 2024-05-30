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


router.get("/", guardiaController.getGuardias);
router.get("/:id", guardiaController.getGuardiaById);
router.post("/", guardiaController.createGuardia);
router.put("/:id", guardiaController.updateGuardia);
router.delete("/:id", guardiaController.deleteGuardia);


module.exports = router;