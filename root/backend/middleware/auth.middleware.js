const jwtHelper = require("../helpers/jwt.helper");

const accessTokenSecret =
	process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

exports.isAuth = async (req, res, next) => {
	const tokenFromClient =
		req.body.token || req.query.token || req.headers["x-access-token"];
	if (tokenFromClient) {
		try {
			// Giải mã xem token có hợp lệ không ?
			const decoded = await jwtHelper.verifyToken(
				tokenFromClient,
				accessTokenSecret
			);
			// Lưu thông tin giải mã được vào đối tượng req
			req.jwtDecoded = decoded;
			next();
		} catch (error) {
			return res.status(401).send({
				message: "Unauthorized.",
			});
		}
	} else {
		// Không tồn tại token trong request
		return res.status(403).send({
			message: "No token provided.",
		});
	}
};
