const express = require('express')

const StudentController = require('../controllers/student-controller')

const router = express.Router()

router.post('/student', StudentController.createStudent)
router.put('/student/:id', StudentController.updateStudent)
router.delete('/student/:id', StudentController.deleteStudent)
router.get('/student/:id', StudentController.getStudentById)
router.get('/students', StudentController.getStudents)

module.exports = router