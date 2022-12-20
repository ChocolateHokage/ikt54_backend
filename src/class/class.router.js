import Class from "./class.controller.js";
import checkAuth from "../user/auth/checkAuth.js";

export default (router) => {
	router.get("/class",/*  checkAuth,  */Class.getClassBySpec);
};
