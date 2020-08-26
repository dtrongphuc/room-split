const jwtHelper = require("../helpers/jwt.helper");

const accessTokenSecret =
	process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

exports.isAuth = async (req, res, next) => {
	const tokenFromClient =
		req.headers["cookie"] ||
		req.body.token ||
		req.query.token ||
		req.headers["x-access-token"];

	const accessTokenFromClient =
		tokenFromClient && tokenFromClient.split(/[\=\;]/)[1];
	if (tokenFromClient && accessTokenFromClient) {
		try {
			// Giải mã xem token có hợp lệ không ?
			const decoded = await jwtHelper.verifyToken(
				accessTokenFromClient,
				accessTokenSecret
			);
			// Lưu thông tin giải mã được vào đối tượng req
			req.jwtDecoded = decoded;
			next();
		} catch (error) {
			return res.status(401).send({
				success: false,
				error: {
					message: "Unauthorized.",
				},
			});
		}
	} else {
		// Không tồn tại token trong request
		return res.status(403).send({
			success: false,
			error: {
				message: "No token provided.",
			},
		});
	}
};
