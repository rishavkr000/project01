const blogsModel = require("../model/blogsModel");
const authorModel = require("../model/authorModel");

//=========== Create Blogs ====================//

//------------validation function-----------//
let isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const blogs = async (req, res) => {
  try {
    let blogData = req.body;
    let author = await authorModel.findById(blogData.authorId);
    if (!author) {
      return res.send("msg: Invalid Author Id");
    }
    if (Object.keys(blogData).length == 0) {
      res.status(400).send({
        status: false,
        msg: "BAD REQUEST, Please provide blog details ",
      });
      return;
    }
    if (!isValid(blogData.title)) {
      return res.status(400).send({ status: false, msg: "title is required" });
    }
    if (!isValid(blogData.body)) {
      return res.status(400).send({ status: false, msg: "body is required" });
    }
    if (!isValid(blogData.authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: "authorId is required" });
    }
    if (!isValid(blogData.category)) {
      return res
        .status(400)
        .send({ status: false, msg: "category is required" });
    }
    let savedBlogData = await blogsModel.create(blogData);
    return res.status(201).send({ status: true, msg: savedBlogData });
  } catch (error) {
    console.log("This is the error:", error.message);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

//=========== Update Blogs ====================//

const updateBlog = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    let data = await blogsModel.find({
      $in: [{ _id: blogId, isDeleted: false }],
    });
    console.log(data);
    if (!Object.keys(data).length) {
      return res.status(400).send({ status: false, msg: "Data is incorrect" });
    }
    let { title, body, tags, subcategory } = req.body;
    let newBlog = await blogsModel
      .findOneAndUpdate(
        { data },
        {
          $addToSet: { subcategory: subcategory, tags: tags },
          title: title,
          body: body,
          isPublished: true,
          publishedAt: new Date().toLocaleString(),
        },
        { new: true }
      )
      .populate("authorId");

    res.status(200).send({ status: true, data: newBlog });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
};

//=========== Get Blogs ====================//

let getSelectiveBlogs = async function (req, res) {
  try {
    const data = req.query;
    if (!Object.keys(data).length) {
      let blogs = await blogsModel.find({
        $and: [{ isDeleted: false }, { isPublished: true }],
      });
      // console.log(blogs)

      if (!Object.keys(blogs).length) {
        return res
          .status(404)
          .send({ status: false, msg: "No such blog eists" });
      }

      return res.status(200).send({ status: true, data: blogs });
    } else {
      let blogs = await blogsModel.find({
        $and: [{ isDeleted: false }, { isPublished: true }, data],
      });
      // console.log(blogs)

      if (!Object.keys(blogs).length) {
        return res
          .status(404)
          .send({ status: false, msg: "1.No such blog eists" });
      }
      else if (!document.inludes(data)) { return res.status(404).send({ status: false, msg: "3.No such blog eists" }) }
      return res.status(200).send({ status: true, list: blogs });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//=========== Delete Blogs By Id ====================//

const deletBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blog = await blogsModel.findById(blogId);
    if (!blog) {
      return res.status(404).send({ status: false, msg: "blogId not found" });
    }
    let deletedBlog = await blogsModel.updateMany(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: new Date().toLocaleString() } },
      { new: true }
    );
    res.status(200).send({ data: deletedBlog, status: true });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//=========== Delete Blogs By Query ====================//

const delBlogsByQuery = async function (req, res) {
  try {
    const data = req.query;
    if (!Object.keys(data).length) {
      return res.status(404).send({ status: false, msg: "Query Params empty" });
    }

    let document = await blogsModel.find({
      $and: [data, { isDeleted: false }],
    });
    console.log(document)
    if (!document.includes(data)) {
      return res.status(404).send({ status: false, msg: "Document not match" });
    }

    let deletedBlog = await blogsModel.updateMany(
      { $and: [data, { isDeleted: false }] },
      { $set: { isDeleted: true, deletedAt: new Date().toLocaleString() } },
      { new: true }
    );
    res.status(200).send({ status: true, data: deletedBlog });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.updateBlog = updateBlog;
module.exports.blogs = blogs;
module.exports.getSelectiveBlogs = getSelectiveBlogs;
module.exports.deletBlog = deletBlog;
module.exports.delBlogsByQuery = delBlogsByQuery;
