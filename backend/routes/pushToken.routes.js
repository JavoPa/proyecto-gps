const express = require('express');
const router = express.Router();
const { actualizarPushToken } = require("../controllers/pushToken.controller.js");
const verifyJWT = require("../middlewares/authentication.middleware.js");

router.put("/update", verifyJWT, actualizarPushToken);

module.exports = router;