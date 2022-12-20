import Speciality from "./speciality.js";

class SpecialityService {
	async getAllSpeciality(payload, answer) {
		try {
			const result = await Speciality.getAllSpeciality(payload);
			if (answer) answer(null, result);
			return result;
		} catch (e) {
			answer(e);
		}
	}
}

export default new SpecialityService();
