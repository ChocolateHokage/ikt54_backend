import Speciality from "./speciality.controller.js";
import checkAuth from "../user/auth/checkAuth.js";

export default (router) => {
	router.get("/speciality", checkAuth, Speciality.getAllSpeciality);
};
