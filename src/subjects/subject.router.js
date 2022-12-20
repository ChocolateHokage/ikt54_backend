import SubjectController from "./subject.controller.js";
import checkAuth from "../user/auth/checkAuth.js";

export default (router) => {
	router.get("/subject", checkAuth, SubjectController.getSubject);
	router.get("/subject/:id", checkAuth, SubjectController.getSubjectById);
};
