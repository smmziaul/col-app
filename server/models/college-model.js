const mongoose = require('mongoose')
const Schema = mongoose.Schema

const College = new Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        city: { type: String, required: true },

        state: { type: String, required: true },
        country: { type: String, required: true },
        no_of_students: { type: Number, required: true },
        courses: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('colleges', College)