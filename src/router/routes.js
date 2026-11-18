const express = require("express");

const router = express.Router();

const controller = require("../controller/mainController");

router.post("/urls", controller.createUrl);

// Redirect using short code
router.get("/url/:shortCode", controller.redirectUrl);

module.exports = router;
