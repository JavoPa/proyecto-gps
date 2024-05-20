
const express = require("express");

const authController = require("../controllers/auth.controller.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh" ,authenticationMiddleware,authController.refresh);

// Exporta el enrutador
module.exports = router;