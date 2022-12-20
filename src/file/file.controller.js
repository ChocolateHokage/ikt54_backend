import FileService from "./file.service.js";

class FileController {
	getFile(req, res, next) {
		FileService.getFile(req.query, (err, result) => {
			if (err) next(err);
			else {
				let path = `${process.env.PROTOCOL}://${process.env.DOMAIN}${process.env.STATIC_URN}/files/${result}`;
				if (req.query?.v && req.query?.v == "2") {
					res.json({ fileName: result, link: path });
				} else {
					// console.log('redirect to ' + path)
					res.redirect(path);
				}
			}
		});
	}
}

export default new FileController();
