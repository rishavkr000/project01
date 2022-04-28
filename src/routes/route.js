const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogsController = require("../controller/blogsController")


router.post("/createAuthor", authorController.createAuthor)
router.post("/createBlog", blogsController.blogs)
router.get("/selectblogs", blogsController.getSelectiveBlogs)
router.put("/updateBlog/:blogId",blogsController.updateBlog)
router.delete("/deleteblog/:blogId", blogsController.deletBlog)
router.delete("/delbyquery", blogsController.delBlogsByQuery)


module.exports = router;



