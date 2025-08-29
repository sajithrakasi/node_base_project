const express = require("express");
const router = express.Router();
const studentSub = require("../../../controllers/v1/students/Subjectcontroller")

//AuthenticationRoute
router.post("/studentSub", studentSub.createStudentSub);
router.get("/studentSub", studentSub.listStudentSub);
router.get("/studentSub/:id", studentSub.getStudentSubById);
router.get("/studentSub/:subcode/mark", studentSub.getStudentMarksBySubjectId);
router.put("/studentSub/:id", studentSub.updateStudentSubById);
router.delete("/studentSub/:id", studentSub.deleteStudentSubById);

module.exports = router;