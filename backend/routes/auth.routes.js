
const express = require("express");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh" ,authController.refresh);

// Exporta el enrutador
module.exports = router;