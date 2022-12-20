import { format } from "mysql2";
import db from "../../dal/db.js";

class Auth {
	async getAuthInfo(payload, answer) {
		const [result] = await db.execute(
			format("SELECT * FROM session where tokenS = ?", [payload.tokenS]),
		);
		if (answer) answer(null, result);
		return result;
	}
	async login(payload, answer) {
		await this.deleteTokenS();
		const [result] = await db.execute(
			format(
				"INSERT INTO session (user_id, tokenS, time_death, remember, date_login) VALUES (?,?,?,?,?)",
				[
					payload.user_id,
					payload.tokenS,
					payload.timeDeath,
					payload.remember ? 1 : 0,
					payload?.date_login ?? new Date(),
				],
			),
		);
		const session = await this.getAuthInfo(
			{ ...payload, user_id: result.insertId },
			answer,
		);
		if (answer) answer(null, [result, session]);
		return [result, session];
	}

	async logout(payload, answer) {
		await db.execute(
			format("DELETE FROM session WHERE tokenS = ?", [payload.tokenS]),
		);
		if (answer) answer(null, "success");
		return "success";
	}
	async updateTokenS(payload, answer) {
		await db.execute(
			format("Update session set tokenS = ? where user_id = ?"),
			[payload.tokenS, payload.user_id],
		);
		if (answer) answer(null, "success");
		return "Success";
	}
	async deleteTokenS(payload, answer) {
		await db.execute(
			format("DELETE FROM session WHERE time_death < CURRENT_TIMESTAMP()"),
		);
		if (answer) answer(null, "success");
		return "success";
	}
}

export default new Auth();
