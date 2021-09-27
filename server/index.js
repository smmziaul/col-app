const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')

const collegeRouter = require('./routes/college-router')
const studentRouter = require('./routes/student-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Welcome to Col-App, the College App for finding details about colleges!')
})

app.use('/api', collegeRouter)
app.use('/api', studentRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))