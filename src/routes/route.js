const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogsController = require("../controller/blogsController")
const allController = require("../controller/allController")

 router.post("/createAuthor", authorController.createAuthor)
 router.post("/createBlog", blogsController.blogs)

router.get("/blogs", allController.getActiveBlogs)
router.get("/selectblogs", allController.getSelectiveBlogs)



module.exports = router;
