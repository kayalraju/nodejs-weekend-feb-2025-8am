const Student = require('../model/student')

class ApiController {

    //create student
    async createStudent(req, res) {
        // console.log(req.body);
        try {
            const { name, city, age } = req.body
            const data = new Student({
                name, city, age
            })
            const sData = await data.save()
            if (sData) {
                return res.status(201).json({
                    status: true,
                    message: 'student created successfully',
                    data: sData
                })

            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
            })

        }
    }

    //get student
    async getStudent(req, res) {
        try {
            const getStudent = await Student.find()
            if (getStudent) {
                return res.status(200).json({
                    status: true,
                    message: 'student get successfully',
                    total: getStudent.length,
                    data: getStudent
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
            })

        }

    }
    async editStudent(req, res) {
        try {
            const id = req.params.id
            const edit = await Student.findById(id)
            if (edit) {
                return res.status(200).json({
                    status: true,
                    message: 'get single student',
                    data: edit
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'student not found',
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
            })

        }

    }


    async updateStudent(req, res) {
        try {
            const id = req.params.id
            const { name, city, age } = req.body
            const updateData = await Student.findByIdAndUpdate(id, { name, city, age })
            if (updateData) {
                return res.status(200).json({
                    status: true,
                    message: 'student update successfully',
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'student not found',
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
            })

        }

    }

    async deleteStudent(req, res) {
        try {
            const id = req.params.id
            const deleteData = await Student.findByIdAndDelete(id)
            if (deleteData) {
                return res.status(200).json({
                    status: true,
                    message: 'student delete successfully',
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'student not found',
                })
            }

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message,
            })
        }
    }
}
module.exports = new ApiController();