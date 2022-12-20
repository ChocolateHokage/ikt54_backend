import md5 from "md5";
import auth from "./auth.js";
async function checkAuth(req, res, next) {
	try {
		if (!req.cookies?.tokenS) {
			res.status(401).json({ message: "вы не авторизованны" });
		} else {
			let payload = { tokenS: req.cookies?.tokenS };
			let _auth = await auth.getAuthInfo(payload);
			// console.log(payload, _auth);
			if (_auth.length > 0) {
				Object.assign(req.body, {
					_user_id: _auth[0].user_id,
					_access: _auth[0].access,
					tokenS: payload.tokenS,
				});
				next();
			} else {
				res.status(401).json({ message: "вы не авторизованны" });
			}
		}
	} catch (error) {
		console.error(new Date().toLocaleString(), "| ERROR\n", error);
		res.status(500).json(error);
	}
}
export default checkAuth;
