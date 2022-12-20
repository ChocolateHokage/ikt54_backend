import md5 from "md5";
import USER from "./user.js";
import auth from "./auth/auth.js";
import Teacher from "../teachers/teacher.js";

class UserService {
	async login(payload, answer) {
		try {
			if (!payload.email || !payload.password)
				throw Error("Отсутвует(ют) параметы(ы)");
			else {
				let temp = {
					token: md5(payload.email + payload.password + "vostruhin"),
				};
				let _user = await USER.getUserInfo(temp);

				if (_user.length > 0) {
					let newDate = payload.rememberMe
						? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
						: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
					let [_auth, _session] = await auth.login({
						user_id: _user[0]?.user_id,
						tokenS: md5(payload.email + payload.password + new Date()),
						timeDeath: newDate,
						remember: payload?.rememberMe ? 1 : 0,
					});

					let _teacher = await Teacher.getTeacherById(_user[0]?.teacher_id);
					_user[0].name = _teacher[0]?.name;
					_user[0].full_name = _teacher[0]?.full_name;

					if (answer)
						answer(null, {
							..._user[0],
							tokenS: _session[0]?.tokenS,
							err: false,
						});
					return { ..._user[0], tokenS: _session[0].tokenS };
				} else {
					if (answer) answer(null, { err: true });
					return { err: true };
				}
			}
		} catch (e) {
			answer(e);
		}
	}

	async logout(payload, answer) {
		try {
			let result = await auth.logout(payload);
			if (answer) answer(null, result);
			return result;
		} catch (e) {
			answer(e);
		}
	}

	async updateUser(payload, answer) {
		try {
			if (!payload.email && !payload.password && !payload.user_id)
				throw Error("Отсутствует(ют) параметр(ы)");
			else {
				let temp = { user_id: payload._user_id };
				if (!!payload.email && typeof payload.email == "string") {
					temp.email = payload.email;
				}
				if (!!payload.password && typeof payload.password == "string") {
					temp.token = md5(payload.email + payload.password + "vostruhin");
				}
				let _user = await USER.updateUser(temp);
				let _teacher = await Teacher.getTeacherById(_user[0].teacher_id);
				let tokenS = md5(payload.email + payload.password + new Date());
				let _tokenS = await auth.updateTokenS({
					user_id: payload.user_id,
					tokenS: tokenS,
				});
				_user[0].name = _teacher[0].name;
				_user[0].full_name = _teacher[0].full_name;
				_user[0].tokenS = tokenS;
				if (answer) answer(null, _user[0]);
				return _user[0];
			}
		} catch (e) {
			return e;
		}
	}

	async getActiveUserInfo(payload, answer) {
		try {
			let _user = await USER.getActiveUserInfo(payload);
			let _teacher = await Teacher.getTeacherById(_user.teacher_id);
			_user.name = _teacher[0]?.name;
			_user.full_name = _teacher[0]?.full_name;
			const [_auth] = await auth.getAuthInfo({ tokenS: payload.tokenS });
			const tokenS = md5(payload.tokenS + new Date());
			await auth.logout(payload);
			await auth.login({
				user_id: _auth.user_id,
				tokenS,
				timeDeath: _auth.remember
					? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
					: _auth.time_death,
				remember: _auth.remember,
				date_login: _auth.date_login,
			});
			if (answer) answer(null, [_user, tokenS]);
			return [_user, tokenS];
		} catch (e) {
			answer(e);
		}
	}
}

export default new UserService();
