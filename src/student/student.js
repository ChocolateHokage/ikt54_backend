import { format } from "mysql2";
import pool from "../dal/db.js";

class Student {
	async getAllStudents(payload) {
		const [students] = await pool.execute(
			format(
				"SELECT student_id, s.full_name, note, s.class_id FROM student s JOIN `class` c ON s.class_id = c.class_id WHERE s.class_id = " +
					payload +
					" ORDER BY s.full_name",
			),
		);
		return students;
	}
	async addStudent(payload) {
		await pool.execute(format("Insert into student set ?", payload));
	}
	async updateStudent(payload) {
		await pool.execute(
			format("Update student set ? where student_id = ?", [
				{ "full_name": payload.full_name },
				payload.student_id,
			]),
		);
	}
	async deleteStudent(payload) {
		await pool.execute(
			format("Delete from student where student_id = " + payload),
		);
	}
}

export default new Student();
