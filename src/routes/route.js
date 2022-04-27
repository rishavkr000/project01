const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController")

 

router.post("/createAuthor",authorController.creatAuthor);
router.post("/createBlogs",blogsController.blogs);

module.exports = router;
