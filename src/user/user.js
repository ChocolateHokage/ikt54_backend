import { format } from "mysql2";
import pool from "../dal/db.js";

class User {
	async getUserInfo(payload, answer) {
		const [result] = await pool.execute(
			format("SELECT user_id, email, teacher_id, access FROM user WHERE ?", [
				payload,
			]),
		);
		if (answer) answer(null, result);
		return result;
	}

	async updateUser(payload, answer) {
		const [user] = await pool.execute(
			format("UPDATE user SET ? where user_id = ?", [payload, payload.user_id]),
		);
		const userInfo = await this.getUserInfo(
			{ user_id: payload.user_id },
			answer,
		);
		if (answer) answer(null, userInfo);
		return userInfo;
	}

	async getActiveUserInfo(payload, answer) {
		const [ses] = await pool.execute(
			format("SELECT user_id, time_death FROM session WHERE tokenS = ?", [
				payload.tokenS,
			]),
		);
		if (ses[0]?.time_death > new Date()) {
			const [user] = await this.getUserInfo({ user_id: ses[0].user_id });
			if (answer) answer(null, [user]);
			return user;
		} else {
			const dropSes = await pool.execute(
				format("DELETE FROM session WHERE tokenS = ?", [payload.tokenS]),
			);
			return [];
		}
	}
}

export default new User();
