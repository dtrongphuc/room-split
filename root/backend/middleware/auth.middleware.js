const jwt = require("jsonwebtoken");
var validator = require("validator");
var Room = require("../models/room.model");
const User = require("../models/user.model");

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.status(401).send();

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
		if (err) return res.status(403).send();
		console.log(decoded);
		next();
	});
}

exports.resgisterValidator = async function (req, res, next) {
	let username = req.body.username;
	let password = req.body.password;
	let repassword = req.body.passwordConfirm;
	let roomCode = req.body.code;
	let room = await Room.findOne({ code: roomCode });

	if (!room) {
		res.send({
			message: `No room have code: ${roomCode}`,
		});
	}

	if (
		validator.isEmpty(username) ||
		validator.isEmpty(password) ||
		validator.isEmpty(repassword)
	) {
		res.send({
			message: "Input is empty",
		});
		return;
	} else if (password != repassword) {
		res.send({
			message: "Password confirm not exactly",
		});
		return;
	}

	next();
};

exports.loginValidator = async function (req, res, next) {
	let username = req.body.username;
	let password = req.body.password;
	let user = await User.findOne({ username: username });

	if (!user) {
		res.send({
			message: "No user mathched",
		});
	}

	if (validator.isEmpty(password)) {
		res.send({
			message: "Password not exactly",
		});
	}

	next();
};
