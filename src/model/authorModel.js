const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      require: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"]
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 12,
    },
  },
  { timestamps: true });

module.exports = mongoose.model("Author", authorSchema); //authors

