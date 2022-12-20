import pool from "../dal/db.js";
import { format } from "mysql2";

class Speciality {
	async getAllSpeciality(payload, answer) {
		let [result] = await pool.execute(format("SELECT * FROM speciality"));
		if (answer) answer(null, [result]);
		return result;
	}

	async getSpecialityByClass(payload, answer) {
		const [result] = await pool.execute(
			format(
				`SELECT * FROM speciality s JOIN class c ON c.speciality_id=s.speciality_id WHERE class_id in (?)`,
				[payload],
			),
		);
		if (answer) answer(null, result);
		return result;
	}
}

export default new Speciality();
