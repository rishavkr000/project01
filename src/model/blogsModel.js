const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
      type: objectId,
      ref: "Author",
      required: true,
    },
    tags: [{ type: string }],
    category: {
      type: String,
      required: true,
      trim: true,
    }, ////'examples: [technology, entertainment, life style, food, fashion],
    subcategory: [{ type: string }], //examples[technology-[web development, mobile development, AI, ML etc]] }
    deletedAt: {
      type: Date,
      default: Date.now(),
    },
    isDeleted: {
      type: boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now(),
    },
    isPublished: {
      type: boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", blogSchema);
