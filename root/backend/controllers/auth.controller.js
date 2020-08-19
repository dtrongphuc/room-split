const jwt = require("jsonwebtoken");
var User = require("../models/user.model");
var Room = require("../models/room.model");

function generateAccessToken(username) {
	return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15days",
	});
}

exports.createUser = async function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	let realName = req.body.realname;
	let roomCode = req.body.code;
	let room = await Room.findOne({ code: roomCode }).exec();

	const user = new User({
		username: username,
		password: password,
		realname: realName,
		room: room._id,
	});
	const token = generateAccessToken({ username: username });
	await user.save();
	res.json(token);
};

exports.login = function (req, res) {
	let username = req.body.username;

	const token = generateAccessToken({ username: username });

	res.json(token);
	// User.findOne({ username: username })
	// 	.populate("room")
	// 	.exec((err, data) => {
	// 		if (data) {
	// 			res.send(data);
	// 		} else {
	// 			res.status(404).send({
	// 				message: err.message || "Not found",
	// 			});
	// 		}
	// 	});
};
