import { format } from "mysql2";
import pool from "../dal/db.js";

class Teacher {
	async getAllTeacher(answer) {
		const [teachers] = await pool.execute(format("SELECT * FROM teacher order by name"));
		if (answer) answer(null, teachers);
		return teachers;
	}

	async getTeacherIdsBySubject(payload, answer) {
		const [ids] = await pool.execute(
			format("SELECT * FROM teacher_subject where subject_id = ?", [payload]),
		);
		if (answer) answer(null, ids);
		return ids;
	}
	async getTeacherById(payload, answer) {
		const [result] = await pool.execute(
			format("SELECT * FROM teacher WHERE teacher_id = ?", [payload]),
		);
		if (answer) answer(null, result);
		return result;
	}
}

export default new Teacher();
