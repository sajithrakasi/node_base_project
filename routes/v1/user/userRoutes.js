const express = require("express");
const router = express.Router();
const userService = require("../../../services/v1/user/userService")

//AuthenticationRoute
router.post("/login", userService.createUser);
router.post("/list-users", userService.listUsers);

module.exports = router;