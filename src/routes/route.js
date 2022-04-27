const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController")

 

<<<<<<< HEAD
router.post("/createAuthor",authorController.creatAuthor);
router.post("/createBlogs",blogsController.blogs);
=======
router.get("/blogs", allController.getActiveBlogs)
router.get("/selectblogs", allController.getSelectiveBlogs)
// router.get("/cowin/states", CowinController.getStates)
// router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
// router.get("/cowin/getByPin", CowinController.getByPin)

// router.post("/cowin/getOtp", CowinController.getOtp)
>>>>>>> 46b0be390513f507db725f68516c167e0901d7da

module.exports = router;
