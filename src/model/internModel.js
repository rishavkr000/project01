const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const { isValidEmail, isValidMobile } = require("../controller/validator")


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: {
            validator: isValidEmail,
            message: "Please enter a valid email",
        },
        required: [true, "Email required"],
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isValidMobile,
            message: "Please enter a valid mobile number"
        }
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Intern", internSchema); //interns