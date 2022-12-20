import studentService from './student.service.js'

class StudentController {
    async getAllStudents(req, res, next) {
        try {
            const students = await studentService.getAllStudents(req.query, next)
            res.json(students)
        } catch (e) {
            next(e)
        }

    }

    async addStudent(req, res, next) {
        try {
            await studentService.addStudent(req.body, next)
            res.status(200).json({ message: "OK" })
        } catch (e) {
            next(e)
        }
    }

    async updateStudent(req, res, next) {
        try {
            await studentService.updateStudent(req.body, next)
            res.status(200).json({ message: "OK" })
        } catch (e) {
            next(e)
        }
    }
    async deleteStudent(req, res, next) {
        try {
            await studentService.deleteStudent(req.body, next)
            res.status(200).json({ message: "OK" })
        } catch (e) {
            next(e)
        }
    }
}

export default new StudentController()