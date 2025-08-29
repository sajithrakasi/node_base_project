const express = require("express");
const router = express.Router();
const encryptMiddleware = require("../middlewares/common/dataSecurity");

const authRoutes = require("./v1/authentication/authenticationRoutes");
const student = require("./v1/students/Studentroute");
const subject = require("./v1/students/Subjectroute");
const marks = require("./v1/students/Markroute");
const report= require("./v1/students/report")

router.use(express.json());

// Apply encryption middleware and route handlers
router.use("/auth", encryptMiddleware, authRoutes);
router.use("/student", encryptMiddleware, student);
router.use("/subject", encryptMiddleware, subject);
router.use("/marks", encryptMiddleware, marks);
router.use("/report", encryptMiddleware, report);


module.exports = router;
