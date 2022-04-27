const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require("moment");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: ObjectId,
      ref: "Author",
      required: true,
    },
    tags: [{ type: String }],
    category: {
      type: String,
      required: true,
      trim: true,
    }, ////'examples: [technology, entertainment, life style, food, fashion],
    subcategory: [{ type: String }], //examples[technology-[web development, mobile development, AI, ML etc]] }
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default:new Date().toLocaleString()
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema);
