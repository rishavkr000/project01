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
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
      trim: true,
    },
    email: {
      required: true,
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email",
        },
        required: [true, "Email required"],
      },

      password: {
        type: String,
        required: true,
        match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        minlength: 5,
        maxlength: 12,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
