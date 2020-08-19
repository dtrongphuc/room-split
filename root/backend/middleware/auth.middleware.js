var validator = require("validator");
var Room = require("../models/room.model");
const User = require("../models/user.model");

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
