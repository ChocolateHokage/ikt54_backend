import checkAuth from "../user/auth/checkAuth.js";
import checkAdmin from "../user/auth/checkAdmin.js";
import StudentController from "./student.controller.js";

export default (router) => {
	router.get("/student/all", checkAuth, StudentController.getAllStudents);
	router
		.post("/student", checkAuth, checkAdmin, StudentController.addStudent)
		.put("/student", checkAuth, checkAdmin, StudentController.updateStudent)
		.delete("/student", checkAuth, checkAdmin, StudentController.deleteStudent);
};
