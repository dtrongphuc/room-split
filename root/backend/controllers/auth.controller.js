var User = require("../models/user.model");
var Room = require("../models/room.model");

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

	user.save()
		.then((data) => res.send(data))
		.catch((err) =>
			res.status(500).send({
				message: err.message || "error when save user data",
			})
		);
};

exports.login = function (req, res) {
	let username = req.body.username;

	User.findOne({ username: username })
		.populate("room")
		.exec((err, data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: err.message || "Not found",
				});
			}
		});
};
