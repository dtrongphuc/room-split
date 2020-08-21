const Room = require("../models/room.model");
const User = require("../models/user.model");

function isEmpty(str) {
	return !str || str.length === 0;
}

exports.postLogin = async (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;

	let user = await User.findOne({ username: username, password: password });
	if (!user) {
		return res.status(401).send({
			message: "Username or password is incorrect.",
		});
	}
	next();
};

exports.postRegister = (req, res, next) => {
	let username = req.body.username;
	let password = req.body.password;
	let repassword = req.body.passwordConfirm;

	try {
		User.findOne({ username: username }).then((user) => {
			if (user) {
				return res.status(403).send({
					message: "Username is existed.",
				});
			} else if (
				isEmpty(username) ||
				isEmpty(password) ||
				isEmpty(repassword)
			) {
				return res.status(403).send({
					message: "Input is empty.",
				});
			} else if (password != repassword) {
				return res.status(403).send({
					message: "Password confirm is incorrect.",
				});
			} else {
				next();
			}
		});
	} catch (error) {
		return res.status(403).send({
			message: `${error}` || "Error.",
		});
	}
};

exports.postJoinRoom = (req, res, next) => {
	try {
		let roomCode = req.body.code;
		Room.findOne({ code: roomCode }).then((room) => {
			if (!room) {
				return res.status(403).send({
					message: "Room code is not exist.",
				});
			}
			next();
		});
	} catch (error) {
		return res.status(500).json(error);
	}
};

exports.postCreateRoom = (req, res, next) => {
	try {
		let roomName = req.body.roomname;
		let price = req.body.price;

		if (isEmpty(roomName) || isEmpty(price.toString())) {
			return res.status(403).send({
				message: "Input is empty.",
			});
		} else {
			next();
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};
