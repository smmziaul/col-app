const College = require('../models/college-model')
const Student = require('../models/student-model')

createCollege = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a college',
        })
    }

    const college = new College(body)

    if (!college) {
        return res.status(400).json({ success: false, error: err })
    }

    college
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: college._id,
                message: 'College created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'College not created!',
            })
        })
}

updateCollege = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    College.findOne({ _id: req.params.id }, (err, college) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'College not found!',
            })
        }
        college.name = body.name
        college.year = body.year
        college.city = body.city

        college.state = body.state
        college.country = body.country
        college.no_of_students = body.no_of_students
        college.courses = body.courses

        college
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: college._id,
                    message: 'College updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'College not updated!',
                })
            })
    })
}

deleteCollege = async (req, res) => {
    await College.findOneAndDelete({ _id: req.params.id }, (err, college) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!college) {
            return res
                .status(404)
                .json({ success: false, error: `College not found` })
        }

        return res.status(200).json({ success: true, data: college })
    }).catch(err => console.log(err))
}

getCollegeById = async function (req, res) {
    // TODO: optimise it later by using async parallel 
    var data = {};
    try {
        // query for fetching college details
        let college = await College.findOne({ _id: req.params.id }).exec();
        data = college.toObject();

        // query for fetching student list 
        let students = await Student.find({ college_id: req.params.id }).exec();
        data.students = students;

        // query 3 - similar colleges 
        let tolerance_limit = 100
        let similar_colleges =
            await College.find({

                $and: [
                    {
                        _id: { $ne: req.params.id }
                    },
                    {
                        $or: [
                            { state: college.state },
                            {
                                no_of_students: {
                                    $gt: college.no_of_students - tolerance_limit,
                                    $lt: college.no_of_students + tolerance_limit
                                }
                            },
                            {
                                courses: {
                                    $in: college.courses
                                }
                            }
                        ]
                    }
                ]
            }).exec();
        console.log(similar_colleges.length)
        data.similar_colleges = similar_colleges

        return res.status(200).json({ success: true, data: data })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }
}

getColleges = async (req, res) => {
    await College.find({}, (err, colleges) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!colleges.length) { // when no college in db 
            return res
                .status(404)
                .json({ success: false, error: `No College in the db` })
        }
        return res.status(200).json({ success: true, data: colleges })
    }).catch(err => console.log(err))
}

module.exports = {
    createCollege,
    updateCollege,
    deleteCollege,
    getColleges,
    getCollegeById,
}