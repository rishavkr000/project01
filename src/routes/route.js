const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogsController = require("../controller/blogsController")
const middleWare = require("../middleware/auth")



router.post("/createAuthor", authorController.createAuthor)
router.post("/loginUser", authorController.login)
router.post("/createBlog", middleWare.authCheck, blogsController.blogs)
router.get("/selectblogs", middleWare.authCheck, blogsController.getSelectiveBlogs)
router.put("/updateBlog/:blogId", middleWare.authCheck, blogsController.updateBlog)
router.delete("/deleteblog/:blogId", middleWare.authCheck, blogsController.deletBlog)
router.delete("/delbyquery", middleWare.authCheck, blogsController.delBlogsByQuery)




module.exports = router;



