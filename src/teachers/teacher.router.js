import TeacherController from "./teacher.controller.js";
import checkAuth from "../user/auth/checkAuth.js";

export default (router) => {
	router.get("/teacher", checkAuth, TeacherController.getTeacher);
};
