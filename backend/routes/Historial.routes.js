const express = require("express");
const router = express.Router();
const accesoController = require("../controllers/Historial.controller");

router.get("/:usuarioId", accesoController.getHistorialByUsuarioId);

module.exports = router;