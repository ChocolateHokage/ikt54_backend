import TeacherService from './teacher.service.js'

class TeacherController {
    async getTeacher(req, res, next) {
        try {
            let _teacher
            if (req.query?.teacher_id) {
                _teacher = (await TeacherService.getTeacherById(req.query))
                res.json(_teacher)
            } else {
                _teacher = (await TeacherService.getAllTeacher(req.query, (err, result) => {
                    if (err) next(err)
                    else res.json(result)
                }))

            }
        } catch (error) {
            next(error)
        }
    }

    // getTeacherById(req, res, next) {
    //     teacherService.getTeacherById(req.query, (err, result) => {
    //         if (err) next(err)
    //         else res.json(result)
    //     })
    // }
}

export default new TeacherController()