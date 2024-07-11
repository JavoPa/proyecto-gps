const express = require("express");
const router = express.Router();
const accesoController = require("../controllers/historial.controller");

router.get("/:usuarioId", accesoController.getHistorialByUsuarioId);

module.exports = router;