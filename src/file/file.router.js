import File from "./file.controller.js";
import checkAuth from "../user/auth/checkAuth.js";

export default (router) => {
	router.get("/file", checkAuth, File.getFile);
};
