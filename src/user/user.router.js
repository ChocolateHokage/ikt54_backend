import checkAuth from "./auth/checkAuth.js";
import UserController from "./user.controller.js";

export default (router) => {
	router.post("/user/login", UserController.login);
	router.delete("/user/logout", checkAuth, UserController.logout);
	router.put("/user", checkAuth, UserController.updateUser);
	router.get("/user/me", checkAuth, UserController.getActiveUserInfo);
};
