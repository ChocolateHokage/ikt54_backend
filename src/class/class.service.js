import Class from "./class.js";
import speciality from "../speciality/speciality.js";
import moment from "moment/moment.js";

class ClassService {
	async getClassBySpec(payload, answer) {
		try {
			if (!payload.speciality_id) throw Error("Отсутствует параметр");
			else {
				let _class = await Class.getClassBySpec(payload.speciality_id);
				let ids = _class.map((i) => i.class_id);
				const _spec = await speciality.getSpecialityByClass(ids);

				for (const jopa in _class) {
					for (const pisya of _spec) {
						if (_class[jopa].speciality_id == pisya.speciality_id) {
							let course =
								moment(new Date(Date.now())).diff(
									moment(_class[jopa].join_date),
									"years",
								) + 1;
							_class[jopa].course = course;
							_class[jopa].name =
								course +
								" " +
								pisya.name +
								_class[jopa].after_class +
								"-" +
								_class[jopa].class_num +
								(_class[jopa].type == "ВБ" ? " ВБ" : "");
							_class[jopa].full_name =
								course +
								" " +
								pisya.full_name +
								" " +
								_class[jopa].after_class +
								"-" +
								_class[jopa].class_num+
								(_class[jopa].type == "ВБ" ? " ВБ" : "");
						}
					}
				}

				if (answer) answer(null, _class);
				return _class;

				// classDal.getClassBySpec(payload.speciality_id, (err, result) => {
				//     result.forEach((item, ind) => {
				//         specDal.getSpecialityByClass(item.class_id, (err, spec) => {
				//             result[ind].name = item.course + " " + spec[0].name + item.after_class + '-' + item.class_num
				//             result[ind].full_name = item.course + " " + spec[0].full_name + " " + item.after_class + '-' + item.class_num
				//             if (ind == result.length - 1) answer(err, result)
				//         })
				//     })
				// })
			}
		} catch (e) {
			answer(e);
		}
	}
}

export default new ClassService();
