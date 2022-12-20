import Speciality from "./speciality.service.js";

class SpecialityController {
	getAllSpeciality(req, res, next) {
		Speciality.getAllSpeciality(req, (err, result) => {
			if (err) next(err);
			else {
				res.json(result);
			}
		});
	}
}
export default new SpecialityController();
