import { createPool } from "mysql2";

let pool = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	socketPath: process.env.DB_SOCKETPATH,
});
export default pool.promise();
