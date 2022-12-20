import Student from './student.js'

class StudentService {
    async getAllStudents(payload, answer) {
        try {
            if (!payload.class_id) throw new Error("Отсутствует имя группы")
            else {
                const students = await Student.getAllStudents(payload.class_id)
                return students
            }
        } catch (e) {
            answer(e)
        }
    }

    async addStudent(payload,) {
        try {
            if (!payload.full_name || !payload.class_id) throw Error("Отсутствует(ют) параметр(ы)")
            else {
                await  Student.addStudent({ full_name: payload.full_name, class_id: payload.class_id })
            }
        } catch (e) {
            answer(e)
        }
    }

    async updateStudent(payload, answer) {
        try {
            if (!payload.full_name) throw Error("Отсутствует(ют) параметр(ы)")
            else {
                await  Student.updateStudent({ full_name: payload.full_name, student_id: payload.student_id })
            }
        } catch (e) {
            answer(e)
        }
    }
    async deleteStudent(payload, answer) {
        try {
            if (!payload.student_id) throw Error("Отсутствует(ют) параметр(ы)")
            else {
                await  Student.deleteStudent(payload.student_id)
            }
        } catch (e) {
            answer(e)
        }
    }
}

export default new StudentService()