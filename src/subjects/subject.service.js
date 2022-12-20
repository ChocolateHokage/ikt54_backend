import Subject from './subject.js'

class SubjectService {
    async getSubject(payload, answer) {
        try {
            let subj = []
            if (payload.teacher_id) {
                const ids = await Subject.getSubjectIdsByTeacher(payload.teacher_id)
                if (!ids.length) {
                    subj = await Subject.getSubject()
                } else {
                    for (let el in ids) {
                        subj.push((await Subject.getSubjectById(ids[el].subject_id))[0])
                    }
                }
            } else {
                subj = await Subject.getSubject()
            }
            answer(null, subj)
        } catch (e) {
            answer(e)
        }
    }

    async getSubjectById(payload, answer) {
        try {
            const subj = await Subject.getSubjectById(payload.id)
            if (answer) answer(null, subj)
            return subj
        } catch (e) {
            answer(e)
        }
    }
}
export default new SubjectService()