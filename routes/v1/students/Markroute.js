const express = require("express");
const router = express.Router();
const studentMark = require("../../../controllers/v1/students/Markcontroller")

//AuthenticationRoute
router.post("/studentMark", studentMark.createStudentMark);
router.get("/studentMark", studentMark.listStudentMark);
router.get("/studentMark/:id", studentMark.getStudentMarkById);
router.put("/studentMark/:id", studentMark.updateStudentMarkById);
router.delete("/studentMark/:id", studentMark.deleteStudentMarkById);
// router.get("/studentMark/:id", studentMark.getStudentMarksById);



module.exports = router;