import Teacher from './teacher.js'

class TeacherService {
    async getAllTeacher(payload, answer) {
        try {
            let result = []
            if (payload.subject_id) {
                const ids = await Teacher.getTeacherIdsBySubject(payload.subject_id)
                if (!ids.length) {
                    result = await Teacher.getAllTeacher()
                } else {
                    for (let i in ids) {
                        result.push((await Teacher.getTeacherById(ids[i].teacher_id))[0])
                    }
                }
            } else {
                result = await Teacher.getAllTeacher()
            }
            result.unshift({ teacher_id: -1, name: "Вакансия" })
            answer(null, result)
        } catch (e) {
            answer(e)
        }
    }

    async getTeacherById(payload, answer) {
        try {
            const result = Teacher.getTeacherById(payload.teacher_id, answer)
            if (answer) answer(null, result)
            return result
        } catch (e) {
            answer(e)
        }
    }
}
export default new TeacherService()