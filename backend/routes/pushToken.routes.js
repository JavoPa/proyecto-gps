const express = require('express');
const router = express.Router();
const { actualizarPushToken, limpiarPushToken } = require("../controllers/pushToken.controller.js");
const verifyJWT = require("../middlewares/authentication.middleware.js");

router.put("/update", verifyJWT, actualizarPushToken);
router.put("/clear", verifyJWT, limpiarPushToken);

module.exports = router;