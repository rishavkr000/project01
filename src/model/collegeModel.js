const mongoose = require("mongoose")

let collegeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: "College short name is required",
            unique: true,
            trim: true
        },
        fullName: {
            type: String,
            required: "College full name is required",
            trim: true
        },
        logoLink: {
            type: String,
            required: "College logo is required",
            trim: true
        }, isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('College', collegeSchema)