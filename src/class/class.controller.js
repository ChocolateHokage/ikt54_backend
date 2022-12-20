import ClassService from "./class.service.js";

class ClassController {
	getClassBySpec(req, res, next) {
		ClassService.getClassBySpec(req.query, (err, result) => {
			if (err) next(err);
			else res.json(result);
		});
	}
}

export default new ClassController();
