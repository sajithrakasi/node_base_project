
const express = require("express");
const router = express.Router();
const report = require("../../../controllers/v1/students/Reportcontroller");


router.get("/download", report.listReport);



module.exports = router;



