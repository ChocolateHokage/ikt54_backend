//import
import express from "express";
import helmet from "helmet";
import limiter from "express-rate-limit";
import "dotenv/config";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/router.js";
import path from "path"
//create server
const app = express();

//setting app
app.use(cookieParser());
app.use(compression());
app.use(
	cors({
		methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
		credentials: true,
		origin: ["https://ikt54.ru"],
	}),
);
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(
	limiter({
		windowMs: 10 * 1000 * 60,
		max: 100,
		message: "Too many requests",
	}),
);

app.use(process.env.API_URN, router);
app.use(process.env.STATIC_URN, express.static(path.resolve("./src/static/")));

//error catcher
app.use((err, req, res, next) => {
	console.error(new Date().toLocaleString(), "| ERROR\n", err);
	res.status(500).json(err.message ?? "Something wrong!");
});

//server start
app.listen(process.env.PORT ?? 4000, () => {
	console.log(
		new Date().toLocaleString(),
		"| server started on port:",
		process.env.PORT ?? 4000,
	);
});
