import { format } from "mysql2";
import pool from "../dal/db.js";

class Subject {
	async getSubject(answer) {
		const [result] = await pool.execute(format("SELECT * FROM subject"));
		if (answer) answer(null, result);
		return result;
	}

	async getSubjectIdsByTeacher(payload, answer) {
		const [ids] = await pool.execute(
			format("SELECT * FROM teacher_subject where teacher_id =?", [payload]),
		);
		if (answer) answer(null, ids);
		return ids;
	}

	async getSubjectById(payload, answer) {
		const [result] = await pool.execute(
			format(`SELECT * FROM subject WHERE subject_id = ?`, [payload]),
		);
		if (answer) answer(null, result[0]);
		return [result[0]];
	}
}
export default new Subject();
