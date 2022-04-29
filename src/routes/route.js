const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogsController = require("../controller/blogsController")
const middleWare = require("../middleware/auth")



router.post("/createAuthor", authorController.createAuthor)
router.post("/loginUser", authorController.login)
router.post("/createBlog/:userId", middleWare.authCheck, blogsController.blogs)
router.get("/getblogs", middleWare.authCheck, blogsController.getSelectiveBlogs)
router.put("/updateBlog/:userId/:blogId", middleWare.authCheck, blogsController.updateBlog)
router.delete("/deleteblog/:userId/:blogId", middleWare.authCheck, blogsController.deletBlog)
router.delete("/delbyquery/:userId", middleWare.authCheck, blogsController.delBlogsByQuery)




module.exports = router;



