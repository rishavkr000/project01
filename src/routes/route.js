const express = require("express");
const router = express.Router();
const { createCollege } = require("../controller/collegeController");
const { createIntern, getIntern } = require("../controller/internController")

router.post("/functionup/colleges", createCollege);
router.post("/functionup/interns", createIntern);
router.get("/functionup/collegeDetails", getIntern)

module.exports = router;