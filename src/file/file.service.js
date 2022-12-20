import Exam from "./exam.js";
import Zachet from "./zachet.js";

class FileService {
	async getFile(payload, answer) {
		try {
			if (
				!payload.type_id ||
				payload.type_id == "null" ||
				!payload.class_id ||
				payload.class_id == "null" ||
				!payload.subject_id ||
				payload.subject_id == "null" ||
				!payload.teacher_id ||
				payload.teacher_id == "null"
			)
				throw Error("Отсутствует(ют) параметр(ы)");
			else {

				if (payload.teacher_id === -1) {
					
				}
				switch (Number(payload.type_id)) {
					case 1: {
						let file = new Exam({
							teacher_id: payload.teacher_id,
							class_id: payload.class_id,
							subject_id: payload.subject_id,
						});
						file.save(answer);
						break;
					}
					case 2: {
						let file = new Zachet({
							teacher_id: payload.teacher_id,
							class_id: payload.class_id,
							subject_id: payload.subject_id,
						});
						file.save(answer);
						break;
					}
					default: {
						if (answer) answer("Bad type input");
						break;
					}
				}
			}
		} catch (e) {
			answer(e);
		}
	}
}

export default new FileService();
