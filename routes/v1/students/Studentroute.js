const express = require("express");
const router = express.Router();
const Studentservice = require("../../../controllers/v1/students/Studentcontroller");

// router.post("/student", Studentservice.createStudent);
router.get("/student", Studentservice.listStudents);
router.get("/student/:id", Studentservice.getStudentById);
router.get("/student/:id/marks", Studentservice.getStudentMarksById);
router.put("/student/:id", Studentservice.updateStudentById);
router.delete("/student/:id", Studentservice.deleteStudentById);
module.exports = router;
