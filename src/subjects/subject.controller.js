import SubjectService from './subject.service.js'

class SubjectController {
    getSubject(req, res, next) {
        SubjectService.getSubject(req.query, (err, result) => {
            if (err) next(err)
            else res.json(result)
        })
    }

    getSubjectById(req, res, next) {
        SubjectService.getSubjectById(req.query, (err, result) => {
            if (err) next(err)
            else res.json(result)
        })
    }
}

export default new SubjectController()