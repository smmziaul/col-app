const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        name: { type: String, required: true },
        batch: { type: Number, required: true },
        college_id: { type: String, required: true },
        skills: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('students', Student)