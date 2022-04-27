const express = require("express");
const router = express.Router();
const allController = require("../controller/allController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

// router.get("/cowin/states", CowinController.getStates)
// router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
// router.get("/cowin/getByPin", CowinController.getByPin)

// router.post("/cowin/getOtp", CowinController.getOtp)

module.exports = router;
