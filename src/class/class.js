import { format } from "mysql2";
import pool from "../dal/db.js";

class ClassDal {
	async getClassBySpec(payload, answer) {
		const [result] = await pool.query(
			"SELECT * FROM `class` where speciality_id = ?",
			[payload],
		);
		if (answer) answer(null, result);
		return result;
	}

	async getClassById(payload, answer) {
		const [result] = await pool.execute(
			format(`SELECT * FROM \`class\` where class_id = ?`, [payload]),
		);
		if (answer) answer(null, result);
		return result;
	}
}

export default new ClassDal();
