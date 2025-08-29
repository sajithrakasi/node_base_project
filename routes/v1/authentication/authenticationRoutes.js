const express = require("express");
const router = express.Router();
const authService = require("../../../controllers/v1/authentication/authService")

//AuthenticationRoute
router.post("/student", authService.auth);

module.exports = router;