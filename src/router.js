import { Router } from "express";
import classRouter from "./class/class.router.js";
import fileRouter from "./file/file.router.js";
import specialityRouter from "./speciality/speciality.router.js";
import studentRouter from "./student/student.router.js";
import subjectRouter from "./subjects/subject.router.js";
import teacherRouter from "./teachers/teacher.router.js";
import userRouter from "./user/user.router.js";
const router = new Router();

// require('./teachers')
subjectRouter(router);
classRouter(router);
teacherRouter(router);
fileRouter(router);
userRouter(router);
specialityRouter(router);
studentRouter(router);

export default router;
