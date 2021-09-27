const express = require('express')

const CollegeController = require('../controllers/college-controller')

const router = express.Router()

router.post('/college', CollegeController.createCollege)
router.put('/college/:id', CollegeController.updateCollege)
router.delete('/college/:id', CollegeController.deleteCollege)
router.get('/college/:id', CollegeController.getCollegeById)
router.get('/colleges', CollegeController.getColleges)

module.exports = router