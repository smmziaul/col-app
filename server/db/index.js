const mongoose = require('mongoose')
const URI = "mongodb+srv://admin:admin@cluster0.xdpbv.mongodb.net/college?retryWrites=true&w=majority"

mongoose
    .connect(URI, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db